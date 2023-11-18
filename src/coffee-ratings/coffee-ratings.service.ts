import { Injectable } from '@nestjs/common';
import { CreateCoffeeRatingDto } from './dto/create-coffee-rating.dto';
import { UpdateCoffeeRatingDto } from './dto/update-coffee-rating.dto';
import { CoffeesService } from 'src/coffees/coffees.service';

@Injectable()
export class CoffeeRatingsService {
  constructor(private readonly coffeesService: CoffeesService) {}

  create(createCoffeeRatingDto: CreateCoffeeRatingDto) {
    return 'This action adds a new coffeeRating';
  }

  findAll() {
    return `This action returns all coffeeRatings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coffeeRating`;
  }

  update(id: number, updateCoffeeRatingDto: UpdateCoffeeRatingDto) {
    return `This action updates a #${id} coffeeRating`;
  }

  remove(id: number) {
    return `This action removes a #${id} coffeeRating`;
  }
}
