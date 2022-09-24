import { Evento } from "./Evento";
import { RedeSocial } from "./RedeSocial";

export interface Palestrante {
  id: number;
  nome: string;
  miniCurri: string;
  telefone: string;
  email: string;
  imagemURL: string;
  redesSociais: RedeSocial[];
  palestrantesEventos: Evento[];
}
