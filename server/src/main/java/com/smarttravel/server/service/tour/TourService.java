package com.smarttravel.server.service.tour;

import com.smarttravel.server.dto.TourDTO;
import com.smarttravel.server.model.Tour;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface TourService {
    List<Tour> getAllTours();
    Tour getTourById(int id);
    Tour createTour(Tour tour);
    Tour updateTour(int id, Tour tour);
    boolean deleteTour(int id);

    List<Tour> searchTours(Boolean available, LocalDate startDate, LocalDate endDate,
                           Double minPrice, Double maxPrice, String destinationName,
                           String country, Pageable pageable);

    TourDTO convertToDTO(Tour tour);
    List<TourDTO> convertToDTOList(List<Tour> tours);
}
