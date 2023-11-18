import {
  Body,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';

import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';
import * as request from 'supertest';
import { UpdateCoffeeDto } from 'src/coffees/dto/update-coffee.dto';

describe('[Feaute] Coffees - /coffees', () => {
  let app: INestApplication;
  const coffee = {
    name: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  };

  const expectedPartialCoffee = expect.objectContaining({
    ...coffee,
    flavors: expect.arrayContaining(
      coffee.flavors.map((name) => expect.objectContaining({ name })),
    ),
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'postgres',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        //ValidationPipe will implicitly convert primitive types to the types that are defined in your DTOs
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    await app.init();
  });

  it('Create POST', () => {
    return request(app.getHttpServer()) //creates a SuperTest instance to simulate an HTTP request
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialCoffee);
      });
  });
  
  it('Get all [GET /]', () => {
    return request(app.getHttpServer())
      .get('/coffees/')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body.length).toBeGreaterThan(0);
        expect(body[0]).toEqual(expectedPartialCoffee);
        console.log('===>', body);
      });
  });

  it('Create [GET /:id]', () => {
    return request(app.getHttpServer())
      .get('/coffees/1')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialCoffee);
      });
  });

  it('Update one [PATCH /:id]', () => {
    const updatedCoffee = {
      ...coffee,
      name: 'SRayen Coffee',
    };

    return request(app.getHttpServer())
      .patch('/coffees/1')
      .send(updatedCoffee as UpdateCoffeeDto)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body.name).toEqual(updatedCoffee.name);
      });
  });

  it('Delete One [DELETE /:id]', () => {
    return request(app.getHttpServer())
      .delete('/coffees/1')
      .expect(HttpStatus.OK)
      .then(() => {
        return request(app.getHttpServer())
          .get('/coffees/1')
          .expect(HttpStatus.NOT_FOUND);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
