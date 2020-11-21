import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditEstudiantePage } from './edit-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: EditEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditEstudiantePageRoutingModule {}
