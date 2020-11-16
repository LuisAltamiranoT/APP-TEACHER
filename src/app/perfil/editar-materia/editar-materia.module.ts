import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarMateriaPageRoutingModule } from './editar-materia-routing.module';

import { EditarMateriaPage } from './editar-materia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarMateriaPageRoutingModule
  ],
  declarations: [EditarMateriaPage]
})
export class EditarMateriaPageModule {}
