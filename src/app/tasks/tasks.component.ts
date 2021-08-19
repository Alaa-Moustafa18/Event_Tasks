import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { eventModel } from '../models/eventModel.model';
import { eventTask } from '../models/task.model';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  events: eventModel[] = [];
  tasks: eventTask[] = [];
  eventsObservable: Subscription;
  tasksObservable: Subscription;

  @Output() selectedEvent = new EventEmitter<eventModel>();

  constructor(private tasksService: TasksService, private router: Router) {}
  ngOnInit(): void {
    this.eventsObservable = this.tasksService.getEvents().subscribe(
      (cart) => {
        this.events = cart.map((element) => {
          const data = element.payload.doc.data() as Event;
          const id = element.payload.doc.id;
          let tasks = this.getTasks(id);
          return { id, ...data };
        });
      },
      (err) => console.log('err', err)
    );
  }

  getTasks(eventID: string) {
    this.tasksObservable = this.tasksService
      .getTasks(eventID)
      .subscribe((tasks) => {
        this.tasks = tasks.map((ele) => {
          return {
            id: ele.payload.doc.id,
            ...(ele.payload.doc.data() as Task),
          };
        });

        this.events.map((item) => {
          if (item.id === eventID) {
            item.tasks = this.tasks;
          }
        });
      });
  }

  addNewEvent() {
    this.router.navigate(['addEvent']);
  }
  editEvent(event: eventModel) {
    this.router.navigate([`edit/${event.id}`]);
    this.selectedEvent.emit(event);
  }
  ngOnDestroy() {
    this.eventsObservable.unsubscribe();
    this.tasksObservable.unsubscribe();
  }
}
