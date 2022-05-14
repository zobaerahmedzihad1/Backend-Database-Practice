import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Navbar bg="light" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link className="p-2" to='/'>Home</Link>
            <Link className="p-2" to='/adduser'>Add user</Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
