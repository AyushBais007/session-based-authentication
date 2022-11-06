import { Injectable } from '@angular/core';
import { NgxSpinner } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  visible$ = new BehaviorSubject<boolean>(false);
  constructor() { }
  hide()
  {
    this.visible$.next(false);
  }

  show()
  {
    this.visible$.next(true);
  }

  isVisible(): Observable<boolean> {
    return this.visible$.asObservable().pipe(share());
}
}
