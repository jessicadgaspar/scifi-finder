// src/pages/EditBook.jsx
import React, {useState, useEffect} from "react";
import {Container, Form, Button} from "react-bootstrap";
import {useParams, useNavigate} from "react-router-dom";
import {getBook, updateBook} from "../services/api";

const EditBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    releaseDate: "",
    description: "",
    image: "",
    link: "",
  });
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      const fetchedBook = await getBook(id);
      setBook(fetchedBook);
    };
    fetchBook();
  }, [id]);

  const handleUpdateBook = async (event) => {
    event.preventDefault();
    await updateBook(id, book);
    navigate("/admin");
  };

  if (!book) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <h1>Editar Livro</h1>
      <Form onSubmit={handleUpdateBook}>
        {/* Título */}
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            value={book.title}
            onChange={(e) => setBook({...book, title: e.target.value})}
          />
        </Form.Group>

        {/* Autor */}
        <Form.Group className="mb-3">
          <Form.Label>Autor</Form.Label>
          <Form.Control
            type="text"
            value={book.author}
            onChange={(e) => setBook({...book, author: e.target.value})}
          />
        </Form.Group>

        {/* Categoria */}
        <Form.Group className="mb-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            type="text"
            value={book.category}
            onChange={(e) => setBook({...book, category: e.target.value})}
          />
        </Form.Group>

        {/* Data de Lançamento */}
        <Form.Group className="mb-3">
          <Form.Label>Data de Lançamento</Form.Label>
          <Form.Control
            type="date"
            value={book.releaseDate}
            onChange={(e) => setBook({...book, releaseDate: e.target.value})}
          />
        </Form.Group>

        {/* Descrição */}
        <Form.Group className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={book.description}
            onChange={(e) => setBook({...book, description: e.target.value})}
          />
        </Form.Group>

        {/* Imagem */}
        <Form.Group className="mb-3">
          <Form.Label>Imagem (URL)</Form.Label>
          <Form.Control
            type="text"
            value={book.image}
            onChange={(e) => setBook({...book, image: e.target.value})}
          />
        </Form.Group>

        {/* Link */}
        <Form.Group className="mb-3">
          <Form.Label>Link (URL)</Form.Label>
          <Form.Control
            type="text"
            value={book.link}
            onChange={(e) => setBook({...book, link: e.target.value})}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Atualizar Livro
        </Button>
      </Form>
    </Container>
  );
};

export default EditBook;
