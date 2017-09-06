package com.uwo.milk.configuration;

import com.alibaba.druid.pool.DruidDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.sql.SQLException;

/**
 * Created by yanhao on 2017/8/9.
 */
@Order(1)
@Configuration
@EnableConfigurationProperties({DataSourceProperties.class})
public class DataSourceConfiguration {

    private final Logger log = LoggerFactory.getLogger(DataSourceConfiguration.class);

    @Autowired
    private DataSourceProperties dataSourceProperties;


    /**
     * 创建DruidDataSource
     * @return
     */
    @Bean
    public DruidDataSource druidDataSource(){
        log.warn(String.format("apollo configutation = datasource connection factory driver-class-name = %s, " +
                        "url = %s ,username = %s ,password = %s",
                dataSourceProperties.getDriverClassName(), dataSourceProperties.getUrl(),
                dataSourceProperties.getUsername(), dataSourceProperties.getPassword()));
        // 判断是否存在dataSource
        DruidDataSource   dataSource = new DruidDataSource();
        // 设置配置信息
        dataSource.setDriverClassName(dataSourceProperties.getDriverClassName());
        dataSource.setUrl(dataSourceProperties.getUrl());
        dataSource.setUsername(dataSourceProperties.getUsername());
        dataSource.setPassword(dataSourceProperties.getPassword());
        return dataSource;
    }

}
