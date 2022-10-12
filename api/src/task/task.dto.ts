export class CreateTaskDTO {
  title: string;
  description: string;
}

export class UpdateTaskDTO {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}
