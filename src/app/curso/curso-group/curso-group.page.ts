import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/service/auth/auth.service';
import { ViewImagePage } from 'src/app/curso/view-image/view-image.page';

@Component({
  selector: 'app-curso-group',
  templateUrl: './curso-group.page.html',
  styleUrls: ['./curso-group.page.scss'],
})

export class CursoGroupPage implements OnInit {

  //informacion de los cursos guardados en el sistema
  public cursoVista = [];
  //carga la informacion de la base de datos acerca de las materias
  public materias = [];
  //caraga la informacion del curso
  public curso = [];
  //carga horario guardado
  public cursosGuardados = [];
  //controla imagen de fondo
  public stateImage: boolean = false;
  //colores para cada materia
  private color = ['DARKSLATEGRAY', 'CADETBLUE', 'CORAL', 'FIREBRICK', 'TEAL', 'INDIANRED', 'DARKSLATEBLUE', 'SEAGREEN', 'BROWN', 'LIGHTSLATEGRAY'];

  //control de suscripciones
  private suscripcion1: Subscription;

  constructor(
    public router: Router,
    private authService: AuthService,
    public ventana: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMateria();
  }

  ngOnDestroy() {
    this.suscripcion1.unsubscribe();
  }

  getMateria() {
    this.suscripcion1 = this.authService.getDataMateria().subscribe((data) => {
      this.materias.length = 0;
      data.forEach((dataMateria: any) => {
        this.materias.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        });
      })
      this.replaceCursos();
    });
  }



  replaceCursos() {
    this.cursoVista.length = 0;
    this.materias.forEach(elementMateria => {
      elementMateria.data.cursos.forEach(elementCurso => {
        //console.log(elementCurso.uidNomina+ '//' + elementMateria.id+'//'+elementCurso.id);
        let idCurso = elementCurso.uidNomina + '//' + elementMateria.id + '//' + elementMateria.data.nombre + ' ' + elementCurso.aula;
        this.cursoVista.push({
          idCursoEdit: elementCurso.uidNomina + '//' + elementMateria.id + '//' + elementCurso.id,
          idCurso: idCurso,
          nombre: elementMateria.data.nombre + ' ' + elementCurso.aula,
          image: elementCurso.image
        })
        console.log('carga de datos', this.cursoVista, this.materias);
      });
      console.log('tamñano del curso', this.cursoVista.length);
      if (this.cursoVista.length != 0) {
        this.stateImage = false;
      } else {
        this.stateImage = true;
      }

    });
  }

  openCurso(id: any) {
    this.router.navigate(['vista-curso', id]);
  }

  openEditCurso(idCurso: any) {
    this.router.navigate(['edit-curso', idCurso]);
  }

  openPhoto(image: any) {
    if (image != '') {
      this.ventana.open(ViewImagePage,
        { data: image }).afterClosed().subscribe(item => {
        });
    } else {
      this.authService.showInfo('El curso no dispone de una imagen');
    }
  }

}
