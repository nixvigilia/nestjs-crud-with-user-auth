import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UnauthorizedException,
  Request,
} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(JwtAuthGuard)
@UseGuards(ThrottlerGuard)
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  findAll(@Request() req): Promise<Todo[]> {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return this.todoService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findById(Number(id));
  }

  @Post()
  create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() todo: Todo): Promise<Todo> {
    return this.todoService.update(Number(id), todo);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.todoService.remove(Number(id));
  }

  // @Post(':id/comments')
  // addComment(@Param('id') id: string, @Body() comment: Comment): Promise<Todo> {
  //   return this.todoService.addComment(Number(id), comment);
  // }

  // @Put('comments/:commentId')
  // updateComment(
  //   @Param('commentId') commentId: string,
  //   @Body() updatedComment: Comment,
  // ): Promise<Comment> {
  //   return this.todoService.updateComment(Number(commentId), updatedComment);
  // }

  // @Delete('comments/:commentId')
  // removeComment(@Param('commentId') commentId: string): Promise<void> {
  //   return this.todoService.removeComment(Number(commentId));
  // }
}
