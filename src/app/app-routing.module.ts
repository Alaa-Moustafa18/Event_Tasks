import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { eventModel } from './models/eventModel.model';
import { TaskFormComponent } from './task-form/task-form.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'addEvent', component: TaskFormComponent },
  {
    path: 'edit/:id',
    component: TaskFormComponent,
  },
  { path: '**', component: TasksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
