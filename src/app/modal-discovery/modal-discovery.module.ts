import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ModalDiscoveryPageRoutingModule } from './modal-discovery-routing.module';
import { ModalDiscoveryPage } from './modal-discovery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDiscoveryPageRoutingModule,
  ],
  declarations: [ModalDiscoveryPage],
})
export class ModalDiscoveryPageModule {}
