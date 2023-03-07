/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/dbModule';
import { ValidationModule } from './config/configModule';
import { PostsModule } from './components/posts/posts.module';
import { AuthModule } from './components/auth/auth.module';
import { UsersModule } from './components/users/users.module';
import { AbilityModule } from './components/ability/ability.factory/ability.module';
import { APP_GUARD } from '@nestjs/core';
import { AbilitiesGuard } from './components/ability/ability.factory/abilities.guard';

@Module({
  imports: [
    ConfigModule,
    ValidationModule,
    DatabaseModule,
    PostsModule,
    AuthModule,
    UsersModule,
    AbilityModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AbilitiesGuard,
    // },
  ],
})
export class AppModule {}
