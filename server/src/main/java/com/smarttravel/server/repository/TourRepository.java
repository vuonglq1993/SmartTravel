package com.smarttravel.server.repository;

import com.smarttravel.server.model.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TourRepository extends JpaRepository<Tour, Integer>, JpaSpecificationExecutor<Tour> {

    @EntityGraph(attributePaths = {"destination"})
    Page<Tour> findAll(Pageable pageable);

    @EntityGraph(attributePaths = {"destination"})
    Optional<Tour> findById(Integer id);
}