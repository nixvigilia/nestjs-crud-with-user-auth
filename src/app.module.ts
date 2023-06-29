import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'todoapi',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true, // Auto-create database tables (in development only)
    }),
    TodoModule,
    AuthModule,
    UsersModule,
    ThrottlerModule.forRoot({
      ttl: 60, // Time-to-live in seconds
      limit: 10, // Request limit per interval
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
