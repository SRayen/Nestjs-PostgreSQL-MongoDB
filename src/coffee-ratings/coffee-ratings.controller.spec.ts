import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeRatingsController } from './coffee-ratings.controller';
import { CoffeeRatingsService } from './coffee-ratings.service';

describe('CoffeeRatingsController', () => {
  let controller: CoffeeRatingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeeRatingsController],
      providers: [CoffeeRatingsService],
    }).compile();

    controller = module.get<CoffeeRatingsController>(CoffeeRatingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
