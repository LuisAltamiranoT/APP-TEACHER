import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCursoPage } from './edit-curso.page';

const routes: Routes = [
  {
    path: '',
    component: EditCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCursoPageRoutingModule {}
