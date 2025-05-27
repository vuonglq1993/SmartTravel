package com.smarttravel.server.repository;

import com.smarttravel.server.model.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<Tour, Integer> {

    // Search theo destination.country (exact match)
    List<Tour> findByDestination_CountryIgnoreCase(String country);

    // Hoặc nếu muốn fuzzy search:
    List<Tour> findByDestination_CountryContainingIgnoreCase(String keyword);
}
