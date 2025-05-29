package com.smarttravel.server.service;

import com.smarttravel.server.model.Tour;
import com.smarttravel.server.repository.TourRepository;
import com.smarttravel.server.specification.TourSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TourService {

    @Autowired
    private TourRepository tourRepository;

    public Tour getTourById(int id) {
        return tourRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tour với ID: " + id));
    }

    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    public List<Tour> searchTours(
            Boolean available,
            LocalDate startDate,
            LocalDate endDate,
            Double minPrice,
            Double maxPrice,
            String destinationName,
            String country,
            Pageable pageable) {

        Specification<Tour> spec = Specification.where(null);

        if (Boolean.TRUE.equals(available)) {
            spec = spec.and(TourSpecification.hasAvailableCapacity());
        }

        if (startDate != null) {
            spec = spec.and(TourSpecification.hasStartDateAfter(startDate));
        }

        if (endDate != null) {
            spec = spec.and(TourSpecification.hasEndDateBefore(endDate));
        }

        if (minPrice != null && maxPrice != null) {
            spec = spec.and(TourSpecification.hasPriceBetween(minPrice, maxPrice));
        }

        if (destinationName != null && !destinationName.isEmpty()) {
            spec = spec.and(TourSpecification.hasDestinationName(destinationName));
        }

        if (country != null && !country.isEmpty()) {
            spec = spec.and(TourSpecification.hasCountry(country));
        }

        return tourRepository.findAll(spec, pageable).getContent();
    }
}