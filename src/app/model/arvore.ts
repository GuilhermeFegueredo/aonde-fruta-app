export interface Arvore {
  id: number;
  name: string;
  idUsuario: number;
  latitude: number;
  longitude: number;
  description: string;
  userCreator: string;
}

export interface NovaArvore {
  name: string;
  idUsuario: number;
  latitude: number;
  longitude: number;
  description?: string;
  userCreator: string;
}
