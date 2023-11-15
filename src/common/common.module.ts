import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [ConfigModule], //To use the ConfigService in our Guard
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})

//Rq:implements NestModule (to use Middleware)
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //AllRoutes:
    consumer.apply(LoggingMiddleware).forRoutes('*');
    //Particular:
    // consumer.apply(LoggingMiddleware).forRoutes('coffees');
    // consumer.apply(LoggingMiddleware).forRoutes({ path: 'coffees', method: RequestMethod.GET });
    //Exclude (coffees prefix for exp):
    // consumer.apply(LoggingMiddleware).exclude('coffees').forRoutes('*');
  }
}
