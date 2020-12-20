import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

//select
import {MatSelectModule} from '@angular/material/select';

import { IonicModule } from '@ionic/angular';

import { AsistenciaAnteriorPageRoutingModule } from './asistencia-anterior-routing.module';

import { AsistenciaAnteriorPage } from './asistencia-anterior.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaAnteriorPageRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule
  ],
  declarations: [AsistenciaAnteriorPage]
})
export class AsistenciaAnteriorPageModule {}
