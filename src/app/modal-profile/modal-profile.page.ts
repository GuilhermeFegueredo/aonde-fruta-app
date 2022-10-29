import { ModalProfileService } from './modal-profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs/internal/Observable';
import { Arvore } from '../model/arvore';

import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.page.html',
  styleUrls: ['./modal-profile.page.scss'],
})
export class ModalProfilePage implements OnInit {
  usuario: Usuario;
  arvoresUsuario$: Observable<Arvore[]>;

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private serviceProfile: ModalProfileService
  ) {}

  ngOnInit(): void {
    this.arvoresUsuario$ = this.carregaArvoresUsuario(this.usuario.id);
  }

  voltarLogin() {
    this.closeModalProfile().then(() => this.router.navigate(['']));
  }

  carregaArvoresUsuario(userId: number): Observable<Arvore[]> {
    return this.serviceProfile.procuraArvoresUsuario(userId);
  }

  async closeModalProfile() {
    this.modalCtrl.dismiss();
  }
}
