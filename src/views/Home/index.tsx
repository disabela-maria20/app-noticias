"use client";

import{ useEffect, useState } from 'react';

import { ImageUpload, Menu, TextEditor } from '@/components';
import { Noticia } from '@/interfaces';
import { Button, Col, Container, Form, Modal, Table } from 'react-bootstrap';
import { useFormStatus } from 'react-dom';
import { BsFillTrash3Fill, BsFillEyeFill } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import logErro from '@/util/Error';
import { GETListarNoticia, POSTCadastrarNoticia } from '@/util/Request';
import { AxiosError } from 'axios';

const Home = (): React.JSX.Element => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [imageBase64, setImageBase64] = useState<string>('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (newValue: string) => setValue(newValue);
  const handleImageUpload = (base64Data: string) => setImageBase64(base64Data);

  const { pending } = useFormStatus();

  const GETfetchNoticias = async () => {
    try {
      const response = await GETListarNoticia()
      setNoticias(response);
    } catch (error) {
      logErro(error as AxiosError)
    }
  };

  useEffect(() => {
    GETfetchNoticias();
  }, []);

  const PostForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await POSTCadastrarNoticia(formData, value, imageBase64);
      handleClose()
      GETfetchNoticias()
    } catch (error) {
      logErro(error as AxiosError)
    }
  }

  return (
    <>
      <Menu />
      <Container>
        <Button type="button" size="sm" className="me-2 mt-5" onClick={handleShow}>
          Adicionar notícia
        </Button>
        <Table striped bordered hover size="sm" className="mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Autor</th>
              <th>Matéria</th>
              <th>Publicação</th>
              <th></th>
            </tr>
          </thead>
          <tbody style={{ verticalAlign: 'middle' }}>
            {noticias.map((noticia) => (
              <tr key={noticia.id}>
                <td>{noticia.id}</td>
                <td>{noticia.autor}</td>
                <td>{noticia.titulo}</td>
                <td>{new Date(noticia.criado_em).toLocaleDateString()}</td>
                <td className="d-flex justify-content-center g-3">
                  <Button type="button" size="sm" className="me-2" variant="primary">
                    <MdEdit />
                  </Button>
                  <Button type="button" size="sm" className="me-2" variant="outline-primary">
                    <BsFillEyeFill />
                  </Button>
                  <Button type="button" size="sm" variant="outline-danger">
                    <BsFillTrash3Fill />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Adicionar notícia</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={PostForm}>
              <div className="row">
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control type="text" disabled={pending} name="titulo" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Resumo</Form.Label>
                    <Form.Control type="text" disabled={pending} name="resumo" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Autor</Form.Label>
                    <Form.Select name="autor">
                      <option></option>
                      <option value="Ana">Ana</option>
                      <option value="Julia">Julia</option>
                      <option value="Marcos">Marcos</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select name="categoria">
                      <option></option>
                      <option value="Politica">Política</option>
                      <option value="Clima">Clima</option>
                      <option value="Variedades">Variedades</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Select name="status">
                      <option></option>
                      <option value="rascunho">Rascunho</option>
                      <option value="publicado">Publicado</option>
                      <option value="arquivado">Arquivado</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={8}>
                  <Form.Group className="mb-3">
                    <Form.Label>Imagem</Form.Label>
                    <ImageUpload onUpload={handleImageUpload} />
                  </Form.Group>
                </Col>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Conteúdo</Form.Label>
                <TextEditor
                  initialValue={value}
                  onChange={handleChange}
                  placeholder="Write something amazing..."
                />
              </Form.Group>
              <div className="mt-3">
                <Button variant="secondary" className="me-2" onClick={handleClose} disabled={pending}>
                  Fechar
                </Button>
                <Button type="submit" variant="primary" disabled={pending}>
                  Salvar
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default Home;
