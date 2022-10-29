import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Usuario, NovoUsuario } from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private httpClient: HttpClient) {}

  autenticaUsuario(email: string, senha: string) {
    return this.httpClient.get<Usuario>(
      `http://localhost:8080/user/email/${email}/${senha}`

      // `http://ec2-user@ec2-54-232-150-145.sa-east-1.compute.amazonaws.com:8080/user/email/${email}/${senha}`
    );
  }

  salvaUsuario(novoUsuario: NovoUsuario) {
    return this.httpClient.post<Usuario>(
      `http://localhost:8080/user/`,

      // `http://ec2-user@ec2-54-232-150-145.sa-east-1.compute.amazonaws.com:8080/user`,
      novoUsuario
    );
  }
}
