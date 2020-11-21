import { Component, OnInit } from '@angular/core';
//import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {

  deleteForm = new FormGroup({
    password: new FormControl('')
  })

  constructor(
   // public activeModal: NgbActiveModal,
    //private modalService: NgbModal,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onDelete() {

  }
  dimissModal() {
    //this.activeModal.dismiss();
  }

}
