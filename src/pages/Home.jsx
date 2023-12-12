// src/pages/Home.jsx
import React, {useEffect, useState} from "react";
import {Container, Row, Col} from "react-bootstrap";
import {Link, useSearchParams} from "react-router-dom";
import {getBooks} from "../services/api";
import "./home.css";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let fetchedBooks = await getBooks();
        const categoryFilter = searchParams.get("category");

        if (categoryFilter) {
          fetchedBooks = fetchedBooks.filter(
            (book) => book.category === decodeURIComponent(categoryFilter)
          );
        }

        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Erro ao carregar livros", error);
      }
    };

    fetchBooks();
  }, [searchParams]); // Adicionado searchParams como dependência

  return (
    <Container className="books-wrapper">
      <Row>
        {books.length > 0 ? (
          books.map((book) => (
            <Col xs={12} md={6} lg={3} key={book.id}>
              <div className="book-item">
                 <Link to={`/book/${book.id}`}>
                  <img
                    src={book.image}
                    alt={`Capa do livro ${book.title}`}
                    className="img-fluid book-img"
                  />
                </Link> 
                <h4>{book.title}</h4>
                <p>
                  {book.author}
                </p>
              </div>
            </Col>
          ))
        ) : (
          // Loader
          <div class="spinne-border" role="status">
            <span class="visually-hidden"></span>
          </div>
        )}
      </Row>
      {/* Link para a página Admin */}
      <div className="mt-4">
        <Link to="/admin" className="btn btn-primary">
          Admin
        </Link>
      </div>
    </Container>
  );
};

export default Home;
