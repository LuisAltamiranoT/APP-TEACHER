import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

import { UploadImageService } from 'src/app/service/subir-foto/upload-image.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-eliminar-curso',
  templateUrl: './eliminar-curso.page.html',
  styleUrls: ['./eliminar-curso.page.scss'],
})

export class EliminarCursoPage implements OnInit {

  //validacion del bar
  validate = true;
  //nombre materia
  materia = "";
  //ide de la materia
  idData: any;
  //almacenar las materias 
  materiaSeleccionada: any;
  //imagen
  image: any;
  //nomina
  nomina: any;
  //formulario
  materiaForm = new FormGroup({
    //materia: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<EliminarCursoPage>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService,
    private UploadImageService: UploadImageService
  ) { }

  ngOnInit(): void {
    //this.materiaForm.patchValue({ materia: this.infoUser});
    /*
      nombre:nombre,
      uidNomina: uidNomina,
      image:image,
      idMateria: idMateria,
 array:array el array de la amteria
    */
    this.materia = this.infoUser.nombre;
    this.idData = this.infoUser.idMateria;
    this.image = this.infoUser.image;
    this.nomina = this.infoUser.uidNomina;
    this.materiaSeleccionada = this.infoUser.array;
    console.log('adsasdf', this.materiaSeleccionada, this.infoUser);
  }

  async onClick() {
    try {
      this.validate = false;
      if (this.image != '') {
        this.UploadImageService.deleteImageCurso(this.image);
      }
      this.authService.deleteNomina(this.idData, this.nomina);
      let dat = this.authService.deleteCurso(this.idData, this.materiaSeleccionada);
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
