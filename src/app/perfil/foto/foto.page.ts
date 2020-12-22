import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/service/auth/auth.service';
import { UploadImageService } from 'src/app/service/subir-foto/upload-image.service';

//subscripcion a un observable
import { Subscription } from "rxjs";

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-foto',
  templateUrl: './foto.page.html',
  styleUrls: ['./foto.page.scss'],
})
export class FotoPage implements OnInit {

  private stateImage: Subscription = null;

  validate = true;


  photoForm = new FormGroup({
    image: new FormControl('', Validators.required)
  })

  //image="";
  perfil = '';
  private file: any;
  public photoSelected: string | ArrayBuffer;
  //validar tamaño y tipo de imagen
  private validImage: boolean = false;
  private validateSize: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<FotoPage>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService,
    private uploadImage: UploadImageService
  ) { }

  ngOnInit(): void {

    this.photoSelected = '../../../assets/icon/aqui.jpg';

    this.stateImage = this.authService.finalizoImage$.subscribe(() => {
      this.dimissModal();
    })
  }
  ngOnDestroy() {
    this.stateImage.unsubscribe();
  }


  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      this.validImage = this.uploadImage.validateType(this.file.type);
      this.validateSize = this.uploadImage.validateSize(this.file.size);
      if (this.validImage) {
        if (this.validateSize) {
          const reader = new FileReader();
          reader.onload = e => this.photoSelected = reader.result;
          reader.readAsDataURL(this.file);
        } else {
          this.authService.showError('El tamaño de la imagen no puede exceder los 2MB');
          this.file = '';
          this.photoForm.patchValue({ image: '' });
        }
      } else {
        this.authService.showError('El archivo seleccionado no es una imagen');
        this.file = '';
        this.photoForm.patchValue({ image: '' });
      }
    } else {
      this.validImage = false;
    }
  }

  addFoto() {
    this.validate = false;
    if (this.validImage && this.infoUser.data === 'no-image') {
      this.uploadImage.preAddAndUpdatePerfil(this.file, this.infoUser.array);
    } else {
      let data = this.uploadImage.preAddAndUpdatePerfil(this.file, this.infoUser.array);
      this.uploadImage.deleteImagePerfil(this.infoUser.data);
    }
    setTimeout(() => {
      this.closeModal();
      this.authService.showUpdatedata();
    }, 2000);
  }



  dimissModal() {
    this.validate = true;
    this.authService.showSuccess('La información se ha actualizado');
    this.dialogRef.close();
  }


  closeModal() {
    this.dialogRef.close();
  }

}

