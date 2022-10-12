import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { CreateTask, Task, UpdateTask } from './interfaces/task.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';
  tasks: Task[] = [];
  task: CreateTask | UpdateTask = {
    title: '',
    description: '',
  };

  constructor(private socket: Socket) {
    this.socket.fromEvent<Task[]>('server:find').subscribe({
      next: (data) => {
        this.tasks = data;
      },
    });
  }

  sendTask() {
    if (this.task._id) {
      this.updateTask();
    } else {
      this.createTask();
    }
  }

  setTaskToUpdate(task: UpdateTask) {
    this.task = JSON.parse(JSON.stringify(task));
  }

  createTask() {
    this.socket.emit('client:create', this.task);
    this.clearForm();
  }

  updateTask() {
    this.socket.emit('client:update', this.task);
    this.clearForm();
  }

  deleteTask(id: string) {
    this.socket.emit('client:delete', id);
    this.clearForm();
  }

  onChangeToggle(event: Event) {
    this.task.isCompleted = (event.target as HTMLInputElement).checked;
  }

  clearForm() {
    this.task = {
      title: '',
      description: '',
    };
  }
}
