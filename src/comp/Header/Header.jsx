import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import appViewModel from '../../services/appViewModel.meta';

function Header() {

  const { logo, title } = appViewModel.app.header;

  return (
    <>
      <Navbar bg="light" expand="sm" fixed="top">
        <Container>
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <img src={logo} width="50" height="50" alt="BSL" />
            <div>
              <div className="brand-large">{title.split(' ')[0]}</div>
              <div className="brand-small">{title.split(' ')[1]} {title.split(' ')[2]}</div>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Item>
                <LinkContainer to="/">
                  <Nav.Link className="nav-button">Home</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to="/teams">
                  <Nav.Link className="nav-button">Teams</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                  <LinkContainer to="/players">
                      <Nav.Link className="nav-button">Players</Nav.Link>

                  </LinkContainer>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
