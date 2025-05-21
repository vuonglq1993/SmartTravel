package com.smarttravel.server.controller;

import com.smarttravel.server.dto.ResultUser;
import com.smarttravel.server.model.User;
import com.smarttravel.server.dto.UserDTO;
import com.smarttravel.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    // Đăng ký người dùng
    @PostMapping("/create")
    public User createUser(@Valid @RequestBody UserDTO registerRequest) {
        return userService.registerUser(registerRequest);
    }

    // Đăng nhập
    @PostMapping("/login")
    public ResultUser login(@Valid @RequestBody UserDTO loginRequest) {
        return userService.loginUser(loginRequest);
    }

    // Kiểm tra server
    @GetMapping("/status")
    public String getStatus() {
        return "Server is running";
    }
}

