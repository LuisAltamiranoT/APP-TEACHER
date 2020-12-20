import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerImageCursoPage } from './ver-image-curso.page';

const routes: Routes = [
  {
    path: '',
    component: VerImageCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerImageCursoPageRoutingModule {}
