import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.model';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async find(): Promise<TaskDocument[]> {
    return this.taskModel.find();
  }

  async create(data: any): Promise<TaskDocument> {
    const newTask = new this.taskModel(data);
    return newTask.save();
  }

  async update(id: string, data: any): Promise<TaskDocument> {
    return this.taskModel.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<TaskDocument> {
    return this.taskModel.findByIdAndDelete(id);
  }
}
