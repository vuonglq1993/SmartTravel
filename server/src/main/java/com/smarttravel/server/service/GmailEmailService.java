package com.smarttravel.server.service;

import com.smarttravel.server.dto.EmailDTO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class GmailEmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(EmailDTO emailDTO) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(emailDTO.getFrom());   // hoặc lấy từ cấu hình nếu muốn cố định
        helper.setTo(emailDTO.getTo());
        helper.setSubject(emailDTO.getSubject());
        helper.setText(emailDTO.getBody(), true);  // true = nội dung là HTML, false = plain text

        mailSender.send(message);
    }
}
