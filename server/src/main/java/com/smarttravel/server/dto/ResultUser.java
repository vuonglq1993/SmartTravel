package com.smarttravel.server.dto;

import com.smarttravel.server.model.User;
import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor

public class ResultUser {
    boolean result;
    User data;

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public User getData() {
        return data;
    }

    public void setData(User data) {
        this.data = data;
    }
}

