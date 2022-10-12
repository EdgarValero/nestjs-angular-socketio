import { Module } from '@nestjs/common';
import { TaskModule } from '../task/task.module';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [EventsGateway],
  imports: [TaskModule],
})
export class EventsModule {}
