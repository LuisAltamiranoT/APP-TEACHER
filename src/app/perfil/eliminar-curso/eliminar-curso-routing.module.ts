import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarCursoPage } from './eliminar-curso.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarCursoPageRoutingModule {}
