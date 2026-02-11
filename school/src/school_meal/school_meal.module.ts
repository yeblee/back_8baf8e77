import { DynamicModule, Module } from '@nestjs/common';
import { SchoolMealController } from './application/school_meal.controller';
import { SchoolMealService } from './application/school_meal.service';
import { NeisMealApiModule } from './infrastructure/neis_meal.module';

@Module({})
export class SchoolMealModule {
  static forRoot(): DynamicModule {
    return {
      module: SchoolMealModule,
      controllers: [SchoolMealController],
      providers: [SchoolMealService],
      exports: [SchoolMealService],
      imports: [NeisMealApiModule.forRoot()],
    };
  }
}
