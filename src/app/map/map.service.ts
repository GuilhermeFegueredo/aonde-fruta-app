import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Arvore, NovaArvore } from '../model/arvore';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private httpClient: HttpClient) {}

  carregaArvores() {
    return this.httpClient.get<Arvore[]>('http://localhost:8080/tree');
  }

  salvaArvore(novaArvore: NovaArvore) {
    return this.httpClient.post<NovaArvore>(
      'http://localhost:8080/tree',
      novaArvore
    );
  }
}
