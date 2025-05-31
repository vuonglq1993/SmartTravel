package com.smarttravel.server.service.booking;

import com.smarttravel.server.model.Booking;
import java.util.List;

public interface BookingService {
    List<Booking> getAllBookings();
    Booking getBookingById(int id);
    Booking createBooking(Booking booking);
    Booking updateBooking(int id, Booking booking);
    boolean deleteBooking(int id);
}
