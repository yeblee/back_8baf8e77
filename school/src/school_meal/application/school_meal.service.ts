import { Inject, Injectable } from '@nestjs/common';
import { GetMonthlyAllergyInputCommand } from './commands/get-monthly_allergry_meal.input-command';
import { INeisMealApi } from '../infrastructure/api/neis_meal.interface';
import { MonthlyAllergyOutputCommand } from './commands/mothly_allergry_meal.output-command';
import { MealDietInfoDto } from './commands/meal_diet_info.dto';
import type { MealType } from './commands/meal_diet_info.dto';

@Injectable()
export class SchoolMealService {
  constructor(
    @Inject(INeisMealApi)
    private readonly _neisMealApi: INeisMealApi,
  ) {}

  async getMonthlyAllergyMeals(command: GetMonthlyAllergyInputCommand) {
    const mealCodes = ['1', '2', '3'];

    const mealAllResults = await Promise.all(
      mealCodes.map((code) =>
        this._neisMealApi.list({
          data: {
            Type: 'json',
            pIndex: 1,
            pSize: 100,
            ATPT_OFCDC_SC_CODE: command.atpt_ofcdc_sc_code,
            SD_SCHUL_CODE: command.sd_schul_code,
            MLSV_YMD: command.mlsv_ym,
            MMEAL_SC_CODE: code, // 조, 중, 석 각각 요청
          },
        }),
      ),
    );

    const allMeals = mealAllResults.flatMap((res) => res.data);

    const filterRows = allMeals.filter((item) => {
      if (!item.ddish_nm) return false;
      const allergiesInMenu: string[] = item.ddish_nm.match(/\d+/g) || [];

      return command.allergy_id.some((id) =>
        allergiesInMenu.includes(String(id)),
      );
    });

    // 날짜순 -> 식단코드순(조중석)으로 정렬
    filterRows.sort((a, b) => {
      if (a.mlsv_ymd !== b.mlsv_ymd)
        return a.mlsv_ymd.localeCompare(b.mlsv_ymd);
      return a.mmeal_sc_code.localeCompare(b.mmeal_sc_code);
    });

    const totalCount = filterRows.length;
    const start = (command.page - 1) * command.limit;
    const end = start + command.limit;

    const pagedRows = filterRows.slice(start, end);

    const schoolName =
      filterRows.length > 0 ? filterRows[0].schul_nm : '학교 정보 없음';

    const formattedData: MealDietInfoDto[] = pagedRows.map((row) => {
      const rawMenus = row.ddish_nm.split('<br/>');

      const meal_list = rawMenus.map((menu) => {
        const allergyMatch = menu.match(/\(([^)]+)\)\s*$/);
        const allergyPart = allergyMatch ? allergyMatch[1] : '';
        const allergies = allergyPart.match(/\d+/g)?.map(Number) || [];
        const name = menu.replace(/\s*\([^)]*\)\s*/g, '').trim();

        return { name, allergies };
      });

      return {
        meal_type: row.mmeal_sc_nm as MealType,
        meal_list: meal_list,
        cal_info: row.cal_info,
        ntr_info: row.ntr_info.split('<br/>'),
        date: new Date(
          row.mlsv_ymd.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
        ),
      };
    });

    return new MonthlyAllergyOutputCommand({
      allergy_id: command.allergy_id,
      schul_id: command.sd_schul_code,
      schul_nm: schoolName,
      mlsv_ym: command.mlsv_ym,
      data: formattedData,
      totalCount: totalCount,
      page: command.page,
      limit: command.limit,
    });
  }
}
