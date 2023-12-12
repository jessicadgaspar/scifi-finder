// src/components/Header.jsx
import React from "react";
import {Navbar, Nav, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./header.css";


const Header = () => {
  const categories = [
    "Space Opera",
    "Dystopian",
    "Military",
    "Comedy",
    "Horror",
  ];

  return (
    <>
      <Navbar bg="light" data-bs-theme="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Sci-Fi Finds
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {categories.map((category) => (
                <Nav.Link
                  as={Link}
                  to={`/?category=${encodeURIComponent(category)}`}
                  key={category}
                >
                  {category}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Hero Section */}
      <div className="heroSection">
        <h1 className="text-center">Find Your Next Sci-Fi Book</h1>
      </div>
    </>
  );
};

export default Header;
