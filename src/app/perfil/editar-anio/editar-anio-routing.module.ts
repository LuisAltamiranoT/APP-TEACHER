import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarAnioPage } from './editar-anio.page';

const routes: Routes = [
  {
    path: '',
    component: EditarAnioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarAnioPageRoutingModule {}
