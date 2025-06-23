package com.smarttravel.server.controller;

import com.smarttravel.server.model.ContactMessage;
import com.smarttravel.server.service.contactmessage.ContactMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // sửa theo port frontend của bạn
public class    ContactMessageController {

    private final ContactMessageService service;

    public ContactMessageController(ContactMessageService service) {
        this.service = service;
    }

    @PostMapping("/contact")
    public ResponseEntity<String> saveContact(@RequestBody ContactMessage message) {
        service.save(message);
        return ResponseEntity.ok("Message saved successfully");
    }
}
