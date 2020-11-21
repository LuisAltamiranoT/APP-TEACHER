import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEstudiantePage } from './add-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: AddEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEstudiantePageRoutingModule {}
