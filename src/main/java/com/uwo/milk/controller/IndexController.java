package com.uwo.milk.controller;

import com.uwo.milk.pojo.User;
import com.uwo.milk.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by yanhao on 2017/8/31.
 */
@Controller
public class IndexController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(){
        return "wandashan/index2";
    }

    @ResponseBody
    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public Object user(){
        User user = userService.selectByUsername("yanhao");
        return user;
    }

}
