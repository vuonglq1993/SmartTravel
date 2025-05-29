package com.smarttravel.server.controller;

import com.smarttravel.server.model.Tour;
import com.smarttravel.server.service.tour.TourService1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/tours")
@CrossOrigin(origins = "*")
public class TourAdminController {

    @Autowired
    private TourService1 tourService;

    @GetMapping
    public List<Tour> getAllTours() {
        return tourService.getAllTours();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tour> getTourById(@PathVariable int id) {
        Tour tour = tourService.getTourById(id);
        return tour != null ? ResponseEntity.ok(tour) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Tour createTour(@RequestBody Tour tour) {
        return tourService.createTour(tour);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tour> updateTour(@PathVariable int id, @RequestBody Tour updatedTour) {
        Tour tour = tourService.updateTour(id, updatedTour);
        return tour != null ? ResponseEntity.ok(tour) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTour(@PathVariable int id) {
        boolean deleted = tourService.deleteTour(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
