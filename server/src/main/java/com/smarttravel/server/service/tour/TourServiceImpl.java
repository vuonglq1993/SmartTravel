package com.smarttravel.server.service.tour;

import com.smarttravel.server.dto.TourDTO;
import com.smarttravel.server.model.Tour;
import com.smarttravel.server.repository.DestinationRepository;
import com.smarttravel.server.repository.TourRepository;
import com.smarttravel.server.specification.TourSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TourServiceImpl implements TourService {

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private DestinationRepository destinationRepository;

    @Override
    public Tour createTour(Tour tour) {
        if (tour.getImageUrl() != null && tour.getDestination() != null) {
            int destId = tour.getDestination().getId();
            destinationRepository.findById(destId).ifPresent(destination -> {
                destination.setImageUrl(tour.getImageUrl());
                destinationRepository.save(destination);
            });
        }
        return tourRepository.save(tour);
    }

    @Override
    public Tour getTourById(int id) {
        return tourRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tour với ID: " + id));
    }

    @Override
    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    @Override
    public Tour updateTour(int id, Tour tour) {
        Optional<Tour> existingTour = tourRepository.findById(id);
        if (existingTour.isPresent()) {
            tour.setId(id);
            return tourRepository.save(tour);
        }
        return null;
    }

    @Override
    public boolean deleteTour(int id) {
        if (tourRepository.existsById(id)) {
            tourRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Tour> searchTours(Boolean available, LocalDate startDate, LocalDate endDate,
                                  Double minPrice, Double maxPrice, String destinationName,
                                  String country, Pageable pageable) {

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
        } else if (minPrice != null) {
            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("price"), minPrice));
        } else if (maxPrice != null) {
            spec = spec.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("price"), maxPrice));
        }

        if (destinationName != null && !destinationName.isEmpty()) {
            spec = spec.and(TourSpecification.hasDestinationName(destinationName));
        }

        if (country != null && !country.isEmpty()) {
            spec = spec.and(TourSpecification.hasCountry(country));
        }

        return tourRepository.findAll(spec, pageable).getContent();
    }

    @Override
    public TourDTO convertToDTO(Tour tour) {
        if (tour == null) return null;

        double avgRating = 0;
        int reviewCount = 0;

        if (tour.getReviews() != null && !tour.getReviews().isEmpty()) {
            reviewCount = tour.getReviews().size();
            avgRating = tour.getReviews().stream()
                    .mapToInt(r -> r.getRating())
                    .average()
                    .orElse(0.0);
        }

        return TourDTO.builder()
                .id(tour.getId())
                .title(tour.getTitle())
                .description(tour.getDescription())
                .price(tour.getPrice())
                .startDate(tour.getStartDate())
                .endDate(tour.getEndDate())
                .averageRating(avgRating)
                .reviewCount(reviewCount)
                .destination(tour.getDestination())
                .imageUrl(tour.getImageUrl())
                .build();
    }

    @Override
    public List<TourDTO> convertToDTOList(List<Tour> tours) {
        return tours.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}
