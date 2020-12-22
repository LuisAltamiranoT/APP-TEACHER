import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { InfoPage } from 'src/app/perfil/info/info.page';
import { NombrePage } from 'src/app/perfil/nombre/nombre.page';
import { ApellidoPage } from 'src/app/perfil/apellido/apellido.page';
import { PasswordPage } from 'src/app/perfil/password/password.page';
import { MateriaPage } from 'src/app/perfil/materia/materia.page';
import { OficinaPage } from 'src/app/perfil/oficina/oficina.page';
import { EditarMateriaPage } from 'src/app/perfil/editar-materia/editar-materia.page';
import { EliminarDataPage } from 'src/app/perfil/eliminar-data/eliminar-data.page';
import { EditarAnioPage } from 'src/app/perfil/editar-anio/editar-anio.page';
import { FotoPage } from 'src/app/perfil/foto/foto.page';

import { AuthService } from '../../service/auth/auth.service';
import { EliminarCursoPage } from '../eliminar-curso/eliminar-curso.page';
import { DeletePage } from '../delete/delete.page';

import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';
const { Network } = Plugins;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})

export class PerfilPage implements OnInit {
  networkStatus: NetworkStatus;
  networkListener: PluginListenerHandle;


  //valida la ceacion de la tabla
  validateSpinner: boolean = false;
  img='../../../assets/icon/withoutUser.jpg'

  image = "../../../assets/profe.jpg";
  perfil = "";
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

  //comprobar fucnionamiento del init
  contInit:number = 0;

  val = true;

  private suscripcion1: Subscription;
  private suscripcion3: Subscription;

  // Variables para revisar la parte de encriptación //
  texto: string;
  clave: string;
  textoencriptado: string;
  textodesencriptado: string;
  pass_prueba: string;
  textodesencriptado_mal: string;

  constructor(
    public ventana: MatDialog,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.contInit == 0) {
      this.dataUser();
      this.materia();  
      this.network();
    }
  }

  ionViewWillEnter(){
    this.contInit = this.contInit + 1;
    if (this.contInit > 1) {
      this.dataUser();
      this.materia();
      this.network();
    }
  }

  async network() {
    console.log('se esta ejecutando vghhgv');
    this.networkListener = Network.addListener('networkStatusChange', status => {
      console.log('se esta ejecutando');
      console.log('network', status);
      this.networkStatus = status;
    });
    this.networkStatus = await Network.getStatus();
  }
  
  ngOnDestroy() {
    if(this.suscripcion1){
      this.suscripcion1.unsubscribe();
    }

    if(this.suscripcion3){
    this.suscripcion3.unsubscribe();
    }
  }

  ionViewDidLeave() {
    if(this.suscripcion1){
      this.suscripcion1.unsubscribe();
    }

    if(this.suscripcion3){
    this.suscripcion3.unsubscribe();
    }
  }

  dataUser() {
    this.suscripcion1 = this.authService.getDataUser().subscribe((data) => {
      let dataUser: any = [data.payload.data()];
      this.nombre = dataUser[0].nombre;
      this.apellido = dataUser[0].apellido;
      this.correo = dataUser[0].email;
      this.informacion = dataUser[0].info;
      this.oficina = dataUser[0].oficina;
      this.AnioLectivoInicio = dataUser[0].anioInicio;
      this.AnioLectivoFin = dataUser[0].anioFin;

      if(dataUser[0].photoUrl!=''){
        this.perfil = dataUser[0].photoUrl;
      }
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
      this.cargarData();
    });
  }
    //curso completo

    cargarData() {
      this.cursoCompleto.length = 0;
      this.materias.forEach(elementMateria => {
        if( elementMateria.data.cursos){
          elementMateria.data.cursos.forEach(elementCurso => {
            this.cursoCompleto.push({
              idCurso: elementCurso.uidNomina + '//' + elementMateria.id + '//' + elementCurso.id,
              nombre: elementMateria.data.nombre + ' ' + elementCurso.aula,
              image: elementCurso.image,
              array: elementCurso,
              uidNomina: elementCurso.uidNomina,
              idMateria: elementMateria.id
            })
          });
        }
      });
      this.validateSpinner=true;
    }
  

  //editar curso
  editarCurso(idCurso: any) {
    this.router.navigate(['edit-curso', idCurso]);
  }

  openAnioLectivoModal() {
    this.openMaterial(EditarAnioPage,'');
  }

  //al momento de actualizar el nombre se ebe actualizar en las materias que tenga el usuario
  openNombreModal() {
    let info = {
      nombre: this.nombre,
      apellido: this.apellido,
      arrayMaterias: this.materias
    }
    this.openMaterial1(NombrePage, info);
  }

  openInfoModal() {
    this.openMaterial1(InfoPage, this.informacion);
  }

  openApellidoModal() {
    let info = {
      nombre: this.nombre,
      apellido: this.apellido,
      arrayMaterias: this.materias
    }
    this.openMaterial1(ApellidoPage, info);
  }

  openOficinaModal() {
    this.openMaterial1(OficinaPage, this.oficina);
  }

  openPasswordModal() {
    this.openMaterial(PasswordPage,'');
  }

  openMateriaModal() {
    let data = {
      nombre: this.nombre + ' ' + this.apellido,
      image: this.perfil
    }
    this.openMaterial1(MateriaPage, data);
  }

  openEditMateriaModal(nombre: any, idMateria: any) {
    let dataMateria = {
      nombre: nombre,
      id: idMateria,
      array: this.materias
    }
    this.openMaterial1(EditarMateriaPage, dataMateria);
  }

  openEliminarMateriaModal(data: any, idData: any, dataArray: any) {
    let dataMateria = {
      nombre: data,
      id: idData,
      array: dataArray
    }
    this.openMaterial1(EliminarDataPage, dataMateria);
  }

  /*
   idCurso:elementCurso.uidNomina+ '//' + elementMateria.id+'//'+elementCurso.id,
    nombre: elementMateria.data.nombre + ' ' + elementCurso.aula,
    image: elementCurso.image,
   array:array el array de la amteria
   */

  openEliminarCursoModal(nombre: any, uidNomina: any, image: any, idMateria: any, array: any) {
    console.log(array)
    let dataMateria = {
      nombre: nombre,
      uidNomina: uidNomina,
      image: image,
      idMateria: idMateria,
      array: array
    }
    this.openMaterial1(EliminarCursoPage, dataMateria);
  }

  openPhoto() {
    if (this.perfil != '') {
      let info = {
        data: this.perfil,
        array:this.materias
      }
      this.ventana.open(FotoPage,
        { width: ' 25rem', data: info,panelClass: 'myapp-no-padding-dialog2' }).afterClosed().subscribe(item => {
        });
    } else {
      let info = {
        data: 'no-image',
        array:this.materias
      }
      this.ventana.open(FotoPage,
        { width: ' 25rem', data: info,panelClass: 'myapp-no-padding-dialog2' }).afterClosed().subscribe(item => {
        });
    }
  }

  openDeleteModal() {
    let data={
      imagen:this.perfil,
      cursos:this.cursoCompleto
    }
   this.openMaterial(DeletePage,data);
  }

  openMaterial(component: any,data:any) {
    this.ventana.open(component,
      { width: ' 25rem',data:data,panelClass: 'myapp-no-padding-dialog2' }).afterClosed().subscribe(item => {
        this.dataUser();
      });
  }

  openMaterial1(component: any, info: any) {
    this.ventana.open(component,
      { width: ' 25rem', data: info,panelClass: 'myapp-no-padding-dialog2' }).afterClosed().subscribe(item => {
        this.materia();
      });
  }


  openCurso() {
    if (this.materias.length != 0) {
      this.router.navigate(['curso']);
    } else {
      this.authService.showInfo("Primero agregue una materia en su lista");
    }
  }
}
