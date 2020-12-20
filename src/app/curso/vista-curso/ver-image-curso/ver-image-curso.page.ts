import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-ver-image-curso',
  templateUrl: './ver-image-curso.page.html',
  styleUrls: ['./ver-image-curso.page.scss'],
})
export class VerImageCursoPage implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VerImageCursoPage>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any
  ) { }

  ngOnInit(): void {
    console.log(this.infoUser);
  }

}
