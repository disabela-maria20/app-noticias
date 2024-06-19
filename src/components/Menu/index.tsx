import { Container, Nav, Navbar } from 'react-bootstrap';

const Menu = () => {
  return (
    <Navbar expand="lg"  className="bg-black text-light">
      <Container>
        <Navbar.Brand href="#home" className="text-light">NÓTICIAS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto text-light">
            <Nav.Link href="#home" className="text-light">Home</Nav.Link>
            <Nav.Link href="#link" className="text-light">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu