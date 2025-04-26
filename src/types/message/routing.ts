import { MessageMap } from './definition';

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
