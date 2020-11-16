import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire'
import { ReactiveFormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment'; 

import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { GuardGuard } from 'src/app/service/guard/guard.guard'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    GuardGuard,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
