package com.smarttravel.server.service.user;

import com.smarttravel.server.model.User;
import com.smarttravel.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class UserServiceImpl implements UserService1 {


    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(int id) {
        Optional<User> optionalUser = userRepository.findById((long) id);
        return optionalUser.orElse(null);
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(int id, User updatedUser) {
        Optional<User> optionalUser = userRepository.findById((long) id);
        if (optionalUser.isPresent()) {
            User existing = optionalUser.get();
            existing.setUsername(updatedUser.getUsername());
            existing.setEmail(updatedUser.getEmail());
            existing.setPassword(updatedUser.getPassword());
            return userRepository.save(existing);
        }
        return null;
    }

    @Override
    public boolean deleteUser(int id) {
        if (userRepository.existsById((long) id)) {
            userRepository.deleteById((long) id);
            return true;
        }
        return false;
    }
}
