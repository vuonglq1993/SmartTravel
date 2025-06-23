package com.smarttravel.server.service.contactmessage;

import com.smarttravel.server.model.ContactMessage;

import java.util.List;

public interface ContactMessageService {
    ContactMessage save(ContactMessage message);
    List<ContactMessage> getAll();
    ContactMessage getById(Long id);
    ContactMessage update(Long id, ContactMessage message);
    boolean delete(Long id);
}