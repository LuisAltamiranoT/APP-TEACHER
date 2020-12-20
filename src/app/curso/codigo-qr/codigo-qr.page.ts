import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.page.html',
  styleUrls: ['./codigo-qr.page.scss'],
})
export class CodigoQrPage implements OnInit {
  //valida la ceacion de la tabla
  validateSpinner: boolean = false;

  elementType = NgxQrcodeElementTypes.IMG;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value: any;

  dato: any;
  nombre:any='';

  constructor(
    private _route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.dato = this._route.snapshot.paramMap.get('data');

    this.value = this.dato;
    this.nombre = this._route.snapshot.paramMap.get('nombre');
    this.finalizar();
  }

  finalizar() {
    setTimeout(() => {
      this.validateSpinner = true;
    }, 5000);
  }

 

 
  goBack(){
    this._location.back();
  }

}
