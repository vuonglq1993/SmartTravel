package com.smarttravel.server.controller;

import com.smarttravel.server.model.Image;
import com.smarttravel.server.service.image.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "*")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @GetMapping
    public List<Image> getAllImages() {
        return imageService.getAllImages(); // 👉 Gọi đúng cái bạn vừa khoe
    }

    // bonus: get image by id nếu cần
    @GetMapping("/{id}")
    public Image getImageById(@PathVariable int id) {
        return imageService.getImageById(id);
    }
}

