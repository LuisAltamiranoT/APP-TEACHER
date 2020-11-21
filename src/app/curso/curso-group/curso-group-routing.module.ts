import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoGroupPage } from './curso-group.page';

const routes: Routes = [
  {
    path: '',
    component: CursoGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursoGroupPageRoutingModule {}
