// src/services/api.js
import axios from "axios";

const BASE_URL =
  "https://api.sheety.co/939544d94d5e653be460acce3a87550a/scifiBooksDatabase";
const API_URL = `${BASE_URL}/books`;


const getBooks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/books`);
    const data = await response.json();
    return data.books;
  } catch (error) {
    console.error("Erro ao buscar books:", error);
  }
};

// GET - Pegar um único book
const getBook = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.book; 
  } catch (error) {
    console.error("Erro ao buscar o book", error);
    throw error;
  }
};

// POST - Adicionar um novo book
const addBook = async (bookData) => {
  try {
    const response = await axios.post(API_URL, { book: bookData });
    return response.data.book;
  } catch (error) {
    console.error("Erro ao adicionar book", error);
    throw error;
  }
};


// PUT - Atualizar um book
const updateBook = async (id, bookData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { book: bookData });
    return response.data.book;
  } catch (error) {
    console.error("Erro ao atualizar book", error);
    throw error;
  }
};

// DELETE - Deletar um book
const deleteBook = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erro ao deletar book", error);
    throw error;
  }
};

// GET - Pegar todas as críticas
const getReviews = async () => {
  try {
    const response = await fetch(`${BASE_URL}/reviews`);
    const data = await response.json();
    return data.reviews;
  } catch (error) {
    console.error('Erro ao buscar críticas:', error);
  }
};

// POST - Adicionar uma nova crítica
const addReview = async (reviewData) => {
  try {
    const response = await fetch(`${BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ review: reviewData })
    });
    const data = await response.json();
    return data.review;
  } catch (error) {
    console.error('Erro ao adicionar crítica:', error);
  }
};




export {getBooks, addBook, updateBook, deleteBook, getBook, getReviews, addReview };
