package com.smarttravel.server.service;

import com.smarttravel.server.model.User;
import com.smarttravel.server.dto.UserDTO;
import com.smarttravel.server.dto.ResultUser;
import com.smarttravel.server.repository.UserRepository;
import com.smarttravel.server.security.PasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public User registerUser(UserDTO userDTO) {
        // Kiểm tra email đã tồn tại chưa
        if (checkEmailExists(userDTO.getEmail())) {
            throw new IllegalArgumentException("Email đã tồn tại, không thể đăng ký.");
        }

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(
                PasswordEncryptor.encryptPasswordMD5(userDTO.getPassword())
        );

        try {
            return userRepository.save(user);
        } catch (DataIntegrityViolationException ex) {
            // Nếu có race condition gây trùng email khi lưu
            throw new IllegalArgumentException("Email đã tồn tại (lỗi từ database).");
        }
    }

    public ResultUser loginUser(UserDTO userDTO) {
    ResultUser resultUser = new ResultUser();

    Optional<User> existingUser = userRepository.findByEmail(userDTO.getEmail());

    if (existingUser.isPresent()) {
        String hashedPassword = PasswordEncryptor.encryptPasswordMD5(userDTO.getPassword());
        String storedPassword = existingUser.get().getPassword();

        if (hashedPassword.equals(storedPassword)) {
            // Đăng nhập thành công
            User loggedInUser = new User();
            loggedInUser.setId(existingUser.get().getId());
            loggedInUser.setUsername(existingUser.get().getUsername());
            loggedInUser.setEmail(existingUser.get().getEmail());

            resultUser.setResult(true);
            resultUser.setData(loggedInUser);
            return resultUser;
        }
    }

    // Sai tài khoản hoặc mật khẩu
    resultUser.setResult(false);
    resultUser.setData(null);
    return resultUser;
}

    public boolean checkEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }
}
