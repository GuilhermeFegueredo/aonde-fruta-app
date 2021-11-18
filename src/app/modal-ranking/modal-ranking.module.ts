import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalRankingPageRoutingModule } from './modal-ranking-routing.module';

import { ModalRankingPage } from './modal-ranking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalRankingPageRoutingModule
  ],
  declarations: [ModalRankingPage]
})
export class ModalRankingPageModule {}
