package com.smarttravel.server.repository;

import com.smarttravel.server.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    // Get all reviews for a specific tour
    List<Review> findByTourId(int tourId);

    // Calculate average rating for a specific tour
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.tour.id = :tourId")
    Double findAverageRatingByTourId(@Param("tourId") int tourId);

    // Count number of reviews for a specific tour
    @Query("SELECT COUNT(r) FROM Review r WHERE r.tour.id = :tourId")
    Long countByTourId(@Param("tourId") int tourId);
}