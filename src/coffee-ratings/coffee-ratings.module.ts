import { Module } from '@nestjs/common';
import { CoffeeRatingsService } from './coffee-ratings.service';
import { CoffeeRatingsController } from './coffee-ratings.controller';
import { CoffeesModule } from 'src/coffees/coffees.module';

@Module({
  imports: [CoffeesModule],
  controllers: [CoffeeRatingsController],
  providers: [CoffeeRatingsService],
})
export class CoffeeRatingsModule {}
