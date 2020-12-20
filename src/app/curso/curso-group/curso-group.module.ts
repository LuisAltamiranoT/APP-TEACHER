import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

//modal
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

//card material
import { MatCardModule } from '@angular/material/card';

import { IonicModule } from '@ionic/angular';

import { CursoGroupPageRoutingModule } from './curso-group-routing.module';

import { CursoGroupPage } from './curso-group.page';

import { NgFallimgModule } from 'ng-fallimg';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursoGroupPageRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    //card
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    NgFallimgModule
  ],
  declarations: [CursoGroupPage]
})
export class CursoGroupPageModule { }
