import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoffeeRatingsService } from './coffee-ratings.service';
import { CreateCoffeeRatingDto } from './dto/create-coffee-rating.dto';
import { UpdateCoffeeRatingDto } from './dto/update-coffee-rating.dto';

@Controller('coffee-ratings')
export class CoffeeRatingsController {
  constructor(private readonly coffeeRatingsService: CoffeeRatingsService) {}

  @Post()
  create(@Body() createCoffeeRatingDto: CreateCoffeeRatingDto) {
    return this.coffeeRatingsService.create(createCoffeeRatingDto);
  }

  @Get()
  findAll() {
    return this.coffeeRatingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeeRatingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeRatingDto: UpdateCoffeeRatingDto) {
    return this.coffeeRatingsService.update(+id, updateCoffeeRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeRatingsService.remove(+id);
  }
}
