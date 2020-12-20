import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

//modal
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

//card material
import { MatCardModule } from '@angular/material/card';

import { IonicModule } from '@ionic/angular';

import { EditCursoPageRoutingModule } from './edit-curso-routing.module';

import { EditCursoPage } from './edit-curso.page';
import { NgFallimgModule } from 'ng-fallimg';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCursoPageRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    NgFallimgModule
  ],
  declarations: [EditCursoPage]
})
export class EditCursoPageModule {}
