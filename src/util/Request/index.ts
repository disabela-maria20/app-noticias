import { Noticia } from "@/interfaces";
import axios from "axios";

export const POSTCadastrarNoticia = async (formData: FormData, value: string, imageBase64: string) => {
  await axios.post('http://localhost:3333/noticia/salvar', {
    titulo: formData.get('titulo'),
    conteudo: value,
    resumo: formData.get('resumo'),
    autor: formData.get('autor'),
    categoria: formData.get('categoria'),
    status: formData.get('status'),
    imagem_capa: imageBase64
  });
};

export const GETListarNoticia = async () => {
  const res = await axios.get<Noticia[]>('http://localhost:3333/noticias');
  return res.data
};