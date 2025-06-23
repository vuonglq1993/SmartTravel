package com.smarttravel.server.service.booking;

import com.smarttravel.server.dto.BookingDTO;
import com.smarttravel.server.model.Booking;
import com.smarttravel.server.model.Tour;
import com.smarttravel.server.model.User;
import com.smarttravel.server.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public List<BookingDTO> getAllBookingDTOs() {
        return bookingRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Booking getBookingById(int id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + id));
    }

    @Override
    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public Booking updateBooking(int id, Booking booking) {
        if (!bookingRepository.existsById(id)) {
            throw new RuntimeException("Cannot update. Booking not found with ID: " + id);
        }
        booking.setId(id);
        return bookingRepository.save(booking);
    }

    @Override
    public boolean deleteBooking(int id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Booking confirmBookingStatus(int id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + id));
        booking.setStatus("Confirmed");
        return bookingRepository.save(booking);
    }

    @Override
    public BookingDTO convertToDTO(Booking booking) {
        if (booking == null) return null;

        return BookingDTO.builder()
                .id(booking.getId())
                .bookingDate(booking.getBookingDate() != null ? booking.getBookingDate().toString() : null)
                .quantity(booking.getQuantity())
                .totalPrice(booking.getTotalPrice())
                .status(booking.getStatus())
                .userId(booking.getUser() != null ? booking.getUser().getId() : 0)
                .username(booking.getUser() != null ? booking.getUser().getUsername() : null)
                .tourId(booking.getTour() != null ? booking.getTour().getId() : 0)
                .tourTitle(booking.getTour() != null ? booking.getTour().getTitle() : null)
                .build();
    }
}
