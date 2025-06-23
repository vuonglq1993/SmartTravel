package com.smarttravel.server.service.review;

import com.smarttravel.server.dto.ReviewDTO;
import com.smarttravel.server.model.Review;

import java.util.List;

public interface ReviewService {
    List<Review> getAllReviews();
    Review getReviewById(int id);
    Review createReview(Review review);
    Review updateReview(int id, Review review);
    boolean deleteReview(int id);

    List<Review> getReviewsByTourId(int tourId);
    Double getAverageRatingByTourId(int tourId);
    Long countReviewsByTourId(int tourId);

    ReviewDTO convertToDTO(Review review);
    List<ReviewDTO> convertToDTOList(List<Review> reviews);
}