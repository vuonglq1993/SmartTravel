package com.smarttravel.server.service.destination;

import com.smarttravel.server.model.Destination;
import java.util.List;

public interface DestinationService {
    List<Destination> getAllDestinations();
    Destination getDestinationById(int id);
    Destination createDestination(Destination destination);
    Destination updateDestination(int id, Destination destination);
    boolean deleteDestination(int id);
}
