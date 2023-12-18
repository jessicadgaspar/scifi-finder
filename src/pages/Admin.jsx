import React, {useEffect, useState} from "react";
import {Container, Form, Button, Table} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {getBooks, addBook, deleteBook} from "../services/api";

const Admin = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    releaseDate: "",
    description: "",
    image: "",
    link: "",
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);


  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const fetchedBooks = await getBooks();
    setBooks(fetchedBooks);
  };

  const handleAddBook = async (event) => {
    event.preventDefault();
    await addBook(newBook);
    fetchBooks();
    setNewBook({
      title: "",
      author: "",
      category: "",
      releaseDate: "",
      description: "",
      image: "",
      link: "",
    });
  };

  const handleDeleteBook = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <Container>
      <h1>Página de Administração</h1>

      {/* Formulário para adicionar um novo livro */}
      <Form onSubmit={handleAddBook}>
        {/* Campos do formulário para newBook */}
        <Button as={Link} to="/add-book">
          Adicionar Novo Livro
        </Button>
      </Form>

      {/* Lista de livros existentes com opções para editar/excluir */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Categoria</th>
            <th>Data de Lançamento</th>
            <th>Descrição</th>
            <th>Link</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>
                <img
                  src={book.image}
                  alt={`Capa do livro ${book.title}`}
                  style={{width: "100px", height: "auto"}}
                />
              </td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.releaseDate}</td>
              <td>{truncateDescription(book.description, 100)}</td>{" "}
              {/* Encurtar a descrição a 100 caracteres */}
              <td>
                <a href={book.link} target="_blank" rel="noopener noreferrer">
                  Comprar
                </a>
              </td>
              <td>
                <Link
                  to={`/edit-book/${book.id}`}
                  className="btn btn-secondary"
                >
                  Editar
                </Link>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={handleLogout} variant="danger" className="mb-3">
        Logout
      </Button>
    </Container>
  );
};

export default Admin;
