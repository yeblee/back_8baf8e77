import { EAllergyID } from './get-monthly_allergry_meal.input-command';
import { MealDietInfoDto } from './meal_diet_info.dto';

export class MonthlyAllergyOutputCommand {
  readonly allergy_id: EAllergyID[];
  readonly schul_id: string;
  readonly schul_nm: string;
  readonly mlsv_ym: string;
  readonly data: MealDietInfoDto[];
  readonly totalCount: number;
  readonly page: number;
  readonly limit: number;

  constructor(args: MonthlyAllergyOutputCommand) {
    this.allergy_id = args.allergy_id;
    this.schul_nm = args.schul_nm;
    this.mlsv_ym = args.mlsv_ym;
    this.data = args.data;
    this.totalCount = args.totalCount;
    this.page = args.page;
    this.limit = args.limit;
  }
}
