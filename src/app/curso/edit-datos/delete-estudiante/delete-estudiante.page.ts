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

  async onClick() {
    try {
      this.validate = false;
      const dat = await this.authService.delecteEstudiante(this.infoUser.idCurso, this.infoUser.idEstudiante);
      if (dat != 0) {
        this.authService.showSuccess('El registro ha sido eliminado');
        this.dialogRef.close();
      } else {
        this.validate = true;
      }
    } catch (error) {
      this.authService.showError(error);
    }
  }

  dimissModal() {
    this.dialogRef.close();
  }

}
