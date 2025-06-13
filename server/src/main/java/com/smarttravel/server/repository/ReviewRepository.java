package com.smarttravel.server.repository;

import com.smarttravel.server.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface ReviewRepository extends JpaRepository<Review, Integer> {

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.tour.id = :tourId")
    Double findAverageRatingByTourId(@Param("tourId") int tourId);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.tour.id = :tourId")
    Long countByTourId(@Param("tourId") int tourId);
}
