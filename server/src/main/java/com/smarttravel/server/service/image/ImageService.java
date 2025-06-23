package com.smarttravel.server.service.image;

import com.smarttravel.server.dto.ImageDTO;
import java.util.List;

public interface ImageService {
    List<ImageDTO> getAllImages();
    ImageDTO getImageById(int id);
    ImageDTO createImage(ImageDTO dto);
    ImageDTO updateImage(int id, ImageDTO dto);
    void deleteImage(int id);
}
