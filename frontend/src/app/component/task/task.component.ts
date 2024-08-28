import { Component, OnInit  } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { Task } from '../../model/task/task';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskList: Task[] = [];
  newTask: Task = { id: 0,title: '', completed: false }; 

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.service.loadTasks().subscribe({
      next: (tasks) => {
        this.taskList = tasks;
      },
      error: (err) => {
        console.error('Failed to load tasks', err);
      }
    });
  }

  addTask() {
    if (this.newTask.title.trim()) {
      this.service.addTask(this.newTask).subscribe({
        next: (task) => {
          this.taskList.push(task);  // Add the new task to the task list
          this.newTask = {id: 0, title: '', completed: false };  // Reset the form
        },
        error: (err) => {
          console.error('Failed to add task', err);
        }
      });
    } else {
      console.error('Task title is required');
    }
  }

  updateTask(task: Task) {
    if (task.id) {
      this.service.updateTask(task.id, task).subscribe({
        next: (updatedTask) => {
          const index = this.taskList.findIndex(t => t.id === updatedTask.id);
          if (index !== -1) {
            this.taskList[index] = updatedTask;  // Update the task in the list
          }
        },
        error: (err) => {
          console.error('Failed to update task', err);
        }
      });
    }
  }

  deleteTask(task: Task) {
    if (task.id) {
      this.service.deleteTask(task.id).subscribe({
        next: () => {
          this.taskList = this.taskList.filter(t => t.id !== task.id);  // Remove the task from the list
        },
        error: (err) => {
          console.error('Failed to delete task', err);
        }
      });
    }
  }
}
