package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

	@RequestMapping(value = { "", "/home" })
	public String Home() {
//		String password = "123456"; 
//	    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); 
//	    String encodedPassword = passwordEncoder.encode(password);  
//	    System.out.print(encodedPassword);
		return "home";
	}
}
