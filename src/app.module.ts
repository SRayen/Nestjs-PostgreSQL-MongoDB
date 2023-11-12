import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingsModule } from './coffee-ratings/coffee-ratings.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from 'config/app.config';

@Module({
  imports: [
    //This is Asynchronous configuration that will be loaded after every module registered in the App is resolved
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres', // Explicitly specify the driver
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true, //scan root directories of entities & load entity files
        synchronize: true, //Note: Disable this in Production
      }),
    }),

    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
      load: [appConfig],
    }), //To use .env

    CoffeesModule,
    CoffeeRatingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
