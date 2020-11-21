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

@Component({
  selector: 'app-edit-curso',
  templateUrl: './edit-curso.page.html',
  styleUrls: ['./edit-curso.page.scss'],
})
export class EditCursoPage implements OnInit {

  //manejor de tablas 
  @ViewChild(MatTable) tabla1: MatTable<Nomina>;
  //array de la nomina de los estudiantes 
  public nominaVista = [];
  //contiene el uidMateria
  public uidMateria = "";
  //contiene el nombre de la materia
  public nombreMateria = "";
  //dato que almacenara el id de la materia
  public dataId: any;
  //almacenar nomina del estudiante
  public dataNominaCurso: any;
  //placeholderAula de la aula
  placeholderAula = 'Ejemplo GR1';
  //almacena la imagen del curso
  photoSelected = '';


  private suscripcion1: Subscription;
  private suscripcion2: Subscription;
  private suscripcion3: Subscription;

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
    this.getCurso(this.dataId);
  }

  ngOnDestroy() {
    this.suscripcion1.unsubscribe();
    this.suscripcion2.unsubscribe();
    this.suscripcion3.unsubscribe();
  }

  //CODIGO NUEVO TABLA
  displayedColumns2: string[] = ['fila', 'codigoUnico', 'nombre', 'opciones'];
  dataSource2 = new MatTableDataSource(this.nominaVista);

  getCurso(idCurso: any) {
    this.suscripcion1 = this.authService.getCursoId(idCurso).subscribe((data) => {
      let dataCurso: any = [data.payload.data()];
      this.placeholderAula = dataCurso[0].aula;
      this.uidMateria = dataCurso[0].uidMateria;
      this.photoSelected = dataCurso[0].image;
      this.getMateria(this.uidMateria);
      this.getNominaCurso(idCurso);
    });

  }

  getMateria(idMateria: any) {
    this.suscripcion2 = this.authService.getMateriaId(idMateria).subscribe((data) => {
      let dataMateria: any = [data.payload.data()];
      this.nombreMateria = dataMateria[0].nombre;
    })
  }

  getNominaCurso(idCurso: any) {
    this.suscripcion3 = this.authService.getDataCursoId(idCurso).subscribe((data) => {
      this.nominaVista.length = 0;
      data.forEach((dataMateria: any) => {
        this.nominaVista.push({
          id: dataMateria.payload.doc.id,
          nombre: dataMateria.payload.doc.data().nombre,
          codigoUnico: dataMateria.payload.doc.data().codigoUnico,
          opciones: ''
        })
      });
      this.tabla1.renderRows();
    });
  }
  /*openAddEstudianteModal() {
    this.openMaterial(AddEstudianteComponent);
  }*/

  openDeleteEstudianteModal(idEstudiante: any, nombre: any) {
    let data = {
      idCurso: this.dataId,
      idEstudiante: idEstudiante,
      nombre: nombre
    }
    this.openMaterial1(DeleteEstudiantePage, data);
  }

  openEditEstudianteModal(idEstudiante: any, nombre: any, numeroUnico: any, posicion: number) {
    let data = {
      idCurso: this.dataId,
      idEstudiante: idEstudiante,
      array: this.nominaVista,
      nombre: nombre,
      numero: numeroUnico,
      posicion: posicion
    }
    this.openMaterial1(EditEstudiantePage, data);
  }

  openAddEstudianteModal() {
    let data = {
      idCurso: this.dataId,
      array: this.nominaVista
    }
    this.openMaterial1(AddEstudiantePage, data);
  }

  openEditAulaModal() {
    let data = {
      idCurso: this.dataId,
      nombreAula: this.placeholderAula
    }
    this.openMaterial1(EditAulaPage, data);
  }

  openEditHorarioModal() {
    let data = {
      materiaNombre: this.nombreMateria,
      idMateria: this.uidMateria,
      idCurso: this.dataId
    }
    this.openMaterial2(EditHorarioPage, data);
  }

  openPhoto() {
    if (this.photoSelected != " ") {
      let data = {
        image: this.photoSelected,
        idCurso: this.dataId
      }
      this.ventana.open(EditImagePage,
        { width: ' 25rem', data: data }).afterClosed().subscribe(item => {
        });
    } else {
      let data = {
        image: ' ',
        idCurso: this.dataId
      }
      this.ventana.open(EditImagePage,
        { width: ' 25rem', data: data }).afterClosed().subscribe(item => {
        });
    }
  }

  openMaterial(component: any) {
    this.ventana.open(component,
      { width: ' 25rem' }).afterClosed().subscribe(item => { });
  }

  openMaterial1(component: any, info: any) {
    this.ventana.open(component,
      { width: ' 25rem', data: info }).afterClosed().subscribe(item => {
      });
  }
  openMaterial2(component: any, info: any) {
    this.ventana.open(component,
      { data: info }).afterClosed().subscribe(item => {
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

}
