import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarAnioPageRoutingModule } from './editar-anio-routing.module';

import { EditarAnioPage } from './editar-anio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarAnioPageRoutingModule
  ],
  declarations: [EditarAnioPage]
})
export class EditarAnioPageModule {}
