package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

@Controller
@ResponseBody
@RequestMapping("/api/users")
public class UserRestController {

	@Autowired
	private UserService userService;

	@GetMapping
	public List<User> getUsers() {
		List<User> userList = userService.getUsers();
		return userList;
	}
	
	@GetMapping("/search/{query}")
	public List<User> searchBook(@PathVariable String query) {
		List<User> users = userService.getUserByName(query);
		return users;
	}
	
	@GetMapping("/{id}")
	public Map<String,Object> getUser(@PathVariable int id) {
		Map<String,Object> response = new HashMap<>();
		User user = userService.getUserById(id);
		if(user == null) {
			response.put("status", false);
			response.put("message", "User not found");
			return response;
		}
		response.put("status", true);
		response.put("message", "");
		response.put("user", user);
		return response;
	}

	@PostMapping("/add")
	public Map<String,Object> insertUser(@RequestBody User u) {
		Map<String,Object> response = new HashMap<>();
		if(userService.insertUser(u)) {
			response.put("status", true);
			response.put("message", "User is added");
		} else {
			response.put("status", false);
			response.put("message", "User is not added");
		}
		return response;
		
	}

	@PutMapping("/update/{id}")
	public Map<String,Object> updateUser(@PathVariable int id, @RequestBody User u) {
		Map<String,Object> response = new HashMap<>();
		if(userService.updateUser(id, u)) {
			response.put("status", true);
			response.put("message", "User is updated");
		} else {
			response.put("status", false);
			response.put("message", "User is not updated");
		}
		return response;
	}

	@DeleteMapping("/delete/{id}")
	public Map<String,Object> deleteUser(@PathVariable int id) {
		Map<String,Object> response = new HashMap<>();
		if(userService.deleteUser(id)) {
			response.put("status", true);
			response.put("message", "User is deleted");
		} else {
			response.put("status", false);
			response.put("message", "User is not deleted");
		}
		return response;
	}

}
