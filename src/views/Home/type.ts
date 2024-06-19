import { Noticia } from "@/interfaces";

export interface State {
  noticias: Noticia[];
  value: string;
  imageBase64: string;
  loading: boolean;
  activeModal: ModalType | null;
}

export const initialState: State = {
  noticias: [],
  value: "",
  imageBase64: "",
  loading: false,
  activeModal: null, 
};

export type Action =
  | { type: "SET_NOTICIAS"; payload: Noticia[] }
  | { type: "SHOW_MODAL"; payload: ModalType }
  | { type: "HIDE_MODAL" }
  | { type: "SET_VALUE"; payload: string }
  | { type: "SET_IMAGE"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };

export type ModalType = "cadastrar" | "visualizar" | "excluir";
