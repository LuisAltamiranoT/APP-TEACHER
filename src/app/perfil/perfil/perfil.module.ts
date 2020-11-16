import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';
import { PerfilPage } from './perfil.page';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from 'src/app/service/auth.service';
import { GuardGuard } from 'src/app/service/guard/guard.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  declarations: [PerfilPage],
  providers: [
    AuthService,
    GuardGuard,
  ],
})
export class PerfilPageModule { }
