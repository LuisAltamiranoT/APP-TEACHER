import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarDataPage } from './eliminar-data.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarDataPageRoutingModule {}
