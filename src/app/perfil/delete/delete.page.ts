import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {

  validacionPass: boolean = false;
  validate = true;
  mensaje = '';

  hide = true;
  hide1 = true;
  hide2 = true;

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(
    public dialogRef: MatDialogRef<DeletePage>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  async onClick() {
    this.validate = false;
    const { oldPassword } = this.passwordForm.value;
    const dat = await this.authService.updateAcoountUser(oldPassword);
    if (dat != 1) {
      this.validate = true;
    } else {
      this.dimissModal();
    }
  }

  dimissModal() {
    this.dialogRef.close();
  }

  eraser() {
    this.passwordForm.patchValue({ office: "" });
  }
}
