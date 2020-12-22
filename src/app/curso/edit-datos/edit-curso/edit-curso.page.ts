import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/service/auth/auth.service';

import { Nomina } from 'src/app/shared/models/user.interface';
import { MatTable, MatTableDataSource } from '@angular/material/table';

//subscripcion a un observable
import { Subscription } from "rxjs";

import { MatDialog } from '@angular/material/dialog';
import { EditEstudiantePage } from 'src/app/curso/edit-datos/edit-estudiante/edit-estudiante.page';
import { DeleteEstudiantePage } from 'src/app/curso/edit-datos/delete-estudiante/delete-estudiante.page';
import { EditAulaPage } from 'src/app/curso/edit-datos/edit-aula/edit-aula.page';
import { EditHorarioPage } from 'src/app/curso/edit-datos/edit-horario/edit-horario.page';
import { EditImagePage } from 'src/app/curso/edit-datos/edit-image/edit-image.page';
import { AddEstudiantePage } from '../add-estudiante/add-estudiante.page';
import { ViewImagePage } from '../../view-image/view-image.page';

@Component({
  selector: 'app-edit-curso',
  templateUrl: './edit-curso.page.html',
  styleUrls: ['./edit-curso.page.scss'],
})
export class EditCursoPage implements OnInit {
  //valida la ceacion de la tabla
  validateSpinner: boolean = false;

  img='../../../../assets//icon/withoutUser.jpg';
  //manejor de tablas 
  @ViewChild(MatTable) tabla1: MatTable<any>;
  //array de la nomina de los estudiantes 
  public nominaVista = [];
  //contiene el nombre de la materia
  public nombreMateria = "";
  //amacena el array de informacion de materia 
  dataMateria;
  //dato que almacenara el id de la materia
  public dataId: any;
  //almacenar nomina del estudiante
  public idIndexCurso: any;

  historial:any[]=[];


  public dataNominaCurso: any;
  //placeholderAula de la aula
  placeholderAula = 'Ejemplo GR1';
  //almacena la imagen del curso
  photoSelected = '../../../assets/icon/clase.jpg';

  idNomina: any;
  idMateria: any;
  idCurso: any;


  private suscripcion1: Subscription;
  private suscripcion2: Subscription;

  editCursoForm = new FormGroup({
    image: new FormControl(''),
  })



  constructor(
    private authService: AuthService,
    public router: Router,
    private _route: ActivatedRoute,
    public ventana: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataId = this._route.snapshot.paramMap.get('data');
    //elementCurso.uidNomina+ '//' + elementMateria.id+'//'+elementCurso.id
    let splitted = this.dataId.split("//");
    this.idNomina = splitted[0];
    this.idMateria = splitted[1];
    this.idCurso = splitted[2];
    this.getMateria(this.idMateria);
    this.getNominaCurso(this.idMateria, this.idNomina);
  }

  ngOnDestroy() {
    this.suscripcion1.unsubscribe();
    this.suscripcion2.unsubscribe();
  }

  //CODIGO NUEVO TABLA
  displayedColumns2: string[] = ['fila', 'codigoUnico', 'image', 'correo', 'nombre', 'opciones'];
  dataSource2: any = [];


  getMateria(idMateria: any) {
    this.suscripcion2 = this.authService.getMateriaId(idMateria).subscribe((data) => {
      //dataMateria variable para actualizacion de datos
      this.dataMateria = [data.payload.data()];
      let cont = -1;
      this.nombreMateria = this.dataMateria[0].nombre;
      this.dataMateria.forEach(elementCursos => {
        elementCursos.cursos.forEach(element => {
          cont = cont + 1;
          if (this.idCurso == element.id) {
            this.idIndexCurso = cont;
            this.placeholderAula = element.aula,
              this.photoSelected = element.image
          }
        });
      });
    })
  }



  public getNominaCurso(idMateria: any, idNomina: any) {
    this.suscripcion1 = this.authService.getDataNominaCursoId(idMateria, idNomina).subscribe((data) => {
      this.nominaVista.length = 0;
      const dataNomina: any = data.payload.data();
      
      this.historial=dataNomina.historial;
      //'codigoUnico','image','correo','nombre'
      dataNomina.nomina.forEach((dataMateria: any) => {
        this.nominaVista.push({
          nombre: dataMateria.nombre,
          codigoUnico: dataMateria.codigoUnico,
          correo: dataMateria.correo,
          image: dataMateria.image,
          uidUser: dataMateria.uidUser,
          asistencia: dataMateria.asistencia
        })
      });
      this.dataSource2 = new MatTableDataSource(this.nominaVista);
    });
    this.validateSpinner=true;
  }

  openDeleteEstudianteModal(nombre: any, posicion: any) {
    let data = {
      idMateria: this.idMateria,
      idNomina: this.idNomina,
      nombre: nombre,
      array: this.nominaVista[posicion]
    }
    this.openMaterial1(DeleteEstudiantePage, data);
  }


  openEditEstudianteModal(nombre: any, correo: any, codigoUnico: any, posicion: any) {
    let data = {
      idMateria: this.idMateria,
      idNomina: this.idNomina,
      nombre: nombre,
      numero: codigoUnico,
      correo: correo,
      posicion: posicion,
      array: this.nominaVista,
    }
    this.openMaterial1(EditEstudiantePage, data);
  }

  openAddEstudianteModal() {
    let data = {
      idMateria: this.idMateria,
      idCurso: this.idNomina,
      array: this.nominaVista,
      historial:this.historial
    }
    this.openMaterial1(AddEstudiantePage, data);
  }

  openEditAulaModal() {
    let data = {
      idMateria: this.idMateria,
      array: this.dataMateria,
      index: this.idIndexCurso,
      nombreAula: this.placeholderAula
    }
    this.openMaterial1(EditAulaPage, data);
  }

  openEditHorarioModal() {
    let data = {
      materiaNombre: this.nombreMateria,
      idMateria: this.idMateria,
      arrayGuardado: this.dataMateria[0].cursos[this.idIndexCurso],
      arrayCompleto: this.dataMateria,
    }
    this.openMaterial2(EditHorarioPage, data);
  }

  openPhoto() {
    if (this.photoSelected !="") {
      let data = {
        image: this.photoSelected,
        idMateria: this.idMateria,
        arrayGuardado: this.dataMateria[0].cursos[this.idIndexCurso],
        arrayCompleto: this.dataMateria,
      }
      this.ventana.open(EditImagePage,
        { width: ' 25rem', data: data,panelClass: 'myapp-no-padding-dialog2'}).afterClosed().subscribe(item => {
        });
    } else {
      let data = {
        image: ' ',
        idMateria: this.idMateria,
        arrayGuardado: this.dataMateria[0].cursos[this.idIndexCurso],
        arrayCompleto: this.dataMateria,
      }
      this.ventana.open(EditImagePage,
        { width: ' 25rem', data: data,panelClass: 'myapp-no-padding-dialog2'}).afterClosed().subscribe(item => {
        });
    }
  }



  openMaterial(component: any) {
    this.ventana.open(component,
      { width: ' 25rem',panelClass: 'myapp-no-padding-dialog2' }).afterClosed().subscribe(item => { });
  }

  openMaterial1(component: any, info: any) {
    this.ventana.open(component,
      { width: ' 25rem', data: info,panelClass: 'myapp-no-padding-dialog2' }).afterClosed().subscribe(item => {
      });
  }

  openMaterial2(component: any, info: any) {
    this.ventana.open(component,
      { data: info,panelClass: 'myapp-no-padding-dialog' }).afterClosed().subscribe(item => {
        this.getMateria(this.idMateria);
        this.getNominaCurso(this.idMateria, this.idNomina);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  openImage(image: any) {
    if (image != '') {
      this.ventana.open(ViewImagePage,
        { data: image,panelClass: 'myapp-no-padding-dialog' }).afterClosed().subscribe(item => {
        });
    } else {
      this.authService.showInfo('El estudiante no dispone de una imagen de perfil.');
    }
  }

  limpiarBusqueda(input) {
    input.value = '';
    this.dataSource2.filter = null;
  }
}
