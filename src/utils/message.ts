import { ExtractPayload, ExtractResponse, MessageType } from '@/types';

export const sendRuntimeMessage = async <T extends MessageType>({
  type,
  payload,
}: {
  type: T;
  payload: ExtractPayload<T>;
}): Promise<ExtractResponse<T>> => {
  const res = await chrome.runtime.sendMessage<
    { type: T; payload: ExtractPayload<T> },
    ExtractResponse<T>
  >({
    type,
    payload,
  });

  return res;
};
