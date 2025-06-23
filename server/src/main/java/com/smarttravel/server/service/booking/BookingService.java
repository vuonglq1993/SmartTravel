package com.smarttravel.server.service.booking;

import com.smarttravel.server.dto.BookingDTO;
import com.smarttravel.server.model.Booking;

import java.util.List;

public interface BookingService {

    // Fetch all bookings as DTOs (suitable for frontend)
    List<BookingDTO> getAllBookingDTOs();

    // Get a booking entity by ID
    Booking getBookingById(int id);

    // Create a new booking
    Booking createBooking(Booking booking);

    // Update booking info by ID
    Booking updateBooking(int id, Booking booking);

    // Delete a booking by ID
    boolean deleteBooking(int id);

    // Confirm the booking's status (e.g., mark as 'confirmed')
    Booking confirmBookingStatus(int id);

    // Convert Booking entity to DTO
    BookingDTO convertToDTO(Booking booking);
}
