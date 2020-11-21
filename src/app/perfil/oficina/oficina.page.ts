import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';

import { AuthService } from 'src/app/service/auth/auth.service';
import { InfoPage } from 'src/app/perfil/info/info.page';


@Component({
  selector: 'app-oficina',
  templateUrl: './oficina.page.html',
  styleUrls: ['./oficina.page.scss'],
})
export class OficinaPage implements OnInit {

  validate = true;

  placeholder = "Dinos donde localizarte";
  mensaje = "";

  oficinaForm = new FormGroup({
    office: new FormControl('', this.match())
  })


  constructor(
    public dialogRef: MatDialogRef<InfoPage>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.oficinaForm.patchValue({ office: this.infoUser });
    this.placeholder = this.infoUser;
  }

  async onClick() {
    try {
      this.validate = false;
      const { office } = this.oficinaForm.value;
      const dat = await this.authService.updateOficina(office);
      if (dat) {
        this.authService.showUpdatedata();
        this.dialogRef.close();
      }
      if (!dat) {
        this.validate = true;
      }
    } catch (error) {
      this.authService.showError(error);
    }
  }

  eraser() {
    this.oficinaForm.patchValue({ office: "" });
  }

  dimissModal() {
    this.dialogRef.close();
  }

  //validar informacion
  match() {
    return (control: AbstractControl): { [s: string]: boolean } => {
      if (control.parent) {
        let data = control.value;
        //console.log(data);
        //console.log(long)
        if (data === this.placeholder) {
          return {
            match: true
          };
        }
      }
      this.mensaje = '';
      return null;
    };
  }

}
