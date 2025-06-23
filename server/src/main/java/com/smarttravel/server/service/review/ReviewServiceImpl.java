package com.smarttravel.server.service.review;

import com.smarttravel.server.dto.ReviewDTO;
import com.smarttravel.server.model.Review;
import com.smarttravel.server.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public Review getReviewById(int id) {
        return reviewRepository.findById(id).orElse(null);
    }

    @Override
    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public Review updateReview(int id, Review updatedReview) {
        Optional<Review> existing = reviewRepository.findById(id);
        if (existing.isEmpty()) return null;

        Review review = existing.get();
        review.setComment(updatedReview.getComment());
        review.setRating(updatedReview.getRating());
        review.setTour(updatedReview.getTour());
        review.setUser(updatedReview.getUser());

        return reviewRepository.save(review);
    }

    @Override
    public boolean deleteReview(int id) {
        if (!reviewRepository.existsById(id)) return false;
        reviewRepository.deleteById(id);
        return true;
    }

    @Override
    public List<Review> getReviewsByTourId(int tourId) {
        return reviewRepository.findByTourId(tourId);
    }

    @Override
    public Double getAverageRatingByTourId(int tourId) {
        return reviewRepository.findAverageRatingByTourId(tourId);
    }

    @Override
    public Long countReviewsByTourId(int tourId) {
        return reviewRepository.countByTourId(tourId);
    }

    @Override
    public ReviewDTO convertToDTO(Review review) {
        if (review == null) return null;
        return ReviewDTO.builder()
                .id(review.getId())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .tourId(review.getTour().getId())
                .username(review.getUser().getUsername())
                .build();
    }

    @Override
    public List<ReviewDTO> convertToDTOList(List<Review> reviews) {
        return reviews.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}