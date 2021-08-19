import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { eventModel } from '../models/eventModel.model';
import { eventTask } from '../models/task.model';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  eventForm: FormGroup;
  eventId: string;
  tasks: eventTask[] = [];
  currentEvent: any;
  eventSubscription: Subscription;
  taskSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private taskService: TasksService
  ) {}

  ngOnInit(): void {
    this.eventId = this.activatedRoute.snapshot.params.id;
    if (this.eventId) {
      this.eventSubscription = this.taskService
        .getEvent(this.eventId)
        .subscribe((res) => {
          this.currentEvent = res;
        });
      this.taskSubscription = this.taskService
        .getTasks(this.eventId)
        .subscribe((tasks) => {
          this.tasks = tasks.map((ele) => {
            return {
              id: ele.payload.doc.id,
              ...(ele.payload.doc.data() as Task),
            };
          });
        });
    }
    this.createForm();
  }

  createForm() {
    this.eventForm = this.fb.group({
      eventDetails: this.fb.group({
        name: this.fb.control(
          this.currentEvent ? this.currentEvent.name : null,
          [Validators.required]
        ),
        dueDate: this.fb.control(
          this.currentEvent ? this.currentEvent.dueDate.toDate() : null,
          [Validators.required]
        ),
      }),
      tasks: this.fb.array([]),
    });
    this.addTask();
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
    const tasks = this.eventForm.value.tasks;
    this.taskService.addEvent(eventDetails.name, eventDetails.dueDate, tasks);
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
    this.taskSubscription.unsubscribe();
  }
}
