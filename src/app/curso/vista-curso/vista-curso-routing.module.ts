import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaCursoPage } from './vista-curso.page';

const routes: Routes = [
  {
    path: '',
    component: VistaCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaCursoPageRoutingModule {}
