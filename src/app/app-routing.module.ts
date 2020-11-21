import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardGuard } from 'src/app/service/guard/guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'nombre',
    loadChildren: () => import('./perfil/nombre/nombre.module').then(m => m.NombrePageModule)
  },
  {
    path: 'apellido',
    loadChildren: () => import('./perfil/apellido/apellido.module').then(m => m.ApellidoPageModule)
  },
  {
    path: 'delete',
    loadChildren: () => import('./perfil/delete/delete.module').then(m => m.DeletePageModule)
  },
  {
    path: 'editar-anio',
    loadChildren: () => import('./perfil/editar-anio/editar-anio.module').then(m => m.EditarAnioPageModule)
  },
  {
    path: 'editar-materia',
    loadChildren: () => import('./perfil/editar-materia/editar-materia.module').then(m => m.EditarMateriaPageModule)
  },
  {
    path: 'eliminar-data',
    loadChildren: () => import('./perfil/eliminar-data/eliminar-data.module').then(m => m.EliminarDataPageModule)
  },
  {
    path: 'foto',
    loadChildren: () => import('./perfil/foto/foto.module').then(m => m.FotoPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./perfil/info/info.module').then(m => m.InfoPageModule)
  },
  {
    path: 'materia',
    loadChildren: () => import('./perfil/materia/materia.module').then(m => m.MateriaPageModule)
  },
  {
    path: 'oficiana',
    loadChildren: () => import('./perfil/oficina/oficina.module').then(m => m.OficinaPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./perfil/password/password.module').then(m => m.PasswordPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil/perfil.module').then(m => m.PerfilPageModule),
    canActivate: [GuardGuard]
  },
  {
    path: 'add-curso',
    loadChildren: () => import('./curso/add-curso/add-curso.module').then(m => m.AddCursoPageModule)
  },
  {
    path: 'vista-curso/:data',
    loadChildren: () => import('./curso/vista-curso/vista-curso.module').then(m => m.VistaCursoPageModule)
  },
  {
    path: 'edit-curso/:data',
    loadChildren: () => import('./curso/edit-datos/edit-curso/edit-curso.module').then(m => m.EditCursoPageModule)
  },
  {
    path: 'add-estudiante',
    loadChildren: () => import('./curso/edit-datos/add-estudiante/add-estudiante.module').then(m => m.AddEstudiantePageModule)
  },
  {
    path: 'delete-estudiante',
    loadChildren: () => import('./curso/edit-datos/delete-estudiante/delete-estudiante.module').then(m => m.DeleteEstudiantePageModule)
  },
  {
    path: 'edit-aula',
    loadChildren: () => import('./curso/edit-datos/edit-aula/edit-aula.module').then(m => m.EditAulaPageModule)
  },
  {
    path: 'edit-estudiante',
    loadChildren: () => import('./curso/edit-datos/edit-estudiante/edit-estudiante.module').then(m => m.EditEstudiantePageModule)
  },
  {
    path: 'edit-horario',
    loadChildren: () => import('./curso/edit-datos/edit-horario/edit-horario.module').then(m => m.EditHorarioPageModule)
  },
  {
    path: 'edit-image',
    loadChildren: () => import('./curso/edit-datos/edit-image/edit-image.module').then(m => m.EditImagePageModule)
  },
  {
    path: 'curso-group',
    loadChildren: () => import('./curso/curso-group/curso-group.module').then(m => m.CursoGroupPageModule)
  },
  {
    path: 'view-image',
    loadChildren: () => import('./curso/view-image/view-image.module').then(m => m.ViewImagePageModule)
  },
  {
    path: 'codigo-qr/:data',
    loadChildren: () => import('./curso/codigo-qr/codigo-qr.module').then(m => m.CodigoQrPageModule)
  },
  {
    path: 'horario',
    loadChildren: () => import('./horario/horario.module').then(m => m.HorarioPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'send-email',
    loadChildren: () => import('./send-email/send-email.module').then(m => m.SendEmailPageModule)
  },
  {
    path: 'navbar',
    loadChildren: () => import('./navbar/navbar.module').then( m => m.NavbarPageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./footer/footer.module').then( m => m.FooterPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
