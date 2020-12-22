import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-asistencia-anterior',
  templateUrl: './asistencia-anterior.page.html',
  styleUrls: ['./asistencia-anterior.page.scss'],
})
export class AsistenciaAnteriorPage implements OnInit {

  cursoForm = new FormGroup({
    materiaSelect: new FormControl('', Validators.required)
  })

  historial: any[] = [];
  numeroAlmacenamiento: number = 0;
  seleccionFecha: number = 0;
  fecha: any = '';

  constructor(
    public dialogRef: MatDialogRef<AsistenciaAnteriorPage>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any
  ) { }

  ngOnInit(): void {
    /*
     historial:this.historial,
     numeroAlmacenamiento:this.numeroAlmacenado
     */
    this.numeroAlmacenamiento = this.infoUser.numeroAlmacenamiento;
    this.infoUser.historial.forEach((element, index) => {
      if (index < this.numeroAlmacenamiento) {
        let splitted = element.split("//");
        this.historial.push((index + 1) + '-' + ' ' + splitted[0] + ' ' + splitted[1])
      }
    });
  }

  setIndex(value: any) {
    let splitted = value.split("//");
    //toma el index de la fecha
    this.seleccionFecha = parseInt(splitted[0]);
    //toma el string de la fecha
    this.fecha = splitted[1]
  }

  dimissModal() {
    let data = {
      busqueda: false,
      index: this.seleccionFecha,
      fecha:this.fecha
    }
    this.dialogRef.close(data);
  }


  buscar() {
    let data = {
      busqueda: true,
      index: this.seleccionFecha,
      fecha:this.fecha
    }
    this.dialogRef.close(data);
  }

}
