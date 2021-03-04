import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})

export class ForgotPasswordPage implements OnInit {

  validate = true;
  cont = 0;

  Form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, this.matchEmail()])
  })


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async onReset() {
    this.cont=0;
    try {
      this.validate = false;
      const { email } = this.Form.value;
      const verify = await this.authService.resetPassword(email);
      if (this.cont === 0) {
        this.cont = this.cont + 1;
        if (verify === "auth/user-not-found") {
          this.authService.showError('El correo ingresado no se encuentra registrado');
        }else if(verify === "auth/too-many-requests"){
          this.authService.showError('Ha excedido el número de envio de solicitudes, intente más tarde');
        }else {
          this.authService.showInfo('Solicitud enviada con éxito');
          this.router.navigate(['/home']);
        }
      }
      this.validate = true;
    } catch (error) {
    }
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
