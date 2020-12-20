import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaCursoPage } from './vista-curso.page';
import { CanDeactivateGuard } from 'src/app/service/guard/can-deactivate.guard';


const routes: Routes = [
  {
    path: '',
    component: VistaCursoPage,
    canDeactivate:[CanDeactivateGuard]
  },
  {
    path: 'ver-image-curso',
    loadChildren: () => import('./ver-image-curso/ver-image-curso.module').then( m => m.VerImageCursoPageModule)
  },
  {
    path: 'notificacion-salir',
    loadChildren: () => import('./notificacion-salir/notificacion-salir.module').then( m => m.NotificacionSalirPageModule)
  },
  {
    path: 'asistencia-anterior',
    loadChildren: () => import('./asistencia-anterior/asistencia-anterior.module').then( m => m.AsistenciaAnteriorPageModule)
  },
  {
    path: 'modal-attention',
    loadChildren: () => import('./modal-attention/modal-attention.module').then( m => m.ModalAttentionPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaCursoPageRoutingModule {}
