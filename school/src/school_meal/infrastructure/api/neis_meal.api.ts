import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseApi } from 'src/shared/base.api';
import { ListNeisMealRequestQuery } from './requests/list-neis_meal.request-query';
import { ListEntity } from 'src/shared/list.entity';
import { NeisMealRowDto } from './dtos/neis_meal.dto';
import { INeisMealApi } from './neis_meal.interface';

@Injectable()
export class NeisMealApi implements INeisMealApi {
  private readonly _NEIS_URL: string;
  private readonly _api_kind = 'mealServiceDietInfo';

  constructor(
    private readonly _configService: ConfigService,
    private readonly _api: BaseApi,
  ) {
    const baseUrl = this._configService.get<string>('NEIS_BASE_URL');
    this._NEIS_URL = `${baseUrl}/${this._api_kind}`;
  }

  private _getKey() {
    const key = String(this._configService.get('NEIS_API_KEY'));

    return key;
  }

  async list(
    request: ListNeisMealRequestQuery,
  ): Promise<ListEntity<NeisMealRowDto>> {
    const mealDietInfos = await this._api.get({
      api_kind: this._api_kind,
      url: this._NEIS_URL,
      params: { KEY: this._getKey(), ...request.data },
    });

    const infoArray = mealDietInfos.mealServiceDietInfo;

    const head = infoArray?.[0]?.head || [];
    const rows = infoArray?.[1]?.row || [];

    const totalCount = head[0]?.list_total_count || 0;
    const resultErrorCode = mealDietInfos.RESULT?.CODE;
    const resultMessage = mealDietInfos.RESULT?.MESSAGE;

    if (resultErrorCode === 'INFO-200') {
      return new ListEntity({ data: [], totalCount: 0 });
    }

    if (resultErrorCode && resultErrorCode.startsWith('ERROR')) {
      throw new InternalServerErrorException(`[NEIS ERROR] ${resultMessage}`);
    }

    if (resultErrorCode === 'INFO-300') {
      throw new BadRequestException(`[NEIS INFO-300] ${resultMessage}`);
    }

    return new ListEntity({
      data: rows.map((mdi) => this._toModel(mdi)),
      totalCount: totalCount,
    });
  }

  private _toModel(from): NeisMealRowDto {
    return new NeisMealRowDto(from);
  }
}
