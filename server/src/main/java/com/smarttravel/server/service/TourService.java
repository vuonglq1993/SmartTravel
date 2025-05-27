package com.smarttravel.server.service;

import com.smarttravel.server.model.Tour;
import com.smarttravel.server.repository.TourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TourService {

    @Autowired
    private TourRepository tourRepository;

    public List<Tour> getToursByCountry(String country) {
        return tourRepository.findByDestination_CountryContainingIgnoreCase(country);
    }
}
