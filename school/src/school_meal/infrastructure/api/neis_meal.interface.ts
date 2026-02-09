import { ListEntity } from 'src/shared/list.entity';
import { NeisMealRowDto } from './dtos/neis_meal.dto';
import { ListNeisMealRequestQuery } from './requests/list-neis_meal.request-query';

export interface INeisMealApi {
  list(request: ListNeisMealRequestQuery): Promise<ListEntity<NeisMealRowDto>>;
}

export const INeisMealApi = 'INeisMealApi';
