import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeRatingDto } from './create-coffee-rating.dto';

export class UpdateCoffeeRatingDto extends PartialType(CreateCoffeeRatingDto) {}
