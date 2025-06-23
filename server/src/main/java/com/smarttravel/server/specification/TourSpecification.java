package com.smarttravel.server.specification;

import com.smarttravel.server.model.Tour;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Join;

import java.time.LocalDate;

public class TourSpecification {

    public static Specification<Tour> hasAvailableCapacity() {
        return (root, query, cb) -> cb.greaterThan(root.get("capacity"), 0);
    }

    public static Specification<Tour> hasStartDateAfter(LocalDate startDate) {
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("startDate"), startDate);
    }

    public static Specification<Tour> hasEndDateBefore(LocalDate endDate) {
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get("endDate"), endDate);
    }

    public static Specification<Tour> hasPriceBetween(Double min, Double max) {
        if (min != null && max != null) {
            return (root, query, cb) -> cb.between(root.get("price"), min, max);
        } else if (min != null) {
            return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("price"), min);
        } else if (max != null) {
            return (root, query, cb) -> cb.lessThanOrEqualTo(root.get("price"), max);
        } else {
            return null;
        }
    }

    public static Specification<Tour> hasDestinationName(String name) {
        return (root, query, cb) ->
                cb.like(cb.lower(root.get("destination").get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<Tour> hasCountry(String country) {
        return (root, query, cb) -> {
            Join<Object, Object> destinationJoin = root.join("destination", JoinType.INNER);
            return cb.like(cb.lower(destinationJoin.get("country")), "%" + country.toLowerCase() + "%");
        };
    }
}
