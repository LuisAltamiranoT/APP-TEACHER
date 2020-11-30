import { Injectable } from '@angular/core';
import { ExcelValidator } from 'src/app/shared/helpers/excelValidator';
@Injectable({
  providedIn: 'root'
})
export class UploadExcelService extends ExcelValidator {

  constructor() {
    super();
  }
}
