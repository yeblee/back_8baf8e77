import { DynamicModule, Global, Module } from '@nestjs/common';
import { INeisMealApi } from './api/neis_meal.interface';
import { NeisMealApi } from './api/neis_meal.api';
import { BaseApi } from 'src/shared/base.api';

@Global()
@Module({})
export class NeisMealApiModule {
  static async forRoot(): Promise<DynamicModule> {
    return {
      module: NeisMealApiModule,
      imports: [],
      providers: [BaseApi, { provide: INeisMealApi, useClass: NeisMealApi }],
      exports: [{ provide: INeisMealApi, useClass: NeisMealApi }],
    };
  }
}
