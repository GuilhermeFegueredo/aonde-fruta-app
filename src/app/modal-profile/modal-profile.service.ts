import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Arvore } from '../model/arvore';

@Injectable({
  providedIn: 'root',
})
export class ModalProfileService {
  constructor(private httpClient: HttpClient) {}

  procuraArvoresUsuario(userId: number) {
    return this.httpClient.get<Arvore[]>(
      `http://localhost:8080/tree/lista-arvores/${userId}`
    );
  }
}
