import { Component, OnInit } from '@angular/core';
//import { ModalController } from '@ionic/angular';

import { InfoPage } from 'src/app/perfil/info/info.page';
import { NombrePage } from 'src/app/perfil/nombre/nombre.page';

import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { ApellidoPage } from 'src/app/perfil/apellido/apellido.page';
import { PasswordPage } from 'src/app/perfil/password/password.page';
import { CursoGroupPage } from 'src/app/curso/curso-group/curso-group.page';
import { MateriaPage } from 'src/app/perfil/materia/materia.page';
import { OficinaPage } from 'src/app/perfil/oficina/oficina.page';
import { EditarMateriaPage } from 'src/app/perfil/editar-materia/editar-materia.page';
import { EliminarDataPage } from 'src/app/perfil/eliminar-data/eliminar-data.page';
import { EditarAnioPage } from 'src/app/perfil/editar-anio/editar-anio.page';
import { FotoPage } from 'src/app/perfil/foto/foto.page';

import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})

export class PerfilPage implements OnInit {

  image = "../../../../assets/icon/profe.jpg";
  perfil = "../../../../assets/icon/perfil.jpg";
  nombre = "";
  apellido = "";
  oficina = "";
  correo = "";
  informacion = "";
  cursos = [];
  materias = [];
  cursoCompleto = [];
  password = "";
  materiaSeleccionada = "";
  nombreMateria = "";

  AnioLectivoInicio = "dd/mm/yyyy";
  AnioLectivoFin = "dd/mm/yyyy";

  val = true;

  private suscripcion1: Subscription;
  private suscripcion2: Subscription;
  private suscripcion3: Subscription;

  // Variables para revisar la parte de encriptación //
  texto: string;
  clave: string;
  textoencriptado: string;
  textodesencriptado: string;
  pass_prueba: string;
  textodesencriptado_mal: string;

  constructor(
   // public modalController: ModalController,
    public ventana: MatDialog,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataUser();
    this.materia();
    this.curso();

    //prueba de encriptacion
    this.pruebaEncriptar();
  }

  // Funcion para encriptar //
  pruebaEncriptar() {
    /* this.texto = 'Mi materia favorita';
     this.clave = 'NivalAPP';
     this.pass_prueba = 'Jenny';
     this.textoencriptado = CryptoJS.AES.encrypt(this.texto.trim(), this.clave.trim()).toString();
     this.textodesencriptado = CryptoJS.AES.decrypt(this.textoencriptado.trim(), this.clave.trim()).toString(CryptoJS.enc.Utf8);
     this.textodesencriptado_mal = CryptoJS.AES.decrypt(this.textoencriptado.trim(), this.pass_prueba.trim()).toString(CryptoJS.enc.Utf8);
     console.log('Texto ----> ', this.texto)
     console.log('Encripatdo ----> ', this.textoencriptado)
     console.log('Desencriptado_clave_verdadera ----> ', this.textodesencriptado)
     console.log('Desencriptar_clave_falsa ----> ', this.textodesencriptado_mal)*/

  }

  ngOnDestroy() {
    this.suscripcion1.unsubscribe();
    this.suscripcion2.unsubscribe();
    this.suscripcion3.unsubscribe();
  }

  dataUser() {
    this.suscripcion1 = this.authService.getDataUser().subscribe((data) => {
      let dataUser: any = [data.payload.data()];
      this.nombre =dataUser[0].nombre;
      this.apellido = dataUser[0].apellido;
      this.correo = dataUser[0].email;
      this.informacion = dataUser[0].info;
      this.oficina = dataUser[0].oficina;
      this.AnioLectivoInicio = dataUser[0].anioInicio;
      this.AnioLectivoFin = dataUser[0].anioFin;
      this.perfil = dataUser[0].photoUrl;
      console.log(data);
    });
  }

  curso() {
    this.suscripcion2 = this.authService.getDataCurso().subscribe((data) => {
      this.cursos.length = 0;
      data.forEach((dataCurso: any) => {
        this.cursos.push({
          id: dataCurso.payload.doc.id,
          data: dataCurso.payload.doc.data()
        });
      })
      this.cargarData();
    });
  }

  cargarData() {
    this.materias.forEach(elementMateria => {
      this.cursos.forEach(elementCurso => {
        if (elementMateria.id === elementCurso.data.uidMateria) {
          this.cursoCompleto.push({
            idCurso: elementCurso.id,
            nombre: elementMateria.data.nombre + ' ' + elementCurso.data.aula
          })
        }
      });
    });
  }

  materia() {
    this.suscripcion3 = this.authService.getDataMateria().subscribe((data) => {
      this.materias.length = 0;
      data.forEach((dataMateria: any) => {
        this.materias.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        });
      })
    });
  }

  //eliminar curso
  eliminarCurso(idCurso: any) {

  }
  //editar curso
  editarCurso(idCurso: any) {
    this.router.navigate(['edit-curso', idCurso]);
  }

   openAnioLectivoModal() {
     this.openMaterial(EditarAnioPage);
   }
 
   openNombreModal() {
     this.openMaterial1(NombrePage, this.nombre);
   }
 
   openInfoModal() {
     this.openMaterial1(InfoPage, this.informacion);
   }
 
   openApellidoModal() {
     this.openMaterial1(ApellidoPage, this.apellido);
   }
 
   openOficinaModal() {
     this.openMaterial1(OficinaPage, this.oficina);
   }
 
   openPasswordModal() {
     this.openMaterial1(PasswordPage, this.password);
   }
 
   openMateriaModal() {
     this.openMaterial(MateriaPage);
   }
 
   openEditMateriaModal(data: any, idData: any) {
     let dataMateria = {
       nombre: data,
       id: idData,
       array: this.materias
     }
     this.openMaterial1(EditarMateriaPage, dataMateria);
   }
 
   openEliminarMateriaModal(data: any, idData: any) {
     let dataMateria = {
       nombre: data,
       id: idData
     }
     this.openMaterial1(EliminarDataPage, dataMateria);
   }
 
   openPhoto() {
     if (this.perfil != "../../../../assets/perfil.jpg") {
       this.ventana.open(FotoPage,
         { width: ' 25rem', data: this.perfil }).afterClosed().subscribe(item => {
         });
     } else {
       this.ventana.open(FotoPage,
         { width: ' 25rem', data: 'no-image' }).afterClosed().subscribe(item => {
         });
     }
   }

  openDeleteModal() {
    console.log("hay que borar datos");
  }

   openMaterial(Page: any) {
     this.ventana.open(Page,
       { width: ' 25rem' }).afterClosed().subscribe(item => {
         //this.ListaDepartamentos();
         // Aqui va algo que quieras hacer al cerrar el Pagee
         // yo se poner la actualizacion de la pagina jejjeje
       });
   }
 
   openMaterial1(Page: any, info: any) {
     this.ventana.open(Page,
       { width: ' 25rem', data: info }).afterClosed().subscribe(item => {
       });
   }


  openCurso() {
    if (this.materias.length != 0) {
      this.router.navigate(['add-curso']);
    } else {
      this.authService.showInfo("Agregue una materia en su lista");
    }
  }

}
