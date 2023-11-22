import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity/event.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = new this.coffeeModel(createCoffeeDto);
    return coffee.save();
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    try {
      const coffee = await this.coffeeModel.findOne({ _id: id }).exec();
      return coffee;
    } catch (error) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    try {
      const existingCoffee = await this.coffeeModel
        .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
        .exec();

      return existingCoffee;
    } catch (error) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return coffee.deleteOne();
  }

  /*To Achieve multiple actions to DB (ensuring they only happen if everything is successful) 
  ===> we will use Transaction */
  async recommendCoffe(coffee: Coffee) {
    //{{{
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
        coffee.recommendations++;

        const recommendEvent = new this.eventModel({
            name: "recommend_coffee",
            type: "coffee",
            payload: { coffeeId: coffee.id },
        });

        await recommendEvent.save({ session });
        await coffee.save({ session });

        await session.commitTransaction();
    } catch (err) {
        await session.abortTransaction();
    } finally {
        session.endSession();
    }
} //}}}
}
