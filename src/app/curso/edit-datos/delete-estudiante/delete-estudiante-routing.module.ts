import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteEstudiantePage } from './delete-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteEstudiantePageRoutingModule {}
