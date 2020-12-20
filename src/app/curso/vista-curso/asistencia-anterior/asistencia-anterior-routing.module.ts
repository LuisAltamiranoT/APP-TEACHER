import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciaAnteriorPage } from './asistencia-anterior.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciaAnteriorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciaAnteriorPageRoutingModule {}
