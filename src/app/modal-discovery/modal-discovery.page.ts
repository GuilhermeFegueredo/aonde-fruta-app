import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-discovery',
  templateUrl: './modal-discovery.page.html',
  styleUrls: ['./modal-discovery.page.scss'],
})
export class ModalDiscoveryPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  // lista de descobertas temporárias;
  discoveries: any = [
    {
      title: 'Manga',
      latitude: '-23.323855',
      longitude: '-51.124953',
      icon: '/assets/fruit_icons/mango_fruit_food_icon_148898_48.png'
    },
    {
      title: 'Limão',
      latitude: '-23.323624',
      longitude: '-51.123855',
      icon: '/assets/fruit_icons/lemon_fruit_food_icon_48.png'
    },
    {
      title: 'Laranja',
      latitude: '-23.324028',
      longitude: '-51.122413',
      icon: '/assets/fruit_icons/orange_fruit_food_icon_48.png'
    },
    {
      title: 'Banana',
      latitude: '-23.325791',
      longitude: '-51.121465',
      icon: '/assets/fruit_icons/banana_fruit_food_icon_48.png'
    },
    {
      title: 'Abacate',
      latitude: '-23.325013',
      longitude: '-51.118927',
      icon: '/assets/fruit_icons/Avocado_icon-icons.com_68792_48.png'
    }
  ];

  // lista com as tags html;    
  listDiscoveries: any = [];

  ngOnInit() {
    // this.addListDiscoveries(this.discoveries);
  }

  async closeModalDiscovery() {
    this.modalCtrl.dismiss();
  }


  // dar um get no usuário.informação_de_descorbertas para mostrar na tela
  // criar html do modal para receber as informações e montar a "tabela de descobertas"
}
