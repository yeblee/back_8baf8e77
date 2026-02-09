export type MealType = '조식' | '중식' | '석식';

export class MealDietInfoDto {
  readonly meal_type: MealType;
  readonly meal_list: { name: string; allergies: number[] }[];
  readonly cal_info: string;
  readonly ntr_info: string[];
  readonly date: Date;

  constructor(args: MealDietInfoDto) {
    this.meal_type = args.meal_type;
    this.meal_list = args.meal_list;
    this.cal_info = args.cal_info;
    this.ntr_info = args.ntr_info;
    this.date = args.date;
  }
}
