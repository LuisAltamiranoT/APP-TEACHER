import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacionSalirPage } from './notificacion-salir.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacionSalirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacionSalirPageRoutingModule {}
