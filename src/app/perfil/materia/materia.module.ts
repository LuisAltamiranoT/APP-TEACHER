import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

//modal
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { IonicModule } from '@ionic/angular';

import { MateriaPageRoutingModule } from './materia-routing.module';

import { MateriaPage } from './materia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MateriaPageRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [MateriaPage]
})
export class MateriaPageModule { }
