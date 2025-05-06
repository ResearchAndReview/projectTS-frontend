import { KyResponse } from 'ky';
import { APIErrorParams } from './types';

export class APIError extends Error {
  public status: number;
  public response: KyResponse;

  constructor(...args: APIErrorParams) {
    const [message, status, response] = args;

    super(message ?? 'Unknown Error');

    this.status = status ?? 520;
    this.response =
      response ??
      (new Response(null, { status: this.status, statusText: this.message }) as KyResponse);

    Object.setPrototypeOf(this, APIError.prototype);
  }
}
