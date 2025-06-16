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
        String total = String.format("%.2f", (double) booking.getTotalPrice());

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
        redirectUrls.setReturnUrl("http://localhost:3000/success");

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
            return ResponseEntity.status(500).body("Lỗi khi tạo thanh toán: " + e.getMessage());
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

    // fallback check nếu SDK không expose chi tiết
    if (message != null && message.contains("PAYMENT_ALREADY_DONE")) {
        return ResponseEntity.ok(Map.of(
            "status", "already_done",
            "message", "Thanh toán đã được xử lý tự động từ trước."
        ));
    }

    return ResponseEntity.status(500).body(Map.of(
        "status", "fail",
        "message", message != null ? message : "Lỗi không xác định từ PayPal."
    ));
}
    }
}
