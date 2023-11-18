import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migration/*.js'], //TypeORM migrations need to work on compiled files,which Nest will output in the /dist
  synchronize: true,
  logging: false,
});

export default AppDataSource;
