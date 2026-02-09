export class ListNeisMealRequestQuery {
  readonly data: {
    readonly Type: 'json' | 'xml';
    readonly pIndex: number;
    readonly pSize: number;
    readonly ATPT_OFCDC_SC_CODE: string;
    readonly SD_SCHUL_CODE: string;
    readonly MMEAL_SC_CODE?: string;
    readonly MLSV_YMD?: string;
    readonly MLSV_FROM_YMD?: string;
    readonly MLSV_TO_YMD?: string;
  };

  constructor(args: ListNeisMealRequestQuery) {
    this.data = {
      Type: args.data.Type,
      pIndex: args.data.pIndex,
      pSize: args.data.pSize,
      ATPT_OFCDC_SC_CODE: args.data.ATPT_OFCDC_SC_CODE,
      SD_SCHUL_CODE: args.data.SD_SCHUL_CODE,
      MMEAL_SC_CODE: args.data.MMEAL_SC_CODE,
      MLSV_YMD: args.data.MLSV_YMD,
      MLSV_FROM_YMD: args.data.MLSV_FROM_YMD,
      MLSV_TO_YMD: args.data.MLSV_TO_YMD,
    };
  }
}
