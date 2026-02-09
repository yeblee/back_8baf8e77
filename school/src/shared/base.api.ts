import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BaseApi {
  async get({
    api_kind,
    url,
    params,
  }: {
    api_kind: string;
    url: string;
    params: any;
  }) {
    try {
      const result = await axios.get(url, { params });

      return result.data;
    } catch (err) {
      throw new Error();
    }
  }
}
