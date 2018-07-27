
const api = "http://localhost:8080/api/relations"

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

export const getAllRelation = () =>
  fetch(`${api}`, { headers })
    .then(res => res.json())



export const getRelation = (bookId) =>
  fetch(`${api}/${bookId}`, { headers })
    .then(res => res.json())


export const addRelationToFavourite = (book_id) =>
    fetch(`${api}/addToFavorite/book/${book_id}`, {
      method: "GET",
      headers:headers
    }).then(res => res.json())

export const addRelationToWishList = (book_id) =>
    fetch(`${api}/addToList/book/${book_id}`, {
      method: "GET",
      headers:headers
    }).then(res => res.json())


