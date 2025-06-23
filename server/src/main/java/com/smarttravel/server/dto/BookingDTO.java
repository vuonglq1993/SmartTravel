package com.smarttravel.server.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingDTO {
    private int id;

    // Booking date should match the LocalDateTime type in the model
    private String bookingDate; // ISO 8601 string (you can format it via formatter if needed)

    private int quantity;
    private double totalPrice;
    private String status;

    // User details
    private int userId;
    private String username;

    // Tour details
    private int tourId;
    private String tourTitle;
}
