import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validacionPass: boolean = false;
  mensaje_nombre = '';
  mensaje_apellido = '';

  registerForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2), this.match_nombre()]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(2), this.match_apellido()]),
    email: new FormControl('', [Validators.required, Validators.email, this.matchEmail()]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    _password: new FormControl('', [Validators.required, Validators.minLength(6), this.match('password')]),
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

  async onRegister() {
    try {
      const { email, password, nombre, apellido } = this.registerForm.value;
      const user = await this.authService.register(email, password, nombre, apellido);
      if (user) {
        this.modalController.dismiss();
        this.router.navigate(['/send-email-component']);
      }
    } catch (error) {
      this.authService.showError(error);
    }
  }

  match(controlKey: string) {
    return (control: AbstractControl): { [s: string]: boolean } => {
      // control.parent es el FormGroup
      if (control.parent) { // en las primeras llamadas control.parent es undefined
        const checkValue = control.parent.controls[controlKey].value;
        if (control.value !== checkValue) {
          //console.log('no son iguales');
          this.validacionPass = false;
          return {
            match: true
          };
        }
      }
      //console.log('iguales');
      this.validacionPass = true;
      return null;
    };
  }

  matchEmail() {
    return (control: AbstractControl): { [s: string]: boolean } => {
      // control.parent es el FormGroup
      if (control.parent) { // en las primeras llamadas control.parent es undefined
        let dominio = control.value.split("@", 2);
        //console.log(dominio[1],dominio.length);
        if (dominio[1] !== 'epn.edu.ec') {
          //console.log(control.value,'no pertenece al dominio');
          //this.validacionEmail=false;
          return {
            match: true
          };
        }
      }
      //console.log('iguales');
      //this.validacionEmail=true;
      return null;
    };
  }

  //validar dos nombres
  match_nombre() {
    return (control: AbstractControl): { [s: string]: boolean } => {
      if (control.parent) {
        let data = control.value.split(' ');
        let long = data.length;
        //console.log(data);
        //console.log(long)
        if (long > 2) {
          this.mensaje_nombre = 'Solo puede ingresar dos nombres';
          return {
            match: true
          };
        } else if (data[0] === "") {
          this.mensaje_nombre = 'No use espacios al inicio del primer nombre';
          return {
            match: true
          };
        } else if (data[1] === "" || data[1] === undefined) {
          this.mensaje_nombre = 'Debe ingresar dos nombres';
          return {
            match: true
          };
        }
      }
      this.mensaje_nombre = '';
      return null;
    };
  }

  //validar dos nombres
  match_apellido() {
    return (control: AbstractControl): { [s: string]: boolean } => {
      if (control.parent) {
        let data = control.value.split(' ');
        let long = data.length;
        //console.log(data);
        //console.log(long)
        if (long > 2) {
          this.mensaje_apellido = 'Solo puede ingresar dos apellidos';
          return {
            match: true
          };
        } else if (data[0] === "") {
          this.mensaje_apellido = 'No use espacios al inicio del primer apellido';
          return {
            match: true
          };
        } else if (data[1] === "" || data[1] === undefined) {
          this.mensaje_apellido = 'Debe ingresar dos apellidos';
          return {
            match: true
          };
        }
      }
      this.mensaje_apellido = '';
      return null;
    };
  }


  IngresarSoloLetras(e) {
    let key = e.keyCode || e.which;
    let tecla = String.fromCharCode(key).toString();
    //Se define todo el abecedario que se va a usar.
    let letras = " áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    //Es la validación del KeyCodes, que teclas recibe el campo de texto.
    let especiales = [8, 37, 39, 46, 6, 13];
    let tecla_especial = false
    for (var i in especiales) {
      if (key == especiales[i]) {
        tecla_especial = true;
        break;
      }
    }
    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
      this.authService.showInfo('No se admite el ingreso de números');
      return false;
    }
  }

}
