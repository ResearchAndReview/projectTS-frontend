import { Rect } from '@/types';

type CropImage = (dataUrl: string, rect: Rect, dpr?: number) => Promise<Blob>;

export const cropImage: CropImage = (dataUrl, rect, dpr = window.devicePixelRatio) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = dataUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(
        img,
        rect.x * dpr,
        rect.y * dpr,
        rect.width * dpr,
        rect.height * dpr,
        0,
        0,
        rect.width * dpr,
        rect.height * dpr,
      );

      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        reject(new Error('cropImage: failed to create a blob.'));
      }, 'image/png');
    };
  });

export const afterPaint = (callback: () => void) => {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      callback();
    });
  });
};
