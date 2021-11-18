import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalDiscoveryPage } from '../modal-discovery/modal-discovery.page';
import { ModalProfilePage } from '../modal-profile/modal-profile.page';
import { ModalRankingPage } from '../modal-ranking/modal-ranking.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicNativePlugin } from '@ionic-native/core';

declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {

  map: any;
  infoWindow = google.maps.InfoWindow;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  infoWindows: any = [];
  markers: any = [
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

  constructor(
    private modalCtrl: ModalController,
    private geolocation: Geolocation
  ) { }

  ionViewDidEnter() {
    this.showMap();
  }

  addMarkersToMap(markers) {
    for (let i = 0; i < markers.length; i++) {
      const marker = markers[i];
      let positionMkr = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: positionMkr,
        map: this.map,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude,
        icon: marker.icon,
        animation: google.maps.Animation.DROP
      });
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content">' +
      '<h2 id="firstHeading" class="firstHeading">' + marker.title + '</h2>' +
      '<p>Lat: ' + marker.latitude + '</p>' +
      '<p>Long: ' + marker.longitude + '</p>' +
      '<ion-button id="navigate"><ion-icon id="navigate" name="navigate-outline"></ion-icon></ion-button>'
      '</div>';
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    this.infoWindows.push(infoWindow);

    marker.addListener('click', () => {
      this.closeAllInfoWindow();
      infoWindow.open(this.map, marker);
    });

  }

  closeAllInfoWindow() {
    for (const window of this.infoWindows) {
      window.close();
    }
  }

  async getUserPosition() {
    try {
      const position = await this.geolocation.getCurrentPosition()
      const myPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      return myPosition;
    }
    catch (e){
      console.log('Error getting location', e);
    }    
  }

  addUserMarker(lat: number, lng: number){
    const userMarker = new google.maps.Marker({
      position: {lat, lng},
      map: this.map,
      title: 'userName...',
      icon: '/assets/avatar/avatar_man_people_person_profile_user_icon_48.png'
    });
  }

  async showMap() {
    const userLocation = await this.getUserPosition();
    const options = {
      center: userLocation,
      zoom: 15,
      minZoom: 10,
      desableDefaultUI: false,
      //gestureHandling: 'cooperative',
      // zoomControl: false, 
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers);
    this.addUserMarker(userLocation.lat,userLocation.lng);
  }

  async showModalProfile() {
    const modal = await this.modalCtrl.create({
      component: ModalProfilePage,
      cssClass: 'modal-custom-css'
    });
    return await modal.present();
  }

  async showModalDiscovery() {
    const modal = await this.modalCtrl.create({
      component: ModalDiscoveryPage,
      cssClass: 'modal-custom-css'
    });
    return await modal.present();
  }

  async showModalRanking() {
    const modal = await this.modalCtrl.create({
      component: ModalRankingPage,
      cssClass: 'modal-custom-css'
    });
    return await modal.present();
  }

  // reduzir o código de showModalEspecifico para showModal
}
