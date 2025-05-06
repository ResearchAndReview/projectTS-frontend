import { KyResponse, Options, ResponsePromise } from 'ky';

export type APIErrorParams = [] | [string, number, KyResponse];

export type APIParams = {
  method?: Options['method'];
  url: string | string[];
  options?: Options;
  body?: Exclude<keyof ResponsePromise, keyof Promise<KyResponse>>;
};
