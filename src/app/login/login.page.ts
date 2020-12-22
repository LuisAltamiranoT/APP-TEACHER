import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validate = true;
  hide = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, this.matchEmail()]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(
    public modalController: ModalController,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async onLogin() {
    try {
      this.validate = false;
      const { email, password } = this.loginForm.value;
      const user = await this.authService.login(email, password);

      if (user) {
        const verifiedEmail = this.authService.isEmailVerified(user);
        if (verifiedEmail) {
          this.validate = true;
          this.dismiss();
          this.router.navigate(['/perfil']);
        } else {
          this.validate = true;
          this.dismiss();
          this.router.navigate(['/send-email']);
        }
      } else {
        this.validate = true;
      }
    } catch (error) {

    }
  }

  openReset() {
    this.dismiss();
    this.router.navigate(['/forgot-password']);
  }

  matchEmail() {
    return (control: AbstractControl): { [s: string]: boolean } => {
      // control.parent es el FormGroup
      if (control.parent) { // en las primeras llamadas control.parent es undefined
        let dominio = control.value.split("@", 2);
        if (dominio[1] !== 'epn.edu.ec') {
          //this.validacionEmail=false;
          return {
            match: true
          };
        }
      }
      //this.validacionEmail=true;
      return null;
    };
  }

}
