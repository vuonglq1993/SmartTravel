package com.smarttravel.server.controller;

import com.smarttravel.server.model.Tour;
import com.smarttravel.server.service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/tours")
public class TourController {

    @Autowired
    private TourService tourService;

    @GetMapping("/search-by-country")
    public ResponseEntity<List<Tour>> searchToursByCountry(
            @RequestParam String country) {
        List<Tour> result = tourService.getToursByCountry(country);
        return ResponseEntity.ok(result);
    }
}

