import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';
import { MapPage } from './map.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [Geolocation],
  declarations: [MapPage],
})
export class MapPageModule {}
