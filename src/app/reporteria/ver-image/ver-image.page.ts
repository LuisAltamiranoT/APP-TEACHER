import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-image',
  templateUrl: './ver-image.page.html',
  styleUrls: ['./ver-image.page.scss'],
})
export class VerImagePage implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VerImagePage>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any
  ) { }

  ngOnInit(): void {
    console.log(this.infoUser);
  }


}
