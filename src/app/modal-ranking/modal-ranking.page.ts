import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-ranking',
  templateUrl: './modal-ranking.page.html',
  styleUrls: ['./modal-ranking.page.scss'],
})
export class ModalRankingPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async closeModalRanking() {
    this.modalCtrl.dismiss();
  }
}
