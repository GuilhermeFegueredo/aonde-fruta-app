import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Arvore, NovaArvore } from '../model/arvore';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private httpClient: HttpClient) {}

  carregaArvores() {
    return this.httpClient.get<Arvore[]>(
      'https://aondefruta-core.herokuapp.com/tree'
    );
  }

  salvaArvore(novaArvore: NovaArvore) {
    return this.httpClient.post<NovaArvore>(
      'https://aondefruta-core.herokuapp.com/tree',
      novaArvore
    );
  }
}
