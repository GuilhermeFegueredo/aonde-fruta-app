import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import {
  Control,
  control,
  Icon,
  latLng,
  LatLng,
  Layer,
  LayerGroup,
  map,
  Map,
  Marker,
  marker,
  Popup,
  popup,
  tileLayer,
} from 'leaflet';
import { from, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { ModalDescobertaComponent } from '../modal-descoberta/modal-descoberta.component';
import { ModalDiscoveryPage } from '../modal-discovery/modal-discovery.page';
import { ModalProfilePage } from '../modal-profile/modal-profile.page';
import { ModalRankingPage } from '../modal-ranking/modal-ranking.page';
import { Arvore } from '../model/arvore';
import { Usuario } from '../model/usuario';
import { NovaArvore } from './../model/arvore';
import { MapService } from './map.service';

import 'leaflet-routing-machine';
import { BinaryOperator, preserveWhitespacesDefault } from '@angular/compiler';
import { element } from 'protractor';

import { LoadingController } from '@ionic/angular';

declare var L: any;

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
  markerSelected: LatLng;
  routingControl = null;
  routing = false;
  markerUser: any;
  circleMarker: any;
  buttonCancelVisible = false;
  searchTerm: string;
  searchTrees = new Array();
  hasSearchTrees = false;
  layerMap: Layer;
  gpsUserCoord: any;

  constructor(
    private modalCtrl: ModalController,
    private geolocation: Geolocation,
    private router: Router,
    private service: MapService,
    private loadingCtrl: LoadingController
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
    this.buttonHide();
  }

  ionViewDidEnter() {
    this.leafletMap();
  }

  async leafletMap() {
    this.gpsUserCoord = await this.getUserPosition();
    // const gpsUser = await this.getUserPosition();
    this.map = new Map('map', {
      zoomControl: false,
      minZoom: 10,
      maxZoom: 18,
    }).setView([this.gpsUserCoord.lat, this.gpsUserCoord.lng], 18);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    this.map.on('contextmenu', (e: { latlng: LatLng }) => {
      this.showModalDescoberta(e.latlng);
    });

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);

    this.setUserMarker(this.gpsUserCoord.lat, this.gpsUserCoord.lng);

    // this.markerUser = marker([gpsUser.lat, gpsUser.lng], {
    //   icon: this.userIcon,
    // })
    //   .addTo(this.map)
    //   .bindPopup(
    //     `
    //   <div style="
    //   display: flex;
    //   flex-direction: column;
    //   align-items: center
    //   ">
    //     <ion-icon size="large" style="color: cadetblue;" name="person"></ion-icon>
    //     <strong>${this.usuario.userName}</strong>
    //   </div>
    //   `,
    //     {
    //       closeButton: false,
    //       autoClose: true,
    //     }
    //   )
    //   .openPopup();

    this.tracking();
    this.carregaArvores();
    const layerMarkers = this.map.eachLayer((layer) =>
      console.log(layer.getPane('markerPane'))
    );
    // this.layerMap = this.map.eachLayer(
    //   (layer) =>
    //     layer.getAttribution() ===
    //     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // );
    // console.log('layerMarkers', layerMarkers);
  }

  setUserMarker(lat: number, long: number): void {
    this.markerUser = marker([lat, long], {
      icon: this.userIcon,
    })
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
          autoClose: true,
        }
      )
      .openPopup();
  }

  setArvoresOnMap() {
    this.arvores$.subscribe(
      (arvores) => {
        arvores.map((arvore) => {
          this.setSearchTrees(arvore);
          this.criarMarcadorArvore(arvore);
        });
      },
      (error) => {
        alert('Erro ao carregar os marcadores das árvores.');
        console.log('Error ao carregar árvores: ', error);
      }
    );
  }

  carregarArvoresNoMapa(): void {
    this.arvores$.subscribe((arvores) => {
      arvores.forEach((arvore) => this.criarMarcadorArvore(arvore));
    });
  }

  criarMarcadorArvore(arvore: Arvore): void {
    const latLngArvore = new LatLng(arvore.latitude, arvore.longitude);
    const marcador = new Marker(latLngArvore, { icon: this.treeIcon })
      .bindPopup(this.popupArvore(arvore), {
        closeButton: false,
        autoClose: true,
      })
      .addEventListener('click', () => {
        this.map.setView([arvore.latitude, arvore.longitude]);
      })
      .addEventListener('popupopen', () => {
        document
          .getElementById('button-navigate')
          .addEventListener('click', () => {
            if (this.routing !== true) {
              this.markerSelected = new LatLng(
                arvore.latitude,
                arvore.longitude
              );
            }
          });
      });
    this.map.addLayer(marcador);
  }

  setSearchTrees(arvore: Arvore | NovaArvore) {
    const posicaoUsuario = new LatLng(
      this.gpsUserCoord.lat,
      this.gpsUserCoord.lng
    );
    const posicaoArvore = new LatLng(arvore.latitude, arvore.longitude);
    this.searchTrees.push({
      arvore,
      distanceToUser: posicaoArvore.distanceTo(posicaoUsuario).toFixed(0),
    });
    this.searchTrees.sort((a, b) => a.distanceToUser - b.distanceToUser);
  }

  // Método para criar a árvore e contorna o erro que não capturar a latitude e longitude
  setNewArvoreOnMap(arvoreCriada: NovaArvore): void {
    try {
      this.setSearchTrees(arvoreCriada);
      marker([arvoreCriada.latitude, arvoreCriada.longitude], {
        icon: this.treeIcon,
      })
        .bindPopup(this.popupArvore(arvoreCriada), {
          closeButton: false,
          autoClose: true,
        })
        .addEventListener('popupopen', () => {
          document
            .getElementById('button-navigate')
            .addEventListener('click', () => {
              if (this.routing !== true) {
                this.markerSelected = new LatLng(
                  arvoreCriada.latitude,
                  arvoreCriada.longitude
                );
              }
            });
        })
        .addEventListener('click', () => {
          this.map.setView([arvoreCriada.latitude, arvoreCriada.longitude]);
        })
        .addTo(this.map);
    } catch (error) {
      alert('Erro ao carregar o marcador');
    }
  }

  // faz o rastreamento do usuário
  tracking() {
    this.map
      .locate({
        watch: true,
      })
      .on('locationfound', (e) => {
        console.log(e);
        if (e.latlng != this.markerUser.latlng) {
          this.markerUser.setLatLng(e.latlng);
          if (this.routing != false) {
            this.routingControl
              .getPlan()
              .setWaypoints([e.latlng, this.markerSelected]);
            if (this.map.distance(this.markerSelected, e.latlng) < 40) {
              this.hasArrived();
            }
          }
        }
      });
  }

  hasArrived() {
    alert('Você chegou em seu destino ! ! !');
    this.cancelNavigate();
  }

  // Método para navegação
  // É realizado um 'stopLocate' para que seja calculada a rota certa, e depois retorna o tracking
  async navigate() {
    let spinner = document.getElementById('spinner');
    spinner.style.display = 'block';

    let markerNavigate = null;
    try {
      this.map.stopLocate();
      let gpsUser = await this.getUserPosition();

      console.log(
        '[externo] removeu a anterior ' + (this.routingControl != null)
      );
      console.log(
        '[externo] Não existe outra rota ' + (this.routingControl == null)
      );

      if (this.routing != false) {
        console.log(
          '[interno] removeu a anterior ' + (this.routingControl != null)
        );
        this.removeRoutingControl();
      }

      if (this.routing == false) {
        console.log(
          '[interno] Não existe outra rota ' + (this.routingControl == null)
        );
        console.log('Marcador selecionado ' + this.markerSelected);

        markerNavigate = this.markerSelected;

        this.routingControl = await L.Routing.control({
          show: false,
          addWaypoints: false,
          draggableWaypoints: false,
          fitSelectedRoutes: false,
          routeWhileDragging: false,
          plan: L.Routing.plan(
            [
              L.latLng(gpsUser.lat, gpsUser.lng),
              L.latLng(markerNavigate.lat, markerNavigate.lng),
            ],
            {
              createMarker: function () {
                return null;
              },
            }
          ),
          lineOptions: {
            styles: [
              {
                color: '#D93654',
                opacity: 1,
                weight: 7,
              },
            ],
          },
        }).addTo(this.map);

        // retira o display de passos do Leaflet
        this.routingControl._container.style.display = 'none';
        //controlador para verificar se rota esta ativa
        this.routing = true;
        // bloquear o botão de navegação após clicar em ir
        this.buttonHide();
      }
      spinner.style.display = 'none';
      this.tracking();
    } catch (error) {
      spinner.style.display = 'none';
      if (this.markerSelected == null) {
        alert('Selecione uma árvore');
        console.log('Árvore não selecionada: ', error);
      } else {
        alert('Erro ao calcular a rota');
        console.log('Error ao calcular a rota: ', error);
      }
    }
  }

  removeRoutingControl = function () {
    if (this.routing != false) {
      this.map.removeControl(this.routingControl);
      this.routingControl = null;
    }
  };

  cancelNavigate() {
    this.routingControl.getPlan().setWaypoints([]);
    this.markerSelected = null;
    this.routing = false;
    // liberar o botão de navegação após cancelar
    this.buttonHide();
  }

  centralize() {
    this.map.setView(this.markerUser._latlng);
  }

  itemView(item: Arvore) {
    this.map.setView([item.latitude, item.longitude]);
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
      // O Leaflet não deixa criar marker sem icon, para não ter sobreposição de imagem defini a opacidade para '0' ao criar
      .setOpacity(0)
      .addTo(this.map)
      .bindPopup(this.popupArvore(arvoreCriada), {
        closeButton: false,
        zoomAnimation: false,
      });

    this.setNewArvoreOnMap(arvoreCriada);
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
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      // this.searchTrees.splice(0);
      this.map.eachLayer((layer) => {
        if (layer.getPane() === layer.getPane('markerPane')) {
          this.map.removeLayer(layer);
          this.setUserMarker(this.gpsUserCoord.lat, this.gpsUserCoord.lng);
          this.carregarArvoresNoMapa();
        }
      });
    }
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

  buttonHide() {
    let buttonNavigate = document.getElementById('button-navigate');
    let buttonCancel = document.getElementById('button-cancel');
    if (this.buttonCancelVisible == true) {
      this.buttonCancelVisible = false;
      buttonNavigate.hidden = true;
      buttonCancel.hidden = false;
    } else {
      this.buttonCancelVisible = true;
      buttonNavigate.hidden = false;
      buttonCancel.hidden = true;
    }
  }
}

// <ion-icon name="navigate-circle-sharp">

// Usar marker cluster = https://github.com/Leaflet/Leaflet.markercluster
