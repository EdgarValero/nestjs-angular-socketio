export interface Task {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface CreateTask {
  _id?: string;
  title: string;
  description: string;
  isCompleted?: boolean;
}

export interface UpdateTask extends Partial<CreateTask> {
  _id: string;
  isCompleted: boolean;
}
