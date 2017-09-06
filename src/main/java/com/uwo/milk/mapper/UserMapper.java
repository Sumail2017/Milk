package com.uwo.milk.mapper;

import com.uwo.milk.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * Created by yanhao on 2017/8/2.
 */
@Mapper
public interface UserMapper {

    User selectByUsername(@Param("username") String username);

}
