import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarMateriaPage } from './editar-materia.page';

const routes: Routes = [
  {
    path: '',
    component: EditarMateriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarMateriaPageRoutingModule {}
