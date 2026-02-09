export class NeisMealRowDto {
  readonly atpt_ofcdc_sc_code: string;
  readonly atpt_ofcdc_sc_nm: string;
  readonly sd_schul_code: string;
  readonly schul_nm: string;
  readonly mmeal_sc_code: string;
  readonly mmeal_sc_nm: string;
  readonly mlsv_ymd: string;
  readonly mlsv_fgr: number;
  readonly ddish_nm: string;
  readonly orplc_info: string;
  readonly cal_info: string;
  readonly ntr_info: string;
  readonly mlsv_from_ymd: string;
  readonly mlsv_to_ymd: string;
  readonly load_dtm: string;

  constructor(args: {
    ATPT_OFCDC_SC_CODE: string;
    ATPT_OFCDC_SC_NM: string;
    SD_SCHUL_CODE: string;
    SCHUL_NM: string;
    MMEAL_SC_CODE: string;
    MMEAL_SC_NM: string;
    MLSV_YMD: string;
    MLSV_FGR: number;
    DDISH_NM: string;
    ORPLC_INFO: string;
    CAL_INFO: string;
    NTR_INFO: string;
    MLSV_FROM_YMD: string;
    MLSV_TO_YMD: string;
    LOAD_DTM: string;
  }) {
    this.atpt_ofcdc_sc_code = args.ATPT_OFCDC_SC_CODE;
    this.atpt_ofcdc_sc_nm = args.ATPT_OFCDC_SC_NM;
    this.sd_schul_code = args.SD_SCHUL_CODE;
    this.schul_nm = args.SCHUL_NM;
    this.mmeal_sc_code = args.MMEAL_SC_CODE;
    this.mmeal_sc_nm = args.MMEAL_SC_NM;
    this.mlsv_ymd = args.MLSV_YMD;
    this.mlsv_fgr = args.MLSV_FGR;
    this.ddish_nm = args.DDISH_NM;
    this.orplc_info = args.ORPLC_INFO;
    this.cal_info = args.CAL_INFO;
    this.ntr_info = args.NTR_INFO;
    this.mlsv_from_ymd = args.MLSV_FROM_YMD;
    this.mlsv_to_ymd = args.MLSV_TO_YMD;
    this.load_dtm = args.LOAD_DTM;
  }
}
