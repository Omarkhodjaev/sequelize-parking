import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './modules/user/user.module';
import { ParkModule } from './modules/park/park.module';
import { CarModule } from './modules/car/car.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2004',
      database: 'sequelize_project',
      models: [],
      synchronize: true,
      autoLoadModels: true,
    }),
    UserModule,
    ParkModule,
    CarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
