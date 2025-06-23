package com.smarttravel.server.service.contactmessage;

import com.smarttravel.server.model.ContactMessage;
import com.smarttravel.server.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactMessageServiceImpl implements com.smarttravel.server.service.ContactMessageService {

    @Autowired
    private ContactMessageRepository repository;

    @Override
    public ContactMessage save(ContactMessage message) {
        return repository.save(message);
    }

    @Override
    public List<ContactMessage> getAll() {
        return repository.findAll();
    }

    @Override
    public ContactMessage getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public ContactMessage update(Long id, ContactMessage newMsg) {
        Optional<ContactMessage> opt = repository.findById(id);
        if (opt.isEmpty()) return null;
        ContactMessage msg = opt.get();
        msg.setFullName(newMsg.getFullName());
        msg.setEmail(newMsg.getEmail());
        msg.setPhone(newMsg.getPhone());
        msg.setMessage(newMsg.getMessage());
        msg.setSentAt(newMsg.getSentAt());
        return repository.save(msg);
    }

    @Override
    public boolean delete(Long id) {
        if (!repository.existsById(id)) return false;
        repository.deleteById(id);
        return true;
    }
}