import { Controller, Get, Query } from '@nestjs/common';
import { SchoolMealService } from './school_meal.service';
import { GetMonthlyAllergyRequestQuery } from './requests/list-monthly_allergry_meal.request-query';
import { GetMonthlyAllergyInputCommand } from './commands/get-monthly_allergry_meal.input-command';

@Controller('school_meal')
export class SchoolMealController {
  constructor(private readonly _schoolMealService: SchoolMealService) {}

  @Get('/')
  async GetMonthlyAllergyMeal(@Query() query: GetMonthlyAllergyRequestQuery) {
    const command = new GetMonthlyAllergyInputCommand(query);
    const result = await this._schoolMealService.getMonthlyAllergyMeals(
      command,
    );

    return result;
  }
}
