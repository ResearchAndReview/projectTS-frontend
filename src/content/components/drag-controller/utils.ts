import { Rect } from '@/types';

export const isRectBigEnough = (rect: Rect) => rect.width > 48 && rect.height > 48;

export const getBorderColor = (rect: Rect) => (isRectBigEnough(rect) ? '#7300ff' : '#b9b9b9');

export const getBackgroundColor = (rect: Rect) =>
  isRectBigEnough(rect) ? 'rgba(66, 165, 245, 0.15)' : 'rgba(180, 216, 246, 0.15)';
