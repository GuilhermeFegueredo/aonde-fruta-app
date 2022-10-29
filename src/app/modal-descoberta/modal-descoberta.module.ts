import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ModalDescobertaRoutingModule } from './modal-descoberta-routing.module';
import { ModalDescobertaComponent } from './modal-descoberta.component';

@NgModule({
  declarations: [ModalDescobertaComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDescobertaRoutingModule,
    ReactiveFormsModule,
  ],
})
export class ModalDescobertaModule {}
