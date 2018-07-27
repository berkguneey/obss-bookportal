
const api = "http://localhost:8080/api/authors"

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

export const getAllAuthor = () =>
  fetch(`${api}`, { headers })
    .then(res => res.json())

export const getAuthor = (author_id) =>
  fetch(`${api}/${author_id}`, { headers })
    .then(res => res.json())

export const addAuthor = (author) =>
  fetch(`${api}/add`, {
    method: "POST",
    headers:headers,
    body: JSON.stringify(author),
  }).then(res => res.json())

export const deleteAuthor = (author_id) =>
  fetch(`${api}/delete/${author_id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    mode:'cors' 
  }).then(res => res.json())

  export const updateAuthor = (author_id, author) =>
  fetch(`${api}/update/${author_id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(author)
  }).then(res => res.json())
  
