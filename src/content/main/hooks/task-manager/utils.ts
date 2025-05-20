import { sendRuntimeMessage } from '@/lib/utils';
import { RecoveryPayload, Rect, Task, TaskPollResponse } from '@/types';

/**
 * Submits the cropped image and returns the created task ID.
 */
export const createTask = async (image: Task['image']) => {
  const response = await sendRuntimeMessage({
    type: 'CREATE_TASK',
    payload: { image },
  });

  if (response.success) return response.data.taskId;

  throw response.error;
};

/**
 * Poll a task specified by the taskId.
 */
export const pollTask = async (taskId: string): Promise<TaskPollResponse> => {
  const response = await sendRuntimeMessage({
    type: 'POLL_TASK',
    payload: { taskId },
  });

  if (response.success) return response.data;

  throw response.error;
};

/**
 * Submits task recovery request and returns the task ID back.
 */
export const retryTranslation = async (data: RecoveryPayload) => {
  const response = await sendRuntimeMessage({
    type: 'RETRY_TASK',
    payload: { data },
  });

  if (response.success) return response.data.message;

  throw response.error;
};

/**
 * Requests a screenshot and crops it to the specified rect.
 */
export const requestScreenshot = async (rect: Rect) => {
  const response = await sendRuntimeMessage({
    type: 'CAPTURE_SCREENSHOT',
    payload: { rect },
  });

  if (response.success) {
    const { screenshot, zoom } = response.data;
    return await cropAndResizeImage(screenshot, rect, zoom);
  }

  throw response.error;
};

/**
 * Crops and resizes a rectangular region from the given image in one step.
 *
 * @param dataUrl - The source image as a data URL (e.g., from a screenshot).
 * @param rect - The rectangular region to crop { x, y, width, height }.
 * @param zoomPercent - The zoom percentage (e.g., 80 means scale up to 125%).
 * @param dpr - (Optional) Device pixel ratio (default = window.devicePixelRatio).
 * @returns A Promise that resolves to the final resized image (as data URL).
 */
export const cropAndResizeImage = (
  dataUrl: string,
  rect: Rect,
  zoomPercent: number,
  dpr: number = window.devicePixelRatio,
): Promise<Task['image']> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = dataUrl;

    img.onload = () => {
      const scale = 100 / zoomPercent;

      const canvas = document.createElement('canvas');
      canvas.width = rect.width * scale; // should ignore dpr
      canvas.height = rect.height * scale;

      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(
        img,
        rect.x * dpr,
        (rect.y - window.scrollY) * dpr,
        rect.width * dpr,
        rect.height * dpr,
        0,
        0,
        canvas.width,
        canvas.height,
      );

      try {
        const resizedDataUrl = canvas.toDataURL('image/png');
        resolve(resizedDataUrl);
      } catch {
        reject(new Error('cropAndResizeImage: failed to create a data URL.'));
      }
    };

    img.onerror = () => {
      reject(new Error('cropAndResizeImage: failed to load image.'));
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
