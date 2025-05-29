package com.smarttravel.server.service.tour;

import com.smarttravel.server.model.Tour;
import java.util.List;

public interface TourService1 {
    List<Tour> getAllTours();
    Tour getTourById(int id);
    Tour createTour(Tour tour);
    Tour updateTour(int id, Tour tour);
    boolean deleteTour(int id);
}
