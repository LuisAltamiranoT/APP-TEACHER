import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-editar-anio',
  templateUrl: './editar-anio.page.html',
  styleUrls: ['./editar-anio.page.scss'],
})
export class EditarAnioPage implements OnInit {

  validate = true;

  anioForm = new FormGroup({
    inicio: new FormControl('', Validators.required),
    fin: new FormControl('', Validators.required)
  })

  constructor(
    public dialogRef: MatDialogRef<EditarAnioPage>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  onClick() {
    try {
      this.validate = false;
      const { inicio } = this.anioForm.value;
      const { fin } = this.anioForm.value;
      if (Date.parse(inicio) < Date.parse(fin)) {
        this.authService.updateAnioLectivo(inicio, fin);
        
        setTimeout(() => {
          this.dialogRef.close();
          this.validate = true;
          this.authService.showUpdatedata();
        }, 2000);
      }
      else {
        this.authService.showInfo('La fecha de inicio debe ser menor a la fecha de fin');
        this.validate = true;
      }
    } catch (error) {
      this.authService.showError(error);
    }
  }

  dimissModalInfo() {
    this.dialogRef.close();
  }

  eraser() {
    this.anioForm.patchValue({ info: "" });
  }

}
