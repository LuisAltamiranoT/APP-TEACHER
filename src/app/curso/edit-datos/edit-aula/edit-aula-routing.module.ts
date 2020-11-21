import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAulaPage } from './edit-aula.page';

const routes: Routes = [
  {
    path: '',
    component: EditAulaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAulaPageRoutingModule {}
