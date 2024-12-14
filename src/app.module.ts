import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule } from "@nestjs/config";
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './modules/category/category.entity';
import { Movie } from './modules/movies/movie.entity';
import { ActorModule } from './modules/actor/actor.module';
import { MovieModule } from './modules/movies/movie.module';
import { Actor } from './modules/actor/actor.entity';
import { User } from './modules/users/user.entity';
import { MediaModule } from './modules/media/media.module';
import { Media } from './modules/media/media.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Show } from './modules/shows/show.entity';
import { Season } from './modules/seasons/season.entity';
import { Episode } from './modules/episodes/episode.entity';
import { ShowModule } from './modules/shows/show.module';
import { SeasonModule } from './modules/seasons/seasons.module';
import { EpisodeModule } from './modules/episodes/episode.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "lspassword",
      database: "movies-db",
      entities: [Category, Movie, Actor, User, Media, Show, Season, Episode],
      synchronize: true,
    }),
    CategoryModule,
    ActorModule,
    MovieModule,
    UserModule,
    AuthModule,
    MediaModule,
    ShowModule,
    SeasonModule,
    EpisodeModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/media"
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
