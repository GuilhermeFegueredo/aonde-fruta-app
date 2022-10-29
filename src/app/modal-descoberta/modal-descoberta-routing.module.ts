import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModalDescobertaComponent } from './modal-descoberta.component';

const routes: Routes = [
  {
    path: '',
    component: ModalDescobertaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDescobertaRoutingModule {}
