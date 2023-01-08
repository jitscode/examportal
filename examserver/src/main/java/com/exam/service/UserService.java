package com.exam.service;

import com.exam.model.User;
import com.exam.model.UserRole;

import java.util.Set;

public interface UserService {

    //creating User

    public User createUser(User user, Set<UserRole> userRoles) throws Exception;
    //get user by username
    public User getUser(String username);

    //get delete user by id
    public void deleteUser(Long userId);

    //update user using username


}
