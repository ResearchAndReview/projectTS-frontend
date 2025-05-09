import { sendRuntimeMessage } from '@/lib/utils';
import { Rect, Task, TaskPollResponse } from '@/types';

/**
 * Submits the cropped image and returns the created task ID.
 */
export const createTask = async (image: Task['image']) => {
  const { taskId } = await sendRuntimeMessage({
    type: 'CREATE_TASK',
    payload: { image },
  });

  return taskId;
};

/**
 * Poll a task specified by the taskId.
 */
export const pollTask = async (taskId: string): Promise<TaskPollResponse> => {
  const response = await sendRuntimeMessage({
    type: 'POLL_TASK',
    payload: { taskId },
  });

  return response;
};

/**
 * Requests a screenshot and crops it to the specified rect.
 */
export const requestScreenshot = async (rect: Rect) => {
  const { screenshot, zoom } = await sendRuntimeMessage({
    type: 'CAPTURE_SCREENSHOT',
    payload: { rect },
  });

  const cropped = await cropImage(screenshot, rect);
  const resized = await resizeImage(cropped, zoom);

  return resized;
};

/**
 * Crops a rectangular area from the given data URL image.
 *
 * @param dataUrl - The source image as a data URL (e.g., from a screenshot).
 * @param rect - The rectangular region to crop { x, y, width, height }.
 * @param dpr - (Optional) Device pixel ratio to handle high-DPI screens (defaults to window.devicePixelRatio).
 * @returns A Promise that resolves with the cropped image.
 */
const cropImage = (
  dataUrl: string,
  rect: Rect,
  dpr: number = window.devicePixelRatio,
): Promise<Task['image']> =>
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
        (rect.y - window.scrollY) * dpr,
        rect.width * dpr,
        rect.height * dpr,
        0,
        0,
        rect.width * dpr,
        rect.height * dpr,
      );

      try {
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl);
      } catch {
        reject(new Error('cropImage: failed to create a data URL.'));
      }
    };
  });

/**
 * Resizes the given DataURL image by the specified zoom percentage.
 *
 * @param image DataURL string of the image to resize.
 * @param zoomPercent The zoom percentage (e.g., 80 for 80% zoom).
 * @returns A new DataURL string of the resized image.
 */
export const resizeImage = (image: Task['image'], zoomPercent: number): Promise<Task['image']> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image;

    img.onload = () => {
      const scale = 100 / zoomPercent;
      const newWidth = img.width * scale;
      const newHeight = img.height * scale;

      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;

      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      try {
        const resizedDataUrl = canvas.toDataURL('image/png');
        resolve(resizedDataUrl);
      } catch {
        reject(new Error('resizeImage: failed to create a data URL.'));
      }
    };

    img.onerror = () => {
      reject(new Error('resizeImage: failed to load image.'));
    };
  });

/**
 * Defers execution of a callback until after the next paint.
 *
 * This calls requestAnimationFrame twice to ensure that
 * the callback runs after the browser has painted any pending changes.
 *
 * Useful when you need to wait for the DOM to update visually
 * before performing a heavy operation (e.g., taking a screenshot).
 *
 * @param callback - The function to execute after painting.
 */
export const afterPaint = (callback: () => void) => {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      callback();
    });
  });
};
