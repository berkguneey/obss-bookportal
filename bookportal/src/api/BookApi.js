
const api = "http://localhost:8080/api/books"

// Generate a unique token for storing your bookshelf data on the backend server.
/*
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)
*/
const headers = {
  'Accept': 'application/json',
  "Content-Type": "application/json;charset=UTF-8"
}

export const getAllBook = () =>
  fetch(`${api}`, { headers })
    .then(res => res.json())

export const addBook = (book) =>
    fetch(`${api}/add`, {
      method: "POST",
      headers:headers,
      body: JSON.stringify(book),
    }).then(res => res.json())

export const deleteBook = (bookId) =>
  fetch(`${api}/delete/${bookId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    mode:'cors' 
  }).then(res => res.json())

export const getBook = (bookId) =>
  fetch(`${api}/${bookId}`, { headers })
    .then(res => res.json())

export const updateBook = (book_id, book) =>
  fetch(`${api}/update/${book_id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(book)
  }).then(res => res.json())



export const search = (query, maxResults) =>
  fetch(`${api}/search/${query}`, {
    method: 'GET',
    headers:headers
  }).then(res => res.json())