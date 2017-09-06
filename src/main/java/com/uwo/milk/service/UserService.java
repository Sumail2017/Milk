package com.uwo.milk.service;

import com.uwo.milk.mapper.UserMapper;
import com.uwo.milk.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by yanhao on 2017/8/31.
 */
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public User selectByUsername(String username){
        return userMapper.selectByUsername(username);
    }

}
