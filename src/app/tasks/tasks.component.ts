import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  events: Event[] = [];
  errorMsg: string = '';
  showSpinner = false;
  constructor(
    private eventService: EventService,
    private router: Router,
    public translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.showSpinner = true;
    this.eventService
      .getEvents()
      .pipe(
        map((events) => {
          for (const event in events) {
            this.events.push({ ...events[event], id: event });
          }
          return this.events;
        })
      )
      .subscribe(
        (events) => {
          this.events = events;
          this.showSpinner = false;
        },
        (err) => {
          this.errorMsg = err;
        }
      );
  }

  editEvent(event: Event) {
    this.router.navigate([`events/${event.id}/edit`]);
  }
}
