package com.smarttravel.server.controller;

import com.smarttravel.server.dto.ReviewDTO;
import com.smarttravel.server.model.Review;
import com.smarttravel.server.service.review.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // 📌 USER/ADMIN: Get all reviews
    @GetMapping
    public ResponseEntity<List<ReviewDTO>> getAllReviews() {
        return ResponseEntity.ok(reviewService.convertToDTOList(reviewService.getAllReviews()));
    }

    // 📌 USER/ADMIN: Get review by ID
    @GetMapping("/{id}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable int id) {
        Review review = reviewService.getReviewById(id);
        return review != null ? ResponseEntity.ok(reviewService.convertToDTO(review)) : ResponseEntity.notFound().build();
    }

    // 📌 USER/ADMIN: Get reviews by Tour ID
    @GetMapping("/tour/{tourId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByTourId(@PathVariable int tourId) {
        List<Review> reviews = reviewService.getReviewsByTourId(tourId);
        return ResponseEntity.ok(reviewService.convertToDTOList(reviews));
    }

    // 📌 USER: Create review
    @PostMapping
    public ResponseEntity<ReviewDTO> createReview(@RequestBody Review review) {
        Review created = reviewService.createReview(review);
        return ResponseEntity.ok(reviewService.convertToDTO(created));
    }

    // 📌 USER/ADMIN: Update review
    @PutMapping("/{id}")
    public ResponseEntity<ReviewDTO> updateReview(@PathVariable int id, @RequestBody Review review) {
        Review updated = reviewService.updateReview(id, review);
        return updated != null ? ResponseEntity.ok(reviewService.convertToDTO(updated)) : ResponseEntity.notFound().build();
    }

    // 📌 USER/ADMIN: Delete review
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable int id) {
        boolean deleted = reviewService.deleteReview(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
