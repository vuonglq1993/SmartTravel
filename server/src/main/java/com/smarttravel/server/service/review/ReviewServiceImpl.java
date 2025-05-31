package com.smarttravel.server.service.review;

import com.smarttravel.server.model.Review;
import com.smarttravel.server.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        if (existing.isPresent()) {
            updatedReview.setId(id);
            return reviewRepository.save(updatedReview);
        }
        return null;
    }

    @Override
    public boolean deleteReview(int id) {
        if (reviewRepository.existsById(id)) {
            reviewRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
