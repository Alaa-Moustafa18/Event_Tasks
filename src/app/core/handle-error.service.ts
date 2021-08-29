import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  errorMsg = '';
  constructor() {}
  errorHandler(err: HttpErrorResponse) {
    this.errorMsg =
      err.error instanceof ErrorEvent ? err.message : 'Server error';
    return throwError(this.errorMsg);
  }
}
