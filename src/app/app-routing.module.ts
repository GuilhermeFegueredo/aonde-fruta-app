import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sing-up.module').then( m => m.SingUpPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'modal-profile',
    loadChildren: () => import('./modal-profile/modal-profile.module').then( m => m.ModalProfilePageModule)
  },
  {
    path: 'modal-discovery',
    loadChildren: () => import('./modal-discovery/modal-discovery.module').then( m => m.ModalDiscoveryPageModule)
  },
  {
    path: 'modal-ranking',
    loadChildren: () => import('./modal-ranking/modal-ranking.module').then( m => m.ModalRankingPageModule)
  },
  {
    path: 'modal-nova-descoberta',
    loadChildren: () => import('./modal-descoberta/modal-descoberta.module').then( m => m.ModalDescobertaModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
