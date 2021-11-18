import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.page.html',
  styleUrls: ['./modal-profile.page.scss'],
})
export class ModalProfilePage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async closeModalProfile() {
    this.modalCtrl.dismiss();
  }

}
