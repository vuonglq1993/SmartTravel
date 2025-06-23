package com.smarttravel.server.controller;

import com.smarttravel.server.dto.ImageDTO;
import com.smarttravel.server.service.image.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/images")
@CrossOrigin
public class ImageController {

    @Autowired
    private ImageService imageService;

    @GetMapping
    public List<ImageDTO> getAllImages() {
        return imageService.getAllImages();
    }

    @GetMapping("/{id}")
    public ImageDTO getImageById(@PathVariable int id) {
        return imageService.getImageById(id);
    }

    @PostMapping
    public ImageDTO createImage(@RequestBody ImageDTO dto) {
        return imageService.createImage(dto);
    }

    @PutMapping("/{id}")
    public ImageDTO updateImage(@PathVariable int id, @RequestBody ImageDTO dto) {
        return imageService.updateImage(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteImage(@PathVariable int id) {
        imageService.deleteImage(id);
    }
}
