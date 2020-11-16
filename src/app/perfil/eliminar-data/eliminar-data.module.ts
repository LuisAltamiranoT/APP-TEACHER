import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarDataPageRoutingModule } from './eliminar-data-routing.module';

import { EliminarDataPage } from './eliminar-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarDataPageRoutingModule
  ],
  declarations: [EliminarDataPage]
})
export class EliminarDataPageModule {}
