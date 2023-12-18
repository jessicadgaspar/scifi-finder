import axios from "axios";

const BASE_URL =
  "https://api.sheety.co/939544d94d5e653be460acce3a87550a/scifiBooksDatabase";
const API_URL = `${BASE_URL}/books`;

// GET - Obter todos os livros
const getBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    return response.data.books;
  } catch (error) {
    console.error('Erro ao obter livros:', error);
  }
};


// GET - Obter um livro 
const getBook = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.book; 
  } catch (error) {
    console.error("Erro a obter o book", error);
    throw error;
  }
};

// POST - Adicionar um novo livro
const addBook = async (bookData) => {
  try {
    const response = await axios.post(API_URL, { book: bookData });
    return response.data.book;
  } catch (error) {
    console.error("Erro ao adicionar book", error);
    throw error;
  }
};


// PUT - Atualizar um livro
const updateBook = async (id, bookData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { book: bookData });
    return response.data.book;
  } catch (error) {
    console.error("Erro ao atualizar book", error);
    throw error;
  }
};

// DELETE - Apagar um livro
const deleteBook = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erro ao deletar book", error);
    throw error;
  }
};

// GET - Obter todas as críticas
const getReviews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reviews`);
    return response.data.reviews;
  } catch (error) {
    console.error('Erro ao buscar críticas:', error);
  }
};


// POST - Adicionar uma nova crítica
const addReview = async (reviewData) => {
  try {
    const response = await axios.post(`${BASE_URL}/reviews`, {
      review: reviewData,
    });
    return response.data.review;
  } catch (error) {
    console.error("Erro ao adicionar crítica:", error);
  }
};





export {getBooks, addBook, updateBook, deleteBook, getBook, getReviews, addReview };
