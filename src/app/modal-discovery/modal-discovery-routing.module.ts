import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDiscoveryPage } from './modal-discovery.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDiscoveryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDiscoveryPageRoutingModule {}
