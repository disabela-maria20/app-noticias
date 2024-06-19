import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';

const Menu = () => {
  return (
    <Navbar expand="lg" className="bg-body-secondary">
    <Container>
      <Navbar.Brand href="#">Noticia</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          
        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-dark">Pesquisar</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default Menu