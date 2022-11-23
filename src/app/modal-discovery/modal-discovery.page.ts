import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs/internal/Observable';
import { delay, first } from 'rxjs/operators';

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
  apagou = false;

  constructor(
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private router: Router,
    private service: ModalProfileService
  ) {}

  ngOnInit() {
    this.buscaDescobertas(this.usuario.id);
  }

  buscaDescobertas(id: number) {
    this.arvores$ = this.service.procuraArvoresUsuario(id).pipe(first());
  }

  apagarArvore(id: number) {
    this.service.deletaArvore(id).subscribe({
      next: () => null,
      error: (erro) => console.log('Erro ao apagar árvore: ', erro),
      complete: () => {
        setTimeout(() => this.buscaDescobertas(this.usuario.id), 1500);
        this.presentToast();
        this.apagou = true;
      },
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Arvore apagada com sucesso!',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  deletouArvore() {
    return this.modalCtrl.dismiss(this.apagou, 'confirm');
  }

  async closeModalDiscovery() {
    if(this.apagou) {
      this.deletouArvore();
    } else {
      this.modalCtrl.dismiss();
    }
  }
}
