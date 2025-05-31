package com.smarttravel.server.service.image;

import com.smarttravel.server.model.Image;
import java.util.List;

public interface ImageService {
    List<Image> getAllImages();
    Image getImageById(int id);
    Image createImage(Image image);
    Image updateImage(int id, Image image);
    boolean deleteImage(int id);
}
