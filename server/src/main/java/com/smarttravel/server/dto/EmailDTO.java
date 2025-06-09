package com.smarttravel.server.dto;

public class EmailDTO {
    private String from;    // có thể là email gửi (tùy chọn)
    private String to;      // email nhận
    private String subject; // tiêu đề
    private String body;    // nội dung email (text hoặc html)

    // Getter và Setter
    public String getFrom() {
        return from;
    }
    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }
    public void setTo(String to) {
        this.to = to;
    }

    public String getSubject() {
        return subject;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }
    public void setBody(String body) {
        this.body = body;
    }
}
