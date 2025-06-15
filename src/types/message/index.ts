import { MessageMap } from './definition';

// CORE

/** Union of all message type keys. */
export type MessageType = keyof MessageMap;

/** Converts each message type into a full message object with `type` and `payload`. */
export type Message = {
  [K in MessageType]: {
    type: K;
    payload: MessageMap[K]['payload'];
  };
}[MessageType];

// ROUTING

/**
 * A union of message objects where meta.to matches T.
 * @example
 *   const msg: MessageTo<'content'> = {
 *     type: 'SCREENSHOT_DATA',
 *     payload: { rect: { ... }, dataUrl: '...' }
 *   };
 */
export type MessageTo<T extends string> = {
  [K in keyof MessageMap]: MessageMap[K]['meta']['to'] extends T
    ? {
        type: K;
        payload: MessageMap[K]['payload'];
      }
    : never;
}[keyof MessageMap];

/**
 * A map of handler functions for messages sent to T.
 * @example
 *   const handlers: MessageHandlerMapFor<'content'> = {
 *     SCREENSHOT_DATA: ({ rect, dataUrl }) => { ... },
 *     ENTER_DRAG_MODE: () => { ... }
 *   };
 */
export type MessageHandlerMapFor<T extends string> = {
  [K in keyof MessageMap as MessageMap[K]['meta']['to'] extends T
    ? K
    : never]: MessageMap[K]['payload'] extends undefined
    ? () => void
    : (payload: MessageMap[K]['payload']) => void;
};

// UTILITY

/** Extracts the payload type of a specific message type. */
export type ExtractPayload<T extends MessageType> = MessageMap[T]['payload'];

/** Extracts the meta info (from/to) of a specific message type. */
export type ExtractMeta<T extends MessageType> = MessageMap[T]['meta'];

/** Extracts the meta info (from/to) of a specific message type. */
export type ExtractResponse<T extends MessageType> = MessageMap[T]['response'];

/** Defines the handler function type for a specific message type. */
export type MessageHandler<T extends MessageType> =
  ExtractPayload<T> extends undefined ? () => void : (payload: ExtractPayload<T>) => void;

// RESPONSE

export type RuntimeResponse<T, E = unknown> =
  | { success: true; data: T }
  | { success: false; error: E };
