import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalProfilePage } from './modal-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ModalProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalProfilePageRoutingModule {}
