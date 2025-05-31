package com.smarttravel.server.service.user;

import com.smarttravel.server.model.User;
import java.util.List;

public interface UserService1 {
    List<User> getAllUsers();
    User getUserById(int id);
    User createUser(User user);
    User updateUser(int id, User user);
    boolean deleteUser(int id);
}
