import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  eventForm: FormGroup;
  eventId: string = '';
  currentEvent: Event = {};
  editMode: boolean = false;
  errorMsg = '';
  minDate;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      if (data.currentvent) {
        this.editMode = true;
        this.currentEvent = data.currentvent;
        this.currentEvent.id =
          this.activatedRoute.snapshot.paramMap.get('id') || '';
      }
    });

    this.createForm();
  }

  createForm() {
    let eventName = this.currentEvent.name || '';
    let eventDueDate = this.currentEvent.dueDate || '';
    let Tasks = this.fb.array([]);
    if (this.editMode && this.currentEvent.tasks) {
      this.currentEvent['tasks'].map((task) => {
        Tasks.push(
          new FormGroup({
            name: this.fb.control(task.name, [Validators.required]),
            startDate: this.fb.control(new Date(task.startDate), [
              Validators.required,
            ]),
            endDate: this.fb.control(new Date(task.endDate), [
              Validators.required,
            ]),
            priority: this.fb.control(task.priority, [Validators.required]),
          })
        );
      });
    }
    this.eventForm = this.fb.group({
      eventDetails: this.fb.group({
        name: this.fb.control(eventName, [Validators.required]),
        dueDate: this.fb.control(new Date(eventDueDate), [Validators.required]),
      }),
      tasks: Tasks,
    });
    if (!this.editMode) {
      this.addTask();
    }
  }
  getTasks(): FormArray {
    return this.eventForm.get('tasks') as FormArray;
  }

  addTask() {
    const formItem = this.fb.group({
      name: this.fb.control(null, [Validators.required]),
      startDate: this.fb.control(null, [Validators.required]),
      endDate: this.fb.control(null, [Validators.required]),
      priority: this.fb.control(null, [Validators.required]),
    });
    this.getTasks().push(formItem);
  }

  deleteTask(taskIndex: number) {
    this.getTasks().removeAt(taskIndex);
  }

  cancel() {
    this.router.navigate(['/']);
  }

  save() {
    const eventDetails = this.eventForm.value.eventDetails;
    let tasks = this.eventForm.value.tasks;
    const event = { ...eventDetails, tasks };
    if (this.editMode) {
      this.eventService.updateEvent(this.currentEvent.id, event).subscribe(
        (res) => {
          this.snackBar.open('Event updated successfully', 'dismiss', {
            duration: 1000,
          });
          // this.router.navigate(['/']);
        },
        (err) => {
          this.errorMsg = err;
        }
      );
    } else {
      this.eventService.addEvent(event).subscribe(
        (res) => {
          this.snackBar.open('Event added successfully', 'dismiss', {
            duration: 1000,
          });
        },
        (err) => {
          this.errorMsg = err;
        }
      );
    }
    this.router.navigate(['/']);
  }
}
