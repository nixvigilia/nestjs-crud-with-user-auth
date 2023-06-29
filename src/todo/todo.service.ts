import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>, // @InjectRepository(Comment)
  ) // private commentRepository: Repository<Comment>,
  {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findById(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async create(todo: Todo): Promise<Todo> {
    const createdTodo = await this.todoRepository.save(todo);
    if (createdTodo) {
      return createdTodo;
    } else {
      throw new Error('Failed to create todo');
    }
  }

  async update(id: number, todo: Todo): Promise<Todo> {
    const updatedTodo = await this.todoRepository.preload({
      id,
      ...todo,
    });
    if (!updatedTodo) {
      throw new NotFoundException('Todo not found');
    }
    return this.todoRepository.save(updatedTodo);
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.todoRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new Error('Todo not found');
    }
  }

  // async addComment(todoId: number, comment: Comment): Promise<Todo> {
  //   const todo = await this.findById(todoId);

  //   comment.todo = todo;

  //   const createdComment = await this.commentRepository.save(comment);

  //   todo.comments.push(createdComment);

  //   return this.todoRepository.save(todo);
  // }

  // async updateComment(
  //   commentId: number,
  //   updatedComment: Comment,
  // ): Promise<Comment> {
  //   const comment = await this.commentRepository.findOne({
  //     where: { id: commentId },
  //   });

  //   if (!comment) {
  //     throw new NotFoundException('Comment not found');
  //   }

  //   const updated = Object.assign(comment, updatedComment);

  //   return this.commentRepository.save(updated);
  // }

  // async removeComment(commentId: number): Promise<void> {
  //   const deleteResult = await this.commentRepository.delete(commentId);

  //   if (deleteResult.affected === 0) {
  //     throw new NotFoundException('Comment not found');
  //   }
  // }
}
