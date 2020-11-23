import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteIndividualPage } from './reporte-individual.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteIndividualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteIndividualPageRoutingModule {}
