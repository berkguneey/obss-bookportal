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

import com.example.demo.model.Author;
import com.example.demo.service.AuthorService;
import com.example.demo.service.BookService;

@Controller
@ResponseBody
@RequestMapping("/api/authors")
public class AuthorRestController {

	@Autowired
	private AuthorService authorService;
	@Autowired
	private BookService bookService;
	
	@GetMapping
	public List<Author> getAuthors() {
		List<Author> authorList = authorService.getAuthors();
		return authorList;
	}
	
	@GetMapping("/{id}")
	public Map<String,Object> getAuthor(@PathVariable int id) {
		Map<String,Object> response = new HashMap<>();
		Author author = authorService.getAuthorById(id);
		if(author == null) {
			response.put("status", false);
			response.put("message", "Author not found");
			return response;
		}
		response.put("status", true);
		response.put("message", "");
		response.put("author", author);
		return response;
	}

	@PostMapping("/add")
	public Map<String,Object> insertAuthor(@RequestBody Author a) {
		Map<String,Object> response = new HashMap<>();
		if(authorService.insertAuthor(a)){
			response.put("status", true);
			response.put("message", "Author is added");
		} else {
			response.put("status", false);
			response.put("message", "Author is not added");
		}
		return response;
	}

	@PutMapping("/update/{id}")
	public Map<String,Object> updateAuthor(@PathVariable int id, @RequestBody Author a) {
		Map<String,Object> response = new HashMap<>();
		if(authorService.updateAuthor(id, a)) {
			response.put("status", true);
			response.put("message", "Author is updated");
		} else {
			response.put("status", false);
			response.put("message", "Author is not updated");
		}
		return response;
	}

	@DeleteMapping("/delete/{id}")
	public Map<String,Object> deleteAuthor(@PathVariable int id) {
		Map<String,Object> response = new HashMap<>();
		Boolean status = this.bookService.deleteBookByAuthorId(id);
		if(!status) {
			response.put("status", false);
			response.put("message", "Books of author can't deleted");
			return response;
		}
		if(authorService.deleteAuthor(id)){
			response.put("status", true);
			response.put("message", "Author is deleted");
		} else {
			response.put("status", false);
			response.put("message", "Author is not deleted");
		}
		return response;
	}

}
