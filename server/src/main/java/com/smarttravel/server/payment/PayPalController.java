package com.smarttravel.server.payment;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.smarttravel.server.repository.*;
import com.smarttravel.server.model.*;

import java.util.*;

@RestController
@RequestMapping("/api/paypal")
public class PayPalController {

    private final APIContext apiContext;
    private final BookingRepository bookingRepository;

    public PayPalController(APIContext apiContext, BookingRepository bookingRepository) {
        this.apiContext = apiContext;
        this.bookingRepository = bookingRepository;
    }

    @PostMapping("/pay")
    public ResponseEntity<?> createPayment(@RequestParam("bookingId") int bookingId) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);

        if (bookingOptional.isEmpty()) {
            return ResponseEntity.status(404).body("Không tìm thấy booking với ID: " + bookingId);
        }

        Booking booking = bookingOptional.get();

        // ❌ Nếu đã CONFIRMED thì không cho thanh toán nữa
        if ("CONFIRMED".equalsIgnoreCase(booking.getStatus())) {
            return ResponseEntity.status(400).body("Booking đã được xác nhận. Không thể thanh toán lại.");
        }

        // ✅ Kiểm tra null user/tour
        if (booking.getUser() == null || booking.getTour() == null) {
            return ResponseEntity.status(400).body("Booking không có thông tin user hoặc tour.");
        }

        // ✅ Ghi log thông tin booking
        System.out.println(">>> Booking Info:");
        System.out.println("Booking ID: " + booking.getId());
        System.out.println("User ID: " + booking.getUser().getId());
        System.out.println("User Email: " + booking.getUser().getEmail());
        System.out.println("Tour ID: " + booking.getTour().getId());
        System.out.println("Total Price: " + booking.getTotalPrice());

        double price = booking.getTotalPrice();

        // ✅ Check giá trị hợp lệ
        if (price <= 0) {
            return ResponseEntity.status(400).body("Tổng tiền không hợp lệ (<= 0)");
        }

        String total = String.format(Locale.US, "%.2f", price);

        Amount amount = new Amount();
        amount.setCurrency("USD");
        amount.setTotal(total);

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setDescription("Thanh toán cho booking #" + bookingId);

        List<Transaction> transactions = Collections.singletonList(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl("http://localhost:3000/cancel");
        String returnUrl = "http://localhost:3000/success?bookingId=" + booking.getId() + "&email=" + booking.getUser().getEmail();
        redirectUrls.setReturnUrl(returnUrl);

        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(transactions);
        payment.setRedirectUrls(redirectUrls);

        try {
            Payment created = payment.create(apiContext);
            return ResponseEntity.ok(created.getLinks());
        } catch (PayPalRESTException e) {
            e.printStackTrace();
            String message = e.getMessage();

            if (e.getDetails() != null) {
                message = e.getDetails().getMessage();
                System.err.println("PayPal details: " + message);
            }

            return ResponseEntity.status(500).body(Map.of(
                    "status", "fail",
                    "message", message != null ? message : "Lỗi không xác định từ PayPal."
            ));
        }
    }

    @GetMapping("/execute")
    public ResponseEntity<?> executePayment(@RequestParam("paymentId") String paymentId,
                                            @RequestParam("PayerID") String payerId) {
        System.out.println("Đang thực hiện thanh toán với:");
        System.out.println("paymentId = " + paymentId);
        System.out.println("payerId = " + payerId);

        Payment payment = new Payment();
        payment.setId(paymentId);

        PaymentExecution paymentExecute = new PaymentExecution();
        paymentExecute.setPayerId(payerId);

        try {
            Payment executed = payment.execute(apiContext, paymentExecute);
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "paymentId", executed.getId(),
                    "state", executed.getState(),
                    "amount", executed.getTransactions().get(0).getAmount().getTotal()
            ));
        } catch (PayPalRESTException e) {
            e.printStackTrace();
            String message = e.getMessage();

            if (e.getDetails() != null) {
                message = e.getDetails().getMessage();
                System.err.println("PayPal details: " + message);
            }

            if (message != null && message.contains("PAYMENT_ALREADY_DONE")) {
                return ResponseEntity.ok(Map.of(
                        "status", "already_done",
                        "message", "Thanh toán đã được xử lý từ trước."
                ));
            }

            return ResponseEntity.status(500).body(Map.of(
                    "status", "fail",
                    "message", message != null ? message : "Lỗi không xác định từ PayPal."
            ));
        }
    }
}
