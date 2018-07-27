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

import com.example.demo.model.Book;
import com.example.demo.service.BookService;
import com.example.demo.service.RelationService;

@Controller
@ResponseBody
@RequestMapping("/api/books")
public class BookRestController {

	@Autowired
	private BookService bookService;
	@Autowired
	private RelationService relationService;
	
	@GetMapping
	public List<Book> getBooks() {
		List<Book> bookList = bookService.getBooks();
		return bookList;
	}
	
	@GetMapping("/{id}")
	public Map<String,Object> getBook(@PathVariable int id) {
		Map<String,Object> response = new HashMap<>();
		Book book = bookService.getBookById(id);
		if(book == null) {
			response.put("status", false);
			response.put("message", "Book not found");
			return response;
		}
		response.put("status", true);
		response.put("message", "");
		response.put("book", book);
		return response;
	}
	
	@GetMapping("/search/{query}")
	public List<Book> searchBook(@PathVariable String query) {
		List<Book> books = bookService.getBookByName(query);
		return books;
	}

	@PostMapping("/add")
	public Map<String,Object> insertBook(@RequestBody Book b) {
		Map<String,Object> response = new HashMap<>();
		if(bookService.insertBook(b)) {
			response.put("status", true);
			response.put("message", "Book is added");
		} else {
			response.put("status", false);
			response.put("message", "Book is not added");
		}
		return response;
		
	}

	@PutMapping("/update/{id}")
	public Map<String,Object> updateBook(@PathVariable int id, @RequestBody Book b) {
		Map<String,Object> response = new HashMap<>();
		if(bookService.updateBook(id, b)) {
			response.put("status", true);
			response.put("message", "Book is updated");
		} else {
			response.put("status", false);
			response.put("message", "Book is not updated");
		}
		return response;
	}

	@DeleteMapping("/delete/{id}")
	public Map<String,Object> deleteBook(@PathVariable int id) {
		Map<String,Object> response = new HashMap<>();
		Boolean status = this.relationService.deleteRelationByBookId(id);
		if(!status) {
			response.put("status", false);
			response.put("message", "Relations of book can't deleted");
			return response;
		}
		if(bookService.deleteBook(id)) {
			response.put("status", true);
			response.put("message", "Book is deleted");
		} else {
			response.put("status", false);
			response.put("message", "Book is not deleted");
		}
		return response;
	}

}
