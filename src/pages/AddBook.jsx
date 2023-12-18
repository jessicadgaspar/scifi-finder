import React, {useState} from "react";
import {Container, Form, Button} from "react-bootstrap";
import {addBook} from "../services/api";
import {useNavigate} from "react-router-dom";

const AddBook = () => {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    releaseDate: "",
    description: "",
    image: "",
    link: "",
  });
  const navigate = useNavigate();

  const handleAddBook = async (event) => {
    event.preventDefault();
    await addBook(newBook);
    navigate("/admin");
  };

  return (
    <Container>
      <h1>Adicionar Novo Livro</h1>
      <Form onSubmit={handleAddBook}>
        {/* Título */}
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Título"
            value={newBook.title}
            onChange={(e) => setNewBook({...newBook, title: e.target.value})}
          />
        </Form.Group>

        {/* Autor */}
        <Form.Group className="mb-3">
          <Form.Label>Autor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome do autor"
            value={newBook.author}
            onChange={(e) => setNewBook({...newBook, author: e.target.value})}
          />
        </Form.Group>

        {/* Categoria */}
        <Form.Group className="mb-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            type="text"
            placeholder="Categoria do livro"
            value={newBook.category}
            onChange={(e) => setNewBook({...newBook, category: e.target.value})}
          />
        </Form.Group>

        {/* Data de Lançamento */}
        <Form.Group className="mb-3">
          <Form.Label>Data de Lançamento</Form.Label>
          <Form.Control
            type="date"
            value={newBook.releaseDate}
            onChange={(e) =>
              setNewBook({...newBook, releaseDate: e.target.value})
            }
          />
        </Form.Group>

        {/* Descrição */}
        <Form.Group className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Descrição do livro"
            value={newBook.description}
            onChange={(e) =>
              setNewBook({...newBook, description: e.target.value})
            }
          />
        </Form.Group>

        {/* Imagem */}
        <Form.Group className="mb-3">
          <Form.Label>Imagem (URL)</Form.Label>
          <Form.Control
            type="text"
            placeholder="URL da imagem da capa"
            value={newBook.image}
            onChange={(e) => setNewBook({...newBook, image: e.target.value})}
          />
        </Form.Group>

        {/* Link */}
        <Form.Group className="mb-3">
          <Form.Label>Link (URL)</Form.Label>
          <Form.Control
            type="text"
            placeholder="URL para mais informações"
            value={newBook.link}
            onChange={(e) => setNewBook({...newBook, link: e.target.value})}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Adicionar Livro
        </Button>
      </Form>
    </Container>
  );
};

export default AddBook;
