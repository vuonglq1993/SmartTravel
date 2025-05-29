package com.smarttravel.server.service.tour;

import com.smarttravel.server.model.Tour;
import com.smarttravel.server.repository.TourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TourServiceImpl implements TourService1 {

    @Autowired
    private TourRepository tourRepository;

    @Override
    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    @Override
    public Tour getTourById(int id) {
        return tourRepository.findById(id).orElse(null);
    }

    @Override
    public Tour createTour(Tour tour) {
        return tourRepository.save(tour);
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
}
