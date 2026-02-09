import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsString, Matches } from 'class-validator';
import { EAllergyID } from '../commands/get-monthly_allergry_meal.input-command';

export class GetMonthlyAllergyRequestQuery {
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value.map(Number);
    if (typeof value === 'string' && value.includes(','))
      return value.split(',').map(Number);
    return [Number(value)];
  })
  @IsEnum(EAllergyID, { each: true })
  allergy_id: EAllergyID[];

  @IsString()
  atpt_ofcdc_sc_code: string;

  @IsString()
  sd_schul_code: string;

  @Matches(/^20\d{2}(0[1-9]|1[0-2])$/, {
    message:
      'mlsv_ym은 YYYYMM 형식이어야 하며, 유효한 연도와 월을 입력해야 합니다. (예: 202503)',
  })
  @IsString()
  mlsv_ym: string;

  @IsInt()
  page: number;

  @IsInt()
  limit: number;
}
