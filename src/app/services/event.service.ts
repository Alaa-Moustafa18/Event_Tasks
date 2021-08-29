import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleErrorService } from '../core/handle-error.service';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(
    private httpClient: HttpClient,
    private handleError: HandleErrorService
  ) {}

  baseUrl = 'https://events-tasks-default-rtdb.firebaseio.com';

  getEvents() {
    return this.httpClient
      .get<Event[]>(`${this.baseUrl}/events.json`)
      .pipe(catchError((err) => this.handleError.errorHandler(err)));
  }

  getEvent(id: string) {
    return this.httpClient
      .get<Event>(`${this.baseUrl}/events/${id}.json`)
      .pipe(catchError((err) => this.handleError.errorHandler(err)));
  }

  addEvent(event: Event) {
    return this.httpClient
      .post<Event>(`${this.baseUrl}/events.json`, event)
      .pipe(catchError((err) => this.handleError.errorHandler(err)));
  }

  updateEvent(id, event: Event) {
    return this.httpClient
      .put<Event>(`${this.baseUrl}/events/${id}.json`, event)
      .pipe(catchError((err) => this.handleError.errorHandler(err)));
  }
  deleteEvent(id: string) {
    return this.httpClient
      .delete<Event>(`${this.baseUrl}/events/${id}.json`)
      .pipe(catchError((err) => this.handleError.errorHandler(err)));
  }
}
