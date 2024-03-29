import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import * as Leaflet from 'leaflet';

import { MapService } from '../map/map.service';
import { NovaArvore } from '../model/arvore';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-modal-descoberta',
  templateUrl: './modal-descoberta.component.html',
  styleUrls: ['./modal-descoberta.component.scss'],
})
export class ModalDescobertaComponent implements OnInit {
  usuario: Usuario;
  coordenadas: Leaflet.LatLng;

  novaDescobertaForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private service: MapService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.novaDescobertaForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.minLength(4)]],
    });
  }

  cadastrarArvore() {
    if (this.novaDescobertaForm.valid) {
      const formvalue = this.novaDescobertaForm.getRawValue();
      const novaArvore: NovaArvore = {
        name: formvalue.nome,
        idUsuario: this.usuario.id,
        latitude: this.coordenadas.lat,
        longitude: this.coordenadas.lng,
        description: formvalue.description,
        userCreator: this.usuario.userName,
      };
      this.salvaArvore(novaArvore);
    }
  }

  salvaArvore(newTree: NovaArvore) {
    this.service.salvaArvore(newTree).subscribe(
      () => this.presentToast('Árvore cadastrada com sucesso!'),
      (error) => {
        this.presentToast('Desculpe. Tente novamente!');
        console.log(error);
      },
      () => {
        this.closeModalProfile(newTree);
      }
    );
  }

  async presentToast(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  closeModalProfile(newTree: NovaArvore) {
    this.modalCtrl.dismiss(newTree, 'confirm');
  }
}
