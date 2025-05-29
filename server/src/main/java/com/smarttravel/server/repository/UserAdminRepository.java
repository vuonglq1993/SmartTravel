package com.smarttravel.server.repository;

import com.smarttravel.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAdminRepository extends JpaRepository<User, Integer> {
}
