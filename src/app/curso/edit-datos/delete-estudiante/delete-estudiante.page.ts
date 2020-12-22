import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthService } from 'src/app/service/auth/auth.service'

@Component({
  selector: 'app-delete-estudiante',
  templateUrl: './delete-estudiante.page.html',
  styleUrls: ['./delete-estudiante.page.scss'],
})

export class DeleteEstudiantePage implements OnInit {

  placeholder = ""
  validate = true;
  
  constructor(
    public dialogRef: MatDialogRef<DeleteEstudiantePage>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.placeholder = this.infoUser.nombre;
  }

  
  onClick() {
    try {
      this.validate = false;
      this.authService.deleteEstudiante(this.infoUser.idMateria, this.infoUser.idNomina,this.infoUser.array);
      setTimeout(() => {
        this.dialogRef.close();
        this.validate = true;
        this.authService.showUpdatedata();

      }, 2000);

    } catch (error) {
      this.authService.showError(error);
    }
  }

  dimissModal() {
    this.dialogRef.close();
  }
}
