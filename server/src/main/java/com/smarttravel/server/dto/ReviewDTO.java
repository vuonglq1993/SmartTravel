// ReviewDTO.java
package com.smarttravel.server.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDTO {
    private int id;
    private int rating;
    private String comment;
    private String username;
    private int tourId;
    private LocalDateTime createdAt;
}
