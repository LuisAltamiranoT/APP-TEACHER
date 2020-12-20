import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAttentionPage } from './modal-attention.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAttentionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAttentionPageRoutingModule {}
