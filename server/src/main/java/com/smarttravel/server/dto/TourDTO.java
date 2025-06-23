package com.smarttravel.server.dto;

import com.smarttravel.server.model.Destination;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TourDTO {
    private int id;
    private String title;
    private String description;
    private double price;
    private LocalDate startDate;
    private LocalDate endDate;
    private double averageRating;
    private int reviewCount;
    private Destination destination;
    private String imageUrl;
}