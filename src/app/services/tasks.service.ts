import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { eventModel } from '../models/eventModel.model';
import { eventTask } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private afStore: AngularFirestore) {}
  getEvents() {
    return this.afStore.collection('events').snapshotChanges();
  }
  getEvent(id: string) {
    return this.afStore.doc(`events/${id}`).valueChanges();
  }
  addEvent(name: string, dueDate: Date, tasks: eventTask[]) {
    const item = { name, dueDate };

    this.afStore.collection('events').add(item);
  }
  getTasks(id: string) {
    return this.afStore.collection(`events/${id}/tasks`).snapshotChanges();
  }

  deleteTask(eventID: string, taskId: string) {
    return this.afStore.doc(`events/${eventID}/tasks/${taskId}`).delete();
  }
}
