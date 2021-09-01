import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { EventService } from '../services/event.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventValidators {
  constructor(private eventService: EventService) {}
  eventNameUniqueness(id: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return this.eventService.getEvents().pipe(
        map((res) => {
          for (const key in res) {
            if (key !== id)
              if (Object.values(res[key]).indexOf(control.value) != -1) {
                return { nameAlreadyExist: true };
              }
          }
        })
      );
    };
  }
}
