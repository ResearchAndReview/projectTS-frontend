import ky, { HTTPError } from 'ky';
import { getNodeId } from '@/background/node';
import { APIError } from './error';
import { APIParams } from './types';

const instance = ky.create({ prefixUrl: 'https://js.thxx.xyz' });

/**
 * Makes an HTTP request to the specified API endpoint.
 *
 * @template T The expected response type.
 * @returns The response data in the specified type `T`.
 * @throws An `APIError` if the request encounters an HTTP error or an unknown error.
 */
export const api = async <T>({
  method = 'get',
  url,
  options,
  body = 'json',
}: APIParams): Promise<T> => {
  const joinedUrl = typeof url === 'string' ? url : url.join('/');
  const token = await getNodeId();

  try {
    const response = instance<T>(joinedUrl, {
      method,
      ...options,
      headers: { 'x-uuid': token, ...options?.headers },
    });
    const data = await (response[body] as () => Promise<T>)();
    return data;
  } catch (err) {
    // TODO : 에러 로그 생성
    if (err instanceof HTTPError) {
      throw new APIError('HTTP Error occurred.', err.response.status, err.response);
    }
    throw new APIError();
  }
};
