import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

//modal
import { MatButtonModule } from '@angular/material/button';

import { IonicModule } from '@ionic/angular';

import { EliminarDataPageRoutingModule } from './eliminar-data-routing.module';

import { EliminarDataPage } from './eliminar-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarDataPageRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [EliminarDataPage]
})
export class EliminarDataPageModule { }
