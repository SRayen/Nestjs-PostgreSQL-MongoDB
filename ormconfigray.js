const { DataSource } = require('typeorm');

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migration/*.js'], //TypeORM migrations need to work on compiled files,which Nest will output in the /dist
  cli: {
    migrationsDir: 'src/migrations',
  },
});

dataSource.initialize();

module.exports = { dataSource };
