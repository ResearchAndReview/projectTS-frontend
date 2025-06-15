import { ExtractPayload, ExtractResponse, MessageType, RuntimeResponse } from '@/types';

export const sendRuntimeMessage = async <T extends MessageType>({
  type,
  payload,
}: {
  type: T;
  payload: ExtractPayload<T>;
}): Promise<RuntimeResponse<ExtractResponse<T>>> => {
  return chrome.runtime.sendMessage<
    { type: T; payload: ExtractPayload<T> },
    RuntimeResponse<ExtractResponse<T>>
  >({
    type,
    payload,
  });
};

export const sendTabMessage = async <T extends MessageType>(
  tabId: number,
  message: {
    type: T;
    payload: ExtractPayload<T>;
  },
): Promise<ExtractResponse<T>> => {
  return chrome.tabs.sendMessage(tabId, message);
};
