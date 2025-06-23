package com.smarttravel.server.service.image;

import com.smarttravel.server.dto.ImageDTO;
import com.smarttravel.server.model.Image;
import com.smarttravel.server.model.Tour;
import com.smarttravel.server.repository.ImageRepository;
import com.smarttravel.server.repository.TourRepository;
import com.smarttravel.server.service.image.ImageService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private TourRepository tourRepository;

    @Override
    public List<ImageDTO> getAllImages() {
        return imageRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ImageDTO getImageById(int id) {
        Image image = imageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Image not found"));
        return convertToDTO(image);
    }

    @Override
    public ImageDTO createImage(ImageDTO dto) {
        Tour tour = tourRepository.findById(dto.getTourId())
                .orElseThrow(() -> new EntityNotFoundException("Tour not found"));

        Image image = new Image();
        image.setUrl(dto.getUrl());
        image.setDescription(dto.getDescription());
        image.setTour(tour);

        return convertToDTO(imageRepository.save(image));
    }

    @Override
    public ImageDTO updateImage(int id, ImageDTO dto) {
        Image image = imageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Image not found"));

        Tour tour = tourRepository.findById(dto.getTourId())
                .orElseThrow(() -> new EntityNotFoundException("Tour not found"));

        image.setUrl(dto.getUrl());
        image.setDescription(dto.getDescription());
        image.setTour(tour);

        return convertToDTO(imageRepository.save(image));
    }

    @Override
    public void deleteImage(int id) {
        imageRepository.deleteById(id);
    }

    private ImageDTO convertToDTO(Image image) {
        ImageDTO dto = new ImageDTO();
        dto.setId(image.getId());
        dto.setUrl(image.getUrl());
        dto.setDescription(image.getDescription());
        dto.setTourId(image.getTour().getId());
        return dto;
    }
}
