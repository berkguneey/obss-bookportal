
const api = "http://localhost:8080/api/users"

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

export const getAllUser = () =>
  fetch(`${api}`, { headers })
    .then(res => res.json())

export const getUser = (user_id) =>
  fetch(`${api}/${user_id}`, { headers })
    .then(res => res.json())

export const addUser = (user) =>
  fetch(`${api}/add`, {
    method: "POST",
    headers:headers,
    body: JSON.stringify(user),
  }).then(res => res.json())

export const deleteUser = (user_id) =>
  fetch(`${api}/delete/${user_id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    mode:'cors' 
  }).then(res => res.json())

  export const updateUser = (user_id, user) =>
  fetch(`${api}/update/${user_id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(res => res.json())

export const search = (query, maxResults) =>
  fetch(`${api}/search/${query}`, {
    method: 'GET',
    headers:headers
  }).then(res => res.json())
  
