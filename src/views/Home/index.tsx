"use client";

import { useReducer } from 'react';

import { ImageUpload, Menu, TextEditor } from '@/components';
import { Button, Col, Container, Form, Modal, Table } from 'react-bootstrap';
import { BsFillTrash3Fill, BsFillEyeFill } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { GETListarNoticia, POSTCadastrarNoticia } from '@/util/Request';
import { Action, ModalType, State, initialState } from './type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLogErro } from '@/util';
import { AxiosError } from 'axios';

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_NOTICIAS':
      return { ...state, noticias: action.payload };
    case 'SHOW_MODAL':
      return { ...state, activeModal: action.payload };
    case 'HIDE_MODAL':
      return { ...state, activeModal: null };
    case 'SET_VALUE':
      return { ...state, value: action.payload };
    case 'SET_IMAGE':
      return { ...state, imageBase64: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const Home = (): React.JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const GETNoticias = useQuery({ queryKey: ['todos'], queryFn: GETListarNoticia });

  const { LogErro } = useLogErro();

  const handleShow = (modalType: ModalType) => dispatch({ type: 'SHOW_MODAL', payload: modalType });
  const handleClose = () => dispatch({ type: 'HIDE_MODAL' });

  const POSTSalvarNoticias = useMutation({
    mutationFn: async (formData: FormData) => await POSTCadastrarNoticia(formData, state.value, state.imageBase64),
    onSuccess: () => GETNoticias.refetch(),
    onError: (error: AxiosError) => LogErro(error).data,
  });

  return (
    <>
      <Menu />
      <Container>
        <Button type="button" size="sm" className="me-2 mt-5" onClick={() => handleShow('cadastrar')}>
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
            {GETNoticias.isLoading && 'Carregando'}
            {GETNoticias.data && GETNoticias.data.map((noticia) => (
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
        <Modal show={state.activeModal === 'cadastrar'} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Adicionar notícia</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(event) => {
              event.preventDefault()
              POSTSalvarNoticias.mutate(new FormData(event.currentTarget))
            }}>
              <div className="row">
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control type="text" name="titulo" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Resumo</Form.Label>
                    <Form.Control type="text" name="resumo" />
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
                    <ImageUpload onUpload={(base64) => dispatch({ type: 'SET_IMAGE', payload: base64 })} />
                  </Form.Group>
                </Col>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Conteúdo</Form.Label>
                <TextEditor
                  initialValue={state.value}
                  onChange={(newValue) => dispatch({ type: 'SET_VALUE', payload: newValue })}
                  placeholder="Write something amazing..."
                />
              </Form.Group>
              <div className="mt-3">
                <Button variant="secondary" className="me-2" onClick={() => dispatch({ type: 'HIDE_MODAL' })} >
                  Fechar
                </Button>
                <Button type="submit" variant="primary">
                  salvar
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
