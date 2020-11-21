import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

//modal
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

// Código QR
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { IonicModule } from '@ionic/angular';

import { CodigoQrPageRoutingModule } from './codigo-qr-routing.module';

import { CodigoQrPage } from './codigo-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoQrPageRoutingModule,
    NgxQRCodeModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [CodigoQrPage]
})
export class CodigoQrPageModule {}
