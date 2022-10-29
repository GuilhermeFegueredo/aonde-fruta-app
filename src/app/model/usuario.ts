import { Arvore } from './arvore';

export interface Usuario {
  id: number;
  name: string;
  email: string;
  userName: string;
  password: string;
  trees?: Arvore[];
}

export interface NovoUsuario {
  name: string;
  email: string;
  userName: string;
  password: string;
}
