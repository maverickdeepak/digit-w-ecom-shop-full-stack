import React from "react";
import { useSelector } from "react-redux";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaBagShopping, FaUser } from "react-icons/fa6";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const { cart_items } = useSelector((state) => state.cart);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Digital W.</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaBagShopping /> Cart{" "}
                  <Badge bg="light" text="dark">
                    {cart_items.reduce((acc, item) => acc + item.quantity, 0)}
                  </Badge>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
