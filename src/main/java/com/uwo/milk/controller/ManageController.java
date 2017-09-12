package com.uwo.milk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by xuyu on 2017/9/11.
 */
@Controller
public class ManageController {

    @RequestMapping(value = "/manage", method = RequestMethod.GET)
    public String manage(){
        return "login";
    }

}
