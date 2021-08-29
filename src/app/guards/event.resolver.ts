import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';

@Injectable({
  providedIn: 'root',
})
export class EventResolver implements Resolve<Event> {
  constructor(private eventService: EventService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Event> {
    const eventId = route.paramMap.get('id');
    return eventId
      ? this.eventService
          .getEvent(eventId)
          .pipe(catchError((err) => throwError(err)))
      : EMPTY;
  }
}
