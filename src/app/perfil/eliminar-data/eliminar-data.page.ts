//Eliminar una materia
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

import { UploadImageService } from 'src/app/service/subir-foto/upload-image.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-eliminar-data',
  templateUrl: './eliminar-data.page.html',
  styleUrls: ['./eliminar-data.page.scss'],
})

export class EliminarDataPage implements OnInit {

  //validacion del bar
  validate = true;
  //nombre materia
  materia = "";
  //ide de la materia
  idData: any;
  //almacenar las materias 
  materiaSeleccionada: any;
  //formulario
  materiaForm = new FormGroup({
    //materia: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<EliminarDataPage>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService,
    private UploadImageService: UploadImageService
  ) { }

  ngOnInit(): void {
    //this.materiaForm.patchValue({ materia: this.infoUser});
    /*
          nombre: data,
          id: idData,
          array:dataArray,
    */
    this.idData = this.infoUser.id;
    this.materia = this.infoUser.nombre;
    this.materiaSeleccionada = this.infoUser.array;
    console.log(this.idData, this.materia, this.materiaSeleccionada);
  }

  async onClick() {
    try {
      this.validate = false;
      console.log(this.materiaSeleccionada.cursos.length);
      if (this.materiaSeleccionada.cursos.length != 0) {
        this.materiaSeleccionada.cursos.forEach(element => {
          if (element.image != '') {
            this.UploadImageService.deleteImageCurso(element.image);
          }
          this.authService.deleteNomina(this.idData, element.uidNomina);
          //console.log('se imprime esto'+element.uidNomina);
        });
      }
      let dat = await this.authService.delecteMateria(this.idData);
      if (dat) {
        this.validate = true;
        this.dialogRef.close();
      } else {
        this.validate = true;
      }


    } catch (error) {

    }
  }

  dimissModal() {
    this.dialogRef.close();
  }
}
