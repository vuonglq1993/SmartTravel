package com.smarttravel.server.controller;

import com.smarttravel.server.dto.EmailDTO;
import com.smarttravel.server.service.GmailEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")

public class EmailController {

    @Autowired
    private GmailEmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody EmailDTO emailDTO) {
        try {
            emailService.sendEmail(emailDTO);
            return ResponseEntity.ok("Email sent successfully");
        } catch (Exception e) {
            e.printStackTrace();  // In lỗi ra console backend
            return ResponseEntity.status(500).body("Error sending email: " + e.getMessage());
        }
    }
}
