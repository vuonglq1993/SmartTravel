package com.smarttravel.server.dto;

import lombok.Builder;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageDTO {
    private int id;
    private String url;
    private String description;
    private int tourId;

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getTourId() { return tourId; }
    public void setTourId(int tourId) { this.tourId = tourId; }
}
