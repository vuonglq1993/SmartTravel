package com.smarttravel.server.service.booking;

import com.smarttravel.server.model.Booking;
import com.smarttravel.server.model.Tour;
import com.smarttravel.server.model.User;
import com.smarttravel.server.repository.BookingRepository;
import com.smarttravel.server.repository.TourRepository;
import com.smarttravel.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TourRepository tourRepository;

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking getBookingById(int id) {
        return bookingRepository.findById(id).orElse(null);
    }

    @Override
    public Booking createBooking(Booking booking) {
        // Lấy user và tour từ ID
        int userId = booking.getUser().getId();
        int tourId = booking.getTour().getId();

        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Tour> tourOpt = tourRepository.findById(tourId);

        if (userOpt.isEmpty() || tourOpt.isEmpty()) {
            throw new RuntimeException("User hoặc Tour không tồn tại");
        }

        booking.setUser(userOpt.get());
        booking.setTour(tourOpt.get());
        booking.setBookingDate(LocalDateTime.now());
        booking.setStatus("Pending");

        return bookingRepository.save(booking);
    }

    @Override
    public Booking updateBooking(int id, Booking updatedBooking) {
        Optional<Booking> existing = bookingRepository.findById(id);
        if (existing.isPresent()) {
            updatedBooking.setId(id);
            return bookingRepository.save(updatedBooking);
        }
        return null;
    }

    @Override
    public boolean deleteBooking(int id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
