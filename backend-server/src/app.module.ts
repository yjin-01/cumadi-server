import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeriesModule } from './apis/series/series.module';
import { SeriesCategoriesModule } from './apis/seriesCategories/seriesCategories.module';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import * as redisStore from 'cache-manager-redis-store';
import { MemosModule } from './apis/memos/memos.module';
import { SeriesReviewModule } from './apis/seriesReviews/seriesReviews.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './apis/posts/posts.module';
import { TagsModule } from './apis/tags/tags.module';
import { StatisticModule } from './apis/statistics/statistics.module';
import { PaymentsModule } from './apis/payments/payments.module';
import { PaymentDetailsModule } from './apis/paymentDetails/paymentDetails.module';
import { shoppingCartModule } from './apis/shoppingCart/shoppingCart.module';
import { LikeModule } from './apis/like/like.module';
import { ImagesModule } from './apis/images/images.module';
import { CommentsModule } from './apis/comments/comments.module';
import { AnswersModule } from './apis/answers/answers.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    AnswersModule,
    AuthModule,
    CommentsModule,
    LikeModule,
    ImagesModule,
    MemosModule,
    PaymentsModule,
    PaymentDetailsModule,
    PostsModule,
    SeriesModule,
    SeriesCategoriesModule,
    SeriesReviewModule,
    shoppingCartModule,
    StatisticModule,
    TagsModule,
    UsersModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/commons/grahql/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      formatError: (formattedError) => {
        return formattedError;
      },
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    CacheModule.register({
      store: redisStore,
      url: 'redis://redis-server:6379',
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [AppController],
})
export class AppModule {}
