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
      `https://aondefruta-core.herokuapp.com/tree/lista-arvores/${userId}`
    );
  }
}
