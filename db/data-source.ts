import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  //RQ:in migrations we are dealing with js files,because TS is not getting used while these things are executed
  migrations: ['dist/db/migrations/*.js'], //TypeORM migrations need to work on compiled files,which Nest will output in the /dist
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
