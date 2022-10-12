import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateTaskDTO, UpdateTaskDTO } from '../task/task.dto';
import { TaskService } from '../task/task.service';

@WebSocketGateway(8081, {
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(private taskService: TaskService) {}

  @WebSocketServer() server: Server;

  afterInit() {
    console.log('Esto se ejecuta cuando inicia🚀');
  }

  handleConnection() {
    console.log('Alguien se conecto al socket💪');
    this.find();
  }

  handleDisconnect() {
    console.log('Alguien se desconecto del socket🥲');
  }

  @SubscribeMessage('server:find')
  async find() {
    const tasks = await this.taskService.find();
    this.server.emit('server:find', tasks);
  }

  @SubscribeMessage('client:create')
  async create(@MessageBody() payload: CreateTaskDTO) {
    await this.taskService.create(payload);
    this.find();
  }

  @SubscribeMessage('client:update')
  async update(@MessageBody() payload: UpdateTaskDTO) {
    await this.taskService.update(payload._id, {
      title: payload.title,
      description: payload.description,
      isCompleted: payload.isCompleted,
    });
    this.find();
  }

  @SubscribeMessage('client:delete')
  async delete(@MessageBody() id: string) {
    await this.taskService.delete(id);
    this.find();
  }
}
