import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalRankingPage } from './modal-ranking.page';

const routes: Routes = [
  {
    path: '',
    component: ModalRankingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalRankingPageRoutingModule {}
