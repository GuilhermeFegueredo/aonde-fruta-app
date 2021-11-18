import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalProfilePageRoutingModule } from './modal-profile-routing.module';

import { ModalProfilePage } from './modal-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalProfilePageRoutingModule
  ],
  declarations: [ModalProfilePage]
})
export class ModalProfilePageModule {}
