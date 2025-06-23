package com.smarttravel.server.controller;

import com.smarttravel.server.dto.BookingDTO;
import com.smarttravel.server.model.Booking;
import com.smarttravel.server.service.booking.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;


    @GetMapping
    public List<BookingDTO> getAllBookings() {
        return bookingService.getAllBookingDTOs();
    }

    @GetMapping("/{id}")
    public BookingDTO getBookingById(@PathVariable int id) {
        return bookingService.convertToDTO(
                bookingService.getBookingById(id)
        );
    }

    @PostMapping
    public BookingDTO createBooking(@RequestBody Booking booking) {
        return bookingService.convertToDTO(
                bookingService.createBooking(booking)
        );
    }

    @PutMapping("/{id}")
    public BookingDTO updateBooking(@PathVariable int id, @RequestBody Booking booking) {
        return bookingService.convertToDTO(
                bookingService.updateBooking(id, booking)
        );
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable int id) {
        if (!bookingService.deleteBooking(id)) {
            throw new RuntimeException("Cannot delete. Booking not found with ID: " + id);
        }
    }

    @PutMapping("/{id}/confirm")
    public BookingDTO confirmBookingStatus(@PathVariable int id) {
        return bookingService.convertToDTO(
                bookingService.confirmBookingStatus(id)
        );
    }
}
