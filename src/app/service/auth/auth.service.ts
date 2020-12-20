// Importación funcional de firebase
import firebase from 'firebase/app';

// Importación de toast para alertas
import { ToastController } from '@ionic/angular';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import * as moment from 'moment';

import { RoleValidator } from 'src/app/shared/helpers/rolValidator';

import { switchMap, map, first } from 'rxjs/operators';

///observable y subject permite ejecutar una acción al cumplirse una condición
import { Observable, of, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User, Curso, Materia, Nomina, NominaObligatoria, MateriaRegister } from 'src/app/shared/models/user.interface';
import { Router } from '@angular/router';

import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})

export class AuthService extends RoleValidator {
  //observable y subject
  private estadoImgenUpdate = new Subject<void>();
  public finalizoImage$ = this.estadoImgenUpdate.asObservable();

  public stateScanner = new Subject<any>();

  private MEDIA_STORAGE_PATH = 'imageCurso';
  private MEDIA_STORAGE_PATH_PERFIL = 'perfil';

  private dataUser: any;
  public user$: Observable<User>;

  //bloquea la navegacion hacia el login
  public stateUser$: Observable<any>;

  constructor(
    public afAuth: AngularFireAuth,
    private toastr: ToastController,
    private afs: AngularFirestore,
    public router: Router,
    private storage: AngularFireStorage
  ) {
    super();


    // Es utilizado en el guard
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.dataUser = user.uid;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges().pipe(
            first(data => data.role === 'ADMIN' || data.role === 'EDITOR')
          )
        }
        return of(null);
      })
    )

    this.stateUser$ = this.afAuth.authState.pipe(map(auth => auth));

  }

  // INICIO DE SESIÓN        
  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }


  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    }
    catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      await this.updateUserData(user);
      return user;
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }


  async logout() {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['home']);
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  private async updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified
    };
    //si existe que realixe merge
    return await userRef.set(data, { merge: true });
  }

  //Registro profesor
  async register(email: string, password: string, nombre: string, apellido: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (user) {
        await this.registerDataUser(user, nombre, apellido);
      }
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }


  private async registerDataUser(user: User, nombre: string, apellido: string) {
    try {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
      const data: User = {
        uid: user.uid,
        nombre: nombre,
        apellido: apellido,
        email: user.email,
        emailVerified: user.emailVerified,
        role: 'ADMIN',
        photoUrl: ''
      };

      return await userRef.set(data, { merge: true });

    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  //Obtener Datos
  public getDataUser() {
    try {
      let db = this.afs.doc<User>(`users/${this.dataUser}`).snapshotChanges();
      return db;
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  public reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword
    );
    return user.reauthenticateWithCredential(credential);
  }


  //password
  public async updatePass(oldPass: string, newPass: string): Promise<Number> {
    //estado cero no se logro, estado 1 se ha logrado 
    const user = firebase.auth().currentUser;
    let data: number;
    try {
      await this.reauthenticate(oldPass);
      await user.updatePassword(newPass);
      this.showSuccess("Su contraseña ha sido actualizada");
      data = 1;
      return data;
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
      return data = 0;
    }
  }


  //Delete user
  public async updateAcoountUser(oldPass: string, imagen: any, cursos: any): Promise<Number> {
    let data: number;
    try {
      let userAccount = firebase.auth().currentUser;
      await this.reauthenticate(oldPass);
      await this.updateEstadoEliminar();
      

      if (imagen != '') {
        let splitted = imagen.split("perfil%2F")[1];
        let name = splitted.split("?alt")[0];
        const fileref = this.storage.ref(`${this.MEDIA_STORAGE_PATH_PERFIL}/${name}`);
        fileref.delete();
      } 

      if (cursos.length != 0) {
        cursos.forEach(element => {
          if (element.image != '') {
            let splitted = element.image.split("imageCurso%2F")[1];
            let name = splitted.split("?alt")[0];
            const fileref = this.storage.ref(`${this.MEDIA_STORAGE_PATH}/${name}`);
            fileref.delete();
          }
        });
      }

      await userAccount.delete();
      this.showSuccess('Usted ha eliminado su cuenta de NIVAL EASY ATTENDANCE CONTROL');
      this.logout();
      return data = 1;
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
      return data = 0;
    }
  }





  //nombre
  public async updateEstadoEliminar() {
    try {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.dataUser}`);
      const data = {
        EliminarCuenta: 'EliminarCuenta'
      };
      const dataUpdate = await userRef.set(data, { merge: true });
      this.showUpdatedata();
      return { dataUpdate };

    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  //descripcion
  public async updateDescripcion(valor: string) {
    try {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.dataUser}`);
      const data: User = {
        info: valor
      };
      await userRef.set(data, { merge: true });
      //const dataUpdate = await userRef.set(data, { merge: true });
      //this.showUpdatedata();
      //return { dataUpdate };

    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  //nombre
  public async updateName(valor: string) {
    try {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.dataUser}`);
      const data: User = {
        nombre: valor
      };
      await userRef.set(data, { merge: true });
      //this.showUpdatedata();
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  //apellido
  public async updateLastName(valor: string) {
    try {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.dataUser}`);
      const data: User = {
        apellido: valor
      };
      await userRef.set(data, { merge: true });
      //this.showUpdatedata();
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  //oficina
  public async updateOficina(valor: string) {
    try {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.dataUser}`);
      const data: User = {
        oficina: valor
      };
      await userRef.set(data, { merge: true });
      //const dataUpdate = await userRef.set(data, { merge: true });
      //this.showUpdatedata();
      //return { dataUpdate };

    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }


  //anio
  public async updateAnioLectivo(valor: string, valor2: string) {
    try {
    

      console.log(valor, valor2);
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.dataUser}`);
      const data: User = {
        anioInicio: moment(valor).format('DD-MM-YYYY'),
        anioFin: moment(valor2).format('DD-MM-YYYY')
      };

      await userRef.set(data, { merge: true });
      //this.showUpdatedata();
      //return { dataUpdate };

    } catch (error) {
      //console.log(error);
      //this.showError('Verifica los datos. Algo salio mal');
    }
  }

  // obtener materias

  public getDataMateria() {
    try {
      let db = this.afs.doc<Materia>(`users/${this.dataUser}`).collection('materias').snapshotChanges();
      return db;
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  //crear materia
  public async createMateria(valor: any, nombre: any, image: any) {
    try {
      const data: MateriaRegister = {
        nombre: valor,
        profesor: nombre,
        photoUrl: image,
        uidProfesor: this.dataUser,
        cursos: []
      }
      await this.afs.doc<Materia>(`users/${this.dataUser}`).collection('materias').add(data);
      //const create = await this.afs.doc<Materia>(`users/${this.dataUser}`).collection('materias').add(data);
      //this.showUpdatedata();
      //return create;
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  public async updateMateria(documentId: string, data: any) {
    try {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(documentId);
      const update: Materia = {
        nombre: data
      };
      await userRef.set(update, { merge: true });
      //const dataUpdate = await userRef.set(update, { merge: true });
      //this.showUpdatedata();
      //return { dataUpdate };
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  //actualizar nombre e profesor en materias
  public async updateMateriaNombreProfesor(documentId: string, data: any) {
    try {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(documentId);
      const update: Materia = {
        profesor: data
      };
      const dataUpdate = await userRef.set(update, { merge: true });
      return { dataUpdate };
    } catch (error) {
      //this.showError('Verifica los datos. Algo salio mal');
    }
  }

  //actualizar nombre e profesor en materias
  public async updateMateriaFotoProfesor(documentId: string, data: any) {
    try {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(documentId);
      const update: Materia = {
        photoUrl: data
      };
      const dataUpdate = await userRef.set(update, { merge: true });
      return { dataUpdate };
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }


  //editar aula
  public async updateCursoAula(documentId: any, data: any) {
    try {
      const dataRef: AngularFirestoreDocument<Materia> = this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(documentId);
      await dataRef.set(data[0], { merge: true });
      //const dataUpdate = await dataRef.set(data[0], { merge: true });
      //this.showUpdatedata();
      //return { dataUpdate };

    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
      //console.log(error);
    }
  }

  //actualizar curso horario
  public async updateImageCurso(curso: any, idMateria: any) {
    try {
      const dataRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria);
      const dataUpdate = await dataRef.set(curso[0], { merge: true });
      this.estadoImgenUpdate.next();
      this.showUpdatedata();
      //return { dataUpdate };
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  public async delecteMateria(documentId: any) {
    try {
      await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(documentId).delete();
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  //eliminar estudiante
  public async deleteCurso(idMateria: any, ArrayCurso: any) {
    try {
      await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).update({ cursos: firebase.firestore.FieldValue.arrayRemove(ArrayCurso) });
      //this.showDeletedata();
      //return create;
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  //deleteNomina
  public async deleteNomina(documentId: any, idNomina: any) {
    try {
      await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(documentId).collection('nomina').doc(idNomina).delete();
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  async updateNominaUnionAsistencia(idMateria: any, idNomina: any, arrayTemp2: any) {
    try {
      const userRef = this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).collection('nomina').doc(idNomina);
      const data = {
        nomina: arrayTemp2
      };
      let inf = await userRef.set(data, { merge: true });
      this.showUpdatedata();
      return inf;
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }

  }


  //imagen
  public async updatePhoto(valor: any) {
    try {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.dataUser}`);
      const data: User = {
        photoUrl: valor
      };
      await userRef.set(data, { merge: true });
      this.estadoImgenUpdate.next();

    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }
  //imagen curso
  public async updatePhotoCurso(valor: any, idCurso: any) {
    try {
      const userRef: AngularFirestoreDocument<Curso> = this.afs.doc(`users/${this.dataUser}`).collection('cursos').doc(idCurso);
      const data: Curso = {
        image: valor
      };
      await userRef.set(data, { merge: true });
      this.estadoImgenUpdate.next();

    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }


  //crear curso
  public async createCurso(listCurso: any, idMateria: any) {
    //cursos,idMateria,idCurso,nomina
    try {
      const datos: Materia = {
        cursos: listCurso
      }
      await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).set(datos, { merge: true });
      this.estadoImgenUpdate.next();
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  //crear nomina de estudiantes
  public async createNomina(nomina: any, idCurso: any, idMateria) {
    try {
      const nominaCurso = {
        uidMateria: idMateria,
        uidCurso: idCurso,
        uidProfesor: this.dataUser,
        nomina: nomina,
        historial: [],
        numeroAlmacenado: '0',
        estado: 'presente',
        code: ''
      }
      const create = await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).collection('nomina').add(nominaCurso);
      return create;
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  //agregar estudiante en nomina segun el id del curso
  public async addEstudiante(idMateria: any, idNomina: any, valor: any) {
    try {
      await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).collection('nomina').doc(idNomina).update({ nomina: firebase.firestore.FieldValue.arrayUnion(valor) });
      //this.showUpdatedata();
      //return create;

    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  //eliminar estudiante
  public async deleteEstudiante(idMateria: any, idNomina: any, ArrayEstudiante: any) {
    try {
      await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).collection('nomina').doc(idNomina).update({ nomina: firebase.firestore.FieldValue.arrayRemove(ArrayEstudiante) });
      //this.showDeletedata();
      //return create;
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }



  //actualizar horario
  public async updateHorario(horario: any, idMateria: any) {
    try {
      const dataRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria);
      await dataRef.set(horario[0], { merge: true });
      //const dataUpdate = await dataRef.set(horario[0], { merge: true });
      //this.showUpdatedata();
      //return { dataUpdate };
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  //Obtener la materia con el id
  public getMateriaId(id: any) {
    try {
      let db = this.afs.doc<Curso>(`users/${this.dataUser}`).collection('materias').doc(id).snapshotChanges();
      return db;
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }


  //actualizar nomina
  public async updateNomina(idNomina: any, idMateria: any, array: any, estado: any, acceso: any, numeroAlmacenado: any, historial: any) {
    try {
      let data = {
        numeroAlmacenado: numeroAlmacenado,
        historial: historial,
        code: acceso,
        estado: estado,
        nomina: array
      }
      await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).collection('nomina').doc(idNomina).set(data, { merge: true });
      //this.showUpdatedata();
      //return 10;
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  //actualizar estado actual
  public async updateNominaEstado(idNomina: any, idMateria: any, estado: any): Promise<void> {
    try {
      let data = {
        estado: estado
      }
      let db = await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).collection('nomina').doc(idNomina).set(data, { merge: true });
      this.showUpdatedata();
      return db;
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }


  //actualizar estado actual
  public async updateNominaEstadoQR(idNomina: any, idMateria: any, acceso: any, historial: any) {
    try {
      let data = {
        code: acceso,
        historial: historial
      }
      let db = await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).collection('nomina').doc(idNomina).set(data, { merge: true });
      this.showUpdatedata();
      return db;
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  //actualizar nomina
  public async updateNominaAnterior(idNomina: any, idMateria: any, array: any) {
    try {
      let data = {
        nomina: array
      }
      await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).collection('nomina').doc(idNomina).set(data, { merge: true });
      //this.showUpdatedata();
      //return 10;
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  //actualizar estudiante
  public async updateNominaEstudiante(idNomina: any, idMateria: any, array: any): Promise<void> {
    try {
      let data = {
        nomina: array
      }
      await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).collection('nomina').doc(idNomina).set(data, { merge: true });
      //this.showUpdatedata();
      //return db;
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }
  //Obtener la nomina del curso
  public getDataNominaCursoId(idMateria: any, idNomina: any) {
    try {
      let db = this.afs.doc<NominaObligatoria>(`users/${this.dataUser}`).collection('materias').doc(idMateria).collection('nomina').doc(idNomina).snapshotChanges();
      return db;
    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }

  //Obtener asistencia de todos por fecha
  public getDataAsistencia(idCurso: any, dataAsistencia: any) {
    try {
      let consulta = this.afs.doc(`users/${this.dataUser}`).collection('cursos').doc(idCurso).collection('asistencia', ref => ref.where('fecha', '==', dataAsistencia)).snapshotChanges();
      return consulta;

    } catch (error) {
      this.showError('Verifica los datos. Algo salio mal');
    }
  }


  // Mensajes
  showError(mensaje: string) {
    let color = 'danger';
    this.presentToast(mensaje, color);
  }

  // Mensaje de error de archivo excel
  showSuccess(mensaje: string) {
    let color = 'success';
    this.presentToast(mensaje, color);
  }

  showUpdatedata() {
    this.showSuccess("Se ha actualizado su información");
  }

  showDeletedata() {
    this.showSuccess("Se ha eliminado correctamente la información");
  }

  showWarning(mensaje: string) {
    let color = 'warning';
    this.presentToast(mensaje, color);
  }

  showInfoExcel(mensaje: string) {
    let color = 'secondary';
    this.presentToast(mensaje, color);
  }

  showInfo(mensaje: string) {
    let color = 'secondary';
    this.presentToast(mensaje, color);
  }

  async presentToast(mensajeToast: string, colorToast: string) {
    const toast = await this.toastr.create({
      color: colorToast,
      message: mensajeToast,
      duration: 2000,
      position: 'top',
      cssClass: "toastClass",
      //showCloseButton: true
    });
    toast.present();
  }
}

