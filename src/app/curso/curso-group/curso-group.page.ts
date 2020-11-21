import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

import { ViewImagePage } from 'src/app/curso/view-image/view-image.page';
import { MatDialog } from '@angular/material/dialog';


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
  //colores para cada materia
  private color = ['DARKSLATEGRAY', 'CADETBLUE', 'CORAL', 'FIREBRICK', 'TEAL', 'INDIANRED', 'DARKSLATEBLUE', 'SEAGREEN', 'BROWN', 'LIGHTSLATEGRAY'];

  validate: boolean = true;
  width = 20;
  imgProfesor = 'https://material.angular.io/assets/img/examples/shiba1.jpg';

  constructor(
    public router: Router,
    private authService: AuthService,
    public ventana: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMateria();
  }

  getMateria() {
    this.authService.getDataMateria().subscribe((data) => {
      this.materias.length = 0;
      data.forEach((dataMateria: any) => {
        this.materias.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        });
      })
    });

    this.authService.getDataCurso().subscribe((data) => {
      this.curso.length = 0;
      data.forEach((dataMateria: any) => {
        this.curso.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        })
      });
      this.replaceCursos();
    });
  }


  replaceCursos() {
    this.cursoVista.length = 0;
    console.log('Se ejecuta el replace');
    let cont = 0;
    this.materias.forEach(element => {
      this.curso.forEach(elementCurso => {
        if (element.id === elementCurso.data.uidMateria) {
          if (cont < this.color.length - 1) {
            cont = cont + 1
          } else {
            cont = 0;
          }
          this.cursoVista.push({
            idCurso: elementCurso.id,
            nombre: element.data.nombre + ' - ' + elementCurso.data.aula,
            image: elementCurso.data.image,
            color: this.color[cont]
          });
          console.log('datos_cursos', this.cursoVista);
        }
      });
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
        { width: '25rem', data: image }).afterClosed().subscribe(item => {
        });
    } else {
      this.authService.showInfo('El curso no dispone de una imagen');
    }
  }


}
