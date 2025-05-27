package com.smarttravel.server.controller;

import com.smarttravel.server.dto.ResultUser;
import com.smarttravel.server.model.User;
import com.smarttravel.server.dto.UserDTO;
import com.smarttravel.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;

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

    @GetMapping("/check-email")
    public ResponseEntity<Map<String, Object>> checkEmail(@RequestParam("email") String email) {
        boolean exists = userService.checkEmailExists(email);

        Map<String, Object> response = new HashMap<>();
        response.put("exists", exists);
        response.put("message", exists ? "Email đã được đăng ký." : "Email có thể sử dụng.");

        return ResponseEntity.ok(response);
    }

}




