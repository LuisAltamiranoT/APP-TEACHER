import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-notificacion-salir',
  templateUrl: './notificacion-salir.page.html',
  styleUrls: ['./notificacion-salir.page.scss'],
})
export class NotificacionSalirPage implements OnInit {

  nombreForm = new FormGroup({
    name: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<NotificacionSalirPage>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
  ) { }

  ngOnInit(): void {
  }

  
  onClick(){
    let data=true;
    this.dialogRef.close(data);
  }

  dimissModal() {
    let data=false;
    this.dialogRef.close(data);
  }


}
