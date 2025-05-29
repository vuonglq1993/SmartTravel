package com.smarttravel.server.service.image;

import com.smarttravel.server.model.Image;
import com.smarttravel.server.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    @Override
    public Image getImageById(int id) {
        return imageRepository.findById(id).orElse(null);
    }

    @Override
    public Image createImage(Image image) {
        return imageRepository.save(image);
    }

    @Override
    public Image updateImage(int id, Image updatedImage) {
        Optional<Image> optionalImage = imageRepository.findById(id);
        if (optionalImage.isPresent()) {
            Image existing = optionalImage.get();
            existing.setTour(updatedImage.getTour());
            existing.setUrl(updatedImage.getUrl());
            existing.setDescription(updatedImage.getDescription());
            return imageRepository.save(existing);
        }
        return null;
    }

    @Override
    public boolean deleteImage(int id) {
        if (imageRepository.existsById(id)) {
            imageRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
