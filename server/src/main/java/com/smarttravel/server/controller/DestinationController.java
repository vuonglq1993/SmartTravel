package com.smarttravel.server.controller;

import com.smarttravel.server.model.Destination;
import com.smarttravel.server.service.destination.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/destinations")
@CrossOrigin(origins = "*")
public class DestinationAdminController {

    @Autowired
    private DestinationService destinationService;

    @GetMapping
    public List<Destination> getAllDestinations() {
        return destinationService.getAllDestinations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Destination> getDestinationById(@PathVariable int id) {
        Destination dest = destinationService.getDestinationById(id);
        return dest != null ? ResponseEntity.ok(dest) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Destination createDestination(@RequestBody Destination destination) {
        return destinationService.createDestination(destination);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Destination> updateDestination(@PathVariable int id, @RequestBody Destination updatedDestination) {
        Destination dest = destinationService.updateDestination(id, updatedDestination);
        return dest != null ? ResponseEntity.ok(dest) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDestination(@PathVariable int id) {
        boolean deleted = destinationService.deleteDestination(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
