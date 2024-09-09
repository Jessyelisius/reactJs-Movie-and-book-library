import axios from 'axios';

const BASE_URL = 'https://openlibrary.org';

export const searchBooks = (query) => axios.get(`${BASE_URL}/search.json?q=${query}`);
export const getBookDetails = (id) => axios.get(`${BASE_URL}/works/${id}.json`);
export const getAuthorBooks = (authorId) => axios.get(`${BASE_URL}/author=${authorId}&sort=new&fields=key,title,first_publish_year,cover_i&limit=20`);
//url:`https://openlibrary.org/search.json?author=${authorId}&sort=new&fields=key,title,first_publish_year,cover_i&limit=20`

