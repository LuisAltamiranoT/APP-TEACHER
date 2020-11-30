import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  validate = true;

  placeholder = "Escribe algo sobre ti";
  mensaje = "";

  infoForm = new FormGroup({
    info: new FormControl('', [this.match()])
  })

  constructor(
    public dialogRef: MatDialogRef<InfoPage>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.infoUser == "") {

    } else {
      this.infoForm.patchValue({ info: this.infoUser });
      this.placeholder = this.infoUser;
    }

  }

  async onClick() {
    try {
      this.validate = false;
      const { info } = this.infoForm.value;
      const dat = await this.authService.updateDescripcion(info);
      if (dat) {
        this.dialogRef.close();
      } else {
        this.validate = true;
      }
    } catch (error) {
      this.authService.showError(error);
    }
  }

  eraser() {
    this.infoForm.patchValue({ info: "" });
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
