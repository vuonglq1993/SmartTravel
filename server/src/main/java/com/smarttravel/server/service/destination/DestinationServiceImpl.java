package com.smarttravel.server.service.destination;

import com.smarttravel.server.model.Destination;
import com.smarttravel.server.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DestinationServiceImpl implements DestinationService {

    @Autowired
    private DestinationRepository destinationRepository;

    @Override
    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    @Override
    public Destination getDestinationById(int id) {
        return destinationRepository.findById(id).orElse(null);
    }

    @Override
    public Destination createDestination(Destination destination) {
        return destinationRepository.save(destination);
    }

    @Override
    public Destination updateDestination(int id, Destination updatedDestination) {
        Optional<Destination> optionalDestination = destinationRepository.findById(id);
        if (optionalDestination.isPresent()) {
            Destination existing = optionalDestination.get();
            existing.setName(updatedDestination.getName());
            existing.setCountry(updatedDestination.getCountry());
            existing.setDescription(updatedDestination.getDescription());
            existing.setImageUrl(updatedDestination.getImageUrl());
            return destinationRepository.save(existing);
        }
        return null;
    }

    @Override
    public boolean deleteDestination(int id) {
        if (destinationRepository.existsById(id)) {
            destinationRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
