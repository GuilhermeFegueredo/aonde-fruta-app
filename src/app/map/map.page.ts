import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { Icon, LatLng, Map, marker, Popup, popup, tileLayer } from 'leaflet';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { ModalDescobertaComponent } from '../modal-descoberta/modal-descoberta.component';
import { ModalDiscoveryPage } from '../modal-discovery/modal-discovery.page';
import { ModalProfilePage } from '../modal-profile/modal-profile.page';
import { ModalRankingPage } from '../modal-ranking/modal-ranking.page';
import { Arvore } from '../model/arvore';
import { Usuario } from '../model/usuario';
import { NovaArvore } from './../model/arvore';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  usuario: Usuario;
  arvores$: Observable<Arvore[]>;
  map: Map;
  userIcon: any;
  treeIcon: any;
  treePopup = new Popup();

  constructor(
    private modalCtrl: ModalController,
    private geolocation: Geolocation,
    private router: Router,
    private service: MapService
  ) {
    this.userIcon = new Icon({
      iconUrl: 'https://img.icons8.com/dusk/80/000000/region-code.png',
      iconSize: [40, 45],
      iconAnchor: [20, 44],
      popupAnchor: [0, -45],
    });
    this.treeIcon = new Icon({
      iconUrl: 'https://img.icons8.com/office/80/000000/deciduous-tree.png',
      iconSize: [40, 45],
      iconAnchor: [20, 44],
      popupAnchor: [0, -45],
    });
  }

  ngOnInit(): void {
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
  }

  ionViewDidEnter() {
    this.leafletMap();
  }

  async leafletMap() {
    const gpsUser = await this.getUserPosition();
    this.map = new Map('map').setView([gpsUser.lat, gpsUser.lng], 17);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 14,
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    this.map.on('contextmenu', (e: { latlng: LatLng }) => {
      this.showModalDescoberta(e.latlng);
    });

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);

    marker([gpsUser.lat, gpsUser.lng], { icon: this.userIcon })
      .addTo(this.map)
      .bindPopup(
        `
      <div style="
      display: flex;
      flex-direction: column;
      align-items: center
      ">
        <ion-icon size="large" style="color: cadetblue;" name="person"></ion-icon>
        <strong>${this.usuario.userName}</strong>
      </div>
      `,
        {
          closeButton: false,
        }
      )
      .openPopup();

    this.carregaArvores();

    // antPath(
    //   [
    //     [28.6448, 77.216721],
    //     [34.1526, 77.5771],
    //   ],
    //   { color: '#FF0000', weight: 5, opacity: 0.6 }
    // ).addTo(this.map);
  }

  setArvoresOnMap() {
    this.arvores$.pipe(first()).subscribe(
      (arvores) => {
        arvores.map((arvore) => {
          marker([arvore.latitude, arvore.longitude], {
            icon: this.treeIcon,
          })
            .addTo(this.map)
            .bindPopup(this.popupArvore(arvore), {
              closeButton: false,
            });
        });
      },
      (error) => {
        alert('Erro ao carregar os marcadores das árvores.');
        console.log('Error ao carregar árvores: ', error);
      }
    );
  }

  podeApagarArvore(arvore: Arvore): boolean {
    return this.usuario.id === arvore.idUsuario ? true : false;
  }

  async getUserPosition() {
    try {
      const position = await this.geolocation.getCurrentPosition();
      const myPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      return myPosition;
    } catch (e) {
      alert('Erro ao pegar a sua localização');
    }
  }

  carregaArvores() {
    this.arvores$ = this.service.carregaArvores().pipe(first());
    this.setArvoresOnMap();
  }

  criaArvoreMarker(arvoreCriada: NovaArvore) {
    marker([arvoreCriada.latitude, arvoreCriada.longitude], {
      icon: this.treeIcon,
    })
      .addTo(this.map)
      .bindPopup(this.popupArvore(arvoreCriada), {
        closeButton: false,
        zoomAnimation: false,
      });
  }

  async showModalDescoberta(latlng: LatLng) {
    const modal = await this.modalCtrl.create({
      component: ModalDescobertaComponent,
      cssClass: 'modal-custom-css',
      componentProps: {
        usuario: this.usuario,
        coordenadas: latlng,
      },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.criaArvoreMarker(data);
    }
  }

  async showModalProfile() {
    const modal = await this.modalCtrl.create({
      component: ModalProfilePage,
      cssClass: 'modal-custom-css',
      componentProps: {
        usuario: this.usuario,
      },
    });
    return await modal.present();
  }

  async showModalDiscovery() {
    const modal = await this.modalCtrl.create({
      component: ModalDiscoveryPage,
      cssClass: 'modal-custom-css',
      componentProps: {
        usuario: this.usuario,
      },
    });
    return await modal.present();
  }

  async showModalRanking() {
    const modal = await this.modalCtrl.create({
      component: ModalRankingPage,
      cssClass: 'modal-custom-css',
    });
    return await modal.present();
  }

  irAteGps() {
    console.log('ir até acionado');
  }

  popupArvore(arvoreCriada: NovaArvore): Popup {
    return popup().setContent(
      `
      <div class="popup-description"
      style=" display: flex;
      flex-direction: column;
      align-items: center;">
        <div id="nome-gps" style=" display: flex;
        flex-direction: row;
        align-items: center;">
          <h2><strong>${arvoreCriada.name}</strong></h2>
          <div id="gps" style="
          color: blueviolet;
          font-size: 30px;
          align-self: end;
          margin-left: 10px;
          ">
          </div>
        </div>
        <span>Descoberto por: <strong>${arvoreCriada.userCreator}</strong></span>
          <div *ngIf="arvore.description" style="margin-top: 8px;">
            <span>
              ${arvoreCriada.description}
            </span>
          </div>
      </div>
  `
    );
  }
}

// <ion-icon name="navigate-circle-sharp">

// Usar marker cluster = https://github.com/Leaflet/Leaflet.markercluster
