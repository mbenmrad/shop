import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Product } from '../domain/product';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActionEvent } from './product.state';

@Injectable({
  providedIn: 'root'
})
export class EventDriverService {
  sourceEventSubject: Subject<ActionEvent> = new Subject<ActionEvent>();
  sourceEventSubjectObservable: Observable<ActionEvent> = this.sourceEventSubject.asObservable();

  publishEvent(event: ActionEvent) {
    this.sourceEventSubject.next(event);
  }

}
