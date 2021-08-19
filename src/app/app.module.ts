import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './shared/material/material/material.module';
import { TasksComponent } from './tasks/tasks.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { TaskFormComponent } from './task-form/task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TasksComponent,
    TaskFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBFSGlEQYVclyndU0uOKNpIhfdVicxHN4Y',
      authDomain: 'events-b8a1e.firebaseapp.com',
      projectId: 'events-b8a1e',
      storageBucket: 'events-b8a1e.appspot.com',
      messagingSenderId: '301443010341',
      appId: '1:301443010341:web:1f88c8347a4ce5d375d4cc',
      measurementId: 'G-LJHWNRJTCV',
    }),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
