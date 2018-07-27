//package com.example.demo;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.ComponentScan;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.EnableWebMvc;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//import org.springframework.web.servlet.view.InternalResourceViewResolver;
//import org.springframework.web.servlet.view.JstlView;
//
//@EnableWebMvc
//@ComponentScan
//@Configuration
//public class Config implements WebMvcConfigurer{
//	@Bean
//	public InternalResourceViewResolver jspViewResolver() {
//		InternalResourceViewResolver bean = new InternalResourceViewResolver();
//		bean.setPrefix("/webapp/views/");
//		bean.setSuffix(".jsp");
//		bean.setViewClass(JstlView.class);
//		return bean;
//	}
//
//	
//}
//
