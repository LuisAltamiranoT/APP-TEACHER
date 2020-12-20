import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerImagePage } from './ver-image.page';

const routes: Routes = [
  {
    path: '',
    component: VerImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerImagePageRoutingModule {}
