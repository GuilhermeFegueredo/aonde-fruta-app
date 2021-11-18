import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingUpPage } from './sing-up.page';

const routes: Routes = [
  {
    path: '',
    component: SingUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingUpPageRoutingModule {}
