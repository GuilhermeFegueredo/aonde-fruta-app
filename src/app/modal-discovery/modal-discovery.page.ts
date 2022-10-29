import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs/internal/Observable';
import { take, first } from 'rxjs/operators';

import { ModalProfileService } from '../modal-profile/modal-profile.service';
import { Arvore } from '../model/arvore';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-modal-discovery',
  templateUrl: './modal-discovery.page.html',
  styleUrls: ['./modal-discovery.page.scss'],
})
export class ModalDiscoveryPage implements OnInit {
  usuario: Usuario;
  arvores$: Observable<Arvore[]>;

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private service: ModalProfileService
  ) {}

  ngOnInit() {
    this.buscaDescobertas(this.usuario.id);
    this.arvores$.subscribe((t) => console.log('Descobertas: ', t));
  }

  buscaDescobertas(id: number) {
    this.arvores$ = this.service.procuraArvoresUsuario(id).pipe(first());
  }

  deleteArvore(id: number) {
    console.log('Deletei a: ', id);
  }

  editarArvore(id: number) {
    console.log('Editei a: ', id);
  }

  async closeModalDiscovery() {
    this.modalCtrl.dismiss();
  }
}
