package com.smarttravel.server.repository;

import com.smarttravel.server.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Integer> {
}
