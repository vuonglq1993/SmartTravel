package com.smarttravel.server.service.review;

import com.smarttravel.server.model.Review;
import java.util.List;

public interface ReviewService {
    List<Review> getAllReviews();
    Review getReviewById(int id);
    Review createReview(Review review);
    Review updateReview(int id, Review review);
    boolean deleteReview(int id);
}
