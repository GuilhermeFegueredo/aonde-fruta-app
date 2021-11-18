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

  users: any = [
    {
      name: 'Paulo Felipe',
      trees: '10',
      photo: '/assets/ranking/Paulo.jpg'
    },
    {
      name: 'Giselle Gomes',
      trees: '7',
      photo: '/assets/ranking/Giselle.jpeg'
    },
    {
      name: 'Mariana Kastelic',
      trees: '5',
      photo: '/assets/ranking/Mari.png'
    },
    {
      name: 'Guilherme',
      trees: '3',
      photo: '/assets/ranking/Guilherme.jpeg'
    }
];


  ngOnInit() {
  }

  async closeModalRanking() {
    this.modalCtrl.dismiss();
  }
}
