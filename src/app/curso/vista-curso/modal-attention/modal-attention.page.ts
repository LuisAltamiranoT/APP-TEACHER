import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-attention',
  templateUrl: './modal-attention.page.html',
  styleUrls: ['./modal-attention.page.scss'],
})
export class ModalAttentionPage implements OnInit {

  nombreForm = new FormGroup({
    name: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<ModalAttentionPage>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
  ) { }

  ngOnInit(): void {
    console.log(this.infoUser);
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
