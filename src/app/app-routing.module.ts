import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventResolver } from './guards/event.resolver';
import { TaskFormComponent } from './task-form/task-form.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {
    path: 'events',
    component: TasksComponent,
  },

  { path: 'events/addEvent', component: TaskFormComponent },
  {
    path: 'events/:id/edit',
    component: TaskFormComponent,
    resolve: { currentvent: EventResolver },
  },
  { path: '**', component: TasksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
