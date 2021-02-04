import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardGuard } from 'src/app/service/guard/guard.guard';

import { LoginGuard } from './service/guard/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate:[LoginGuard]
  },
  {
    path: 'nombre',
    loadChildren: () => import('./perfil/nombre/nombre.module').then(m => m.NombrePageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'apellido',
    loadChildren: () => import('./perfil/apellido/apellido.module').then(m => m.ApellidoPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'delete',
    loadChildren: () => import('./perfil/delete/delete.module').then(m => m.DeletePageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'editar-anio',
    loadChildren: () => import('./perfil/editar-anio/editar-anio.module').then(m => m.EditarAnioPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'editar-materia',
    loadChildren: () => import('./perfil/editar-materia/editar-materia.module').then(m => m.EditarMateriaPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'eliminar-data',
    loadChildren: () => import('./perfil/eliminar-data/eliminar-data.module').then(m => m.EliminarDataPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'foto',
    loadChildren: () => import('./perfil/foto/foto.module').then(m => m.FotoPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'info',
    loadChildren: () => import('./perfil/info/info.module').then(m => m.InfoPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'materia',
    loadChildren: () => import('./perfil/materia/materia.module').then(m => m.MateriaPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'oficiana',
    loadChildren: () => import('./perfil/oficina/oficina.module').then(m => m.OficinaPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'password',
    loadChildren: () => import('./perfil/password/password.module').then(m => m.PasswordPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil/perfil.module').then(m => m.PerfilPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'curso',
    loadChildren: () => import('./curso/add-curso/add-curso.module').then(m => m.AddCursoPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'vista-curso/:data',
    loadChildren: () => import('./curso/vista-curso/vista-curso.module').then(m => m.VistaCursoPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'edit-curso/:data',
    loadChildren: () => import('./curso/edit-datos/edit-curso/edit-curso.module').then(m => m.EditCursoPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'add-estudiante',
    loadChildren: () => import('./curso/edit-datos/add-estudiante/add-estudiante.module').then(m => m.AddEstudiantePageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'delete-estudiante',
    loadChildren: () => import('./curso/edit-datos/delete-estudiante/delete-estudiante.module').then(m => m.DeleteEstudiantePageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'edit-aula',
    loadChildren: () => import('./curso/edit-datos/edit-aula/edit-aula.module').then(m => m.EditAulaPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'edit-estudiante',
    loadChildren: () => import('./curso/edit-datos/edit-estudiante/edit-estudiante.module').then(m => m.EditEstudiantePageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'edit-horario',
    loadChildren: () => import('./curso/edit-datos/edit-horario/edit-horario.module').then(m => m.EditHorarioPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'edit-image',
    loadChildren: () => import('./curso/edit-datos/edit-image/edit-image.module').then(m => m.EditImagePageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'curso-group',
    loadChildren: () => import('./curso/curso-group/curso-group.module').then(m => m.CursoGroupPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'view-image',
    loadChildren: () => import('./curso/view-image/view-image.module').then(m => m.ViewImagePageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'codigo/:data/:nombre',
    loadChildren: () => import('./curso/codigo-qr/codigo-qr.module').then(m => m.CodigoQrPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'horario',
    loadChildren: () => import('./horario/horario.module').then(m => m.HorarioPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'send-email',
    loadChildren: () => import('./send-email/send-email.module').then(m => m.SendEmailPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'navbar',
    loadChildren: () => import('./navbar/navbar.module').then( m => m.NavbarPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'footer',
    loadChildren: () => import('./footer/footer.module').then( m => m.FooterPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'reportes/:data/:nombre',
    loadChildren: () => import('./reporteria/reportes/reportes.module').then( m => m.ReportesPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'reporte-individual',
    loadChildren: () => import('./reporteria/reporte-individual/reporte-individual.module').then( m => m.ReporteIndividualPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: 'eliminar-curso',
    loadChildren: () => import('./perfil/eliminar-curso/eliminar-curso.module').then( m => m.EliminarCursoPageModule),
    canActivate:[GuardGuard]
  },
  {
    path: '**',
    redirectTo: 'perfil',
    pathMatch: 'full'
  },
  {
    path: 'ver-image',
    loadChildren: () => import('./reporteria/ver-image/ver-image.module').then( m => m.VerImagePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
