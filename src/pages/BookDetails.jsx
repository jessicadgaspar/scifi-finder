import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Container, Row, Col, Form, Button, Spinner} from "react-bootstrap";
import {getBook, getReviews, addReview} from "../services/api";

const BookDetails = () => {
  const {id: bookId} = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    review: "",
    bookId: bookId,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookDetails = await getBook(bookId);
        setBook(bookDetails);

        const allReviews = await getReviews();
        const filteredReviews = allReviews.filter(
          (review) => review.bookId === bookId
        );
        setReviews(filteredReviews);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };

    fetchData();
  }, [bookId]);

  const handleInputChange = (event) => {
    setNewReview({...newReview, [event.target.name]: event.target.value});
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    try {
      const addedReview = await addReview(newReview);
      setReviews([...reviews, addedReview]);
      setNewReview({name: "", review: "", bookId});
    } catch (error) {
      console.error("Erro ao adicionar crítica:", error);
    }
  };

  if (!book) {
    return (
      <Spinner className="spinner" animation="border" role="status">
        <span className="visually-hidden"></span>
      </Spinner>
    );
  }

  return (
    <Container>
      <Row className="mt-4">
        <Col md={4}>
          <img
            src={book.image}
            alt={`Capa do livro ${book.title}`}
            className="img-fluid"
          />
        </Col>
        <Col md={8}>
          <h2>{book.title}</h2>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Release Date:</strong> {book.releaseDate}
          </p>
          <p>
            <strong>Description:</strong> {book.description}
          </p>
          <a href={book.link} target="_blank" rel="noopener noreferrer">
            Buy
          </a>
        </Col>
      </Row>


      <Row className="mt-4">
        <Col>
          <h3>Write Review</h3>
          <Form onSubmit={handleReviewSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newReview.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                name="review"
                value={newReview.review}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button type="submit">Send Review</Button>
          </Form>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h3>Reviews</h3>
          {reviews.map((review, index) => (
            <div key={index}>
              <h5>{review.name}</h5>
              <p>{review.review}</p>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetails;
