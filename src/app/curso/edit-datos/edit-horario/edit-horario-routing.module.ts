import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditHorarioPage } from './edit-horario.page';

const routes: Routes = [
  {
    path: '',
    component: EditHorarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditHorarioPageRoutingModule {}
