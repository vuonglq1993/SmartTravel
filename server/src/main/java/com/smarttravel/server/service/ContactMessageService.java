package com.smarttravel.server.service;

import com.smarttravel.server.dto.EmailDTO;
import com.smarttravel.server.model.ContactMessage;
import com.smarttravel.server.repository.ContactMessageRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class ContactMessageService {

    private final ContactMessageRepository repository;

    public ContactMessageService(ContactMessageRepository repository) {
        this.repository = repository;
    }

    public ContactMessage save(ContactMessage message) {
        return repository.save(message);
    }

    @Service
    public static class GmailEmailService {

        @Autowired
        private JavaMailSender mailSender;

        public void sendEmail(EmailDTO emailDTO) {
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                helper.setFrom(emailDTO.getFrom() != null ? emailDTO.getFrom() : "your.email@gmail.com");
                helper.setTo(emailDTO.getTo());
                helper.setSubject(emailDTO.getSubject());

                // Gửi email dạng text thuần hoặc HTML (tùy)
                // Nếu muốn gửi html: helper.setText(emailDTO.getBody(), true);
                helper.setText(emailDTO.getBody(), false); // false = plain text

                mailSender.send(message);
            } catch (MessagingException e) {
                throw new RuntimeException("Failed to send email via Gmail SMTP: " + e.getMessage(), e);
            }
        }
    }
}
