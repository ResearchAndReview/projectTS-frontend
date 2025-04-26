import { MessageMap } from './definition';

/** Union of all message type keys. */
export type MessageType = keyof MessageMap;

/** Converts each message type into a full message object with `type` and `payload`. */
export type Message = {
  [K in MessageType]: {
    type: K;
    payload: MessageMap[K]['payload'];
  };
}[MessageType];

/** Extracts the payload type of a specific message type. */
export type ExtractPayload<T extends MessageType> = MessageMap[T]['payload'];

/** Extracts the meta info (from/to) of a specific message type. */
export type ExtractMeta<T extends MessageType> = MessageMap[T]['meta'];

/** Defines the handler function type for a specific message type. */
export type MessageHandler<T extends MessageType> =
  ExtractPayload<T> extends undefined ? () => void : (payload: ExtractPayload<T>) => void;
