package com.smarttravel.server.controller;

import com.smarttravel.server.dto.TourDTO;
import com.smarttravel.server.model.Tour;
import com.smarttravel.server.service.tour.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tours")
@CrossOrigin(origins = "*")
public class TourController {

    @Autowired
    private TourService tourService;

    // 📌 USER: Get all tours (DTO)
    @GetMapping
    public ResponseEntity<List<TourDTO>> getAllTours() {
        List<TourDTO> tours = tourService.convertToDTOList(tourService.getAllTours());
        return ResponseEntity.ok(tours);
    }

    // 📌 USER: Get tour by ID (DTO)
    @GetMapping("/{id}")
    public ResponseEntity<TourDTO> getTourById(@PathVariable int id) {
        Tour tour = tourService.getTourById(id);
        return ResponseEntity.ok(tourService.convertToDTO(tour));
    }

    // 📌 USER: Search tours (DTO)
    @GetMapping("/search")
    public ResponseEntity<List<TourDTO>> searchTours(
            @RequestParam(required = false) Boolean available,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String destinationName,
            @RequestParam(required = false) String country,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "price") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        List<TourDTO> result = tourService.convertToDTOList(
                tourService.searchTours(available, startDate, endDate, minPrice, maxPrice, destinationName, country, pageable));

        return ResponseEntity.ok(result);
    }

    // 📌 ADMIN: Create new tour
    @PostMapping
    public Tour createTour(@RequestBody Tour tour) {
        return tourService.createTour(tour);
    }

    // 📌 ADMIN: Update tour
    @PutMapping("/{id}")
    public ResponseEntity<Tour> updateTour(@PathVariable int id, @RequestBody Tour updatedTour) {
        Tour tour = tourService.updateTour(id, updatedTour);
        return tour != null ? ResponseEntity.ok(tour) : ResponseEntity.notFound().build();
    }

    // 📌 ADMIN: Delete tour
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTour(@PathVariable int id) {
        boolean deleted = tourService.deleteTour(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
