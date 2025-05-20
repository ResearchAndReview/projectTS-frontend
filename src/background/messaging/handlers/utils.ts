import { RecoveryPayload } from '@/types';
import { TaskPollResponse } from '@/types/task/server';

export const DevCreateResponse = { success: true, data: { taskId: 'environment-development' } };

export const DevPollResponse = {
  success: true,
  data: {
    status: 'success',
    captions: [
      {
        id: 'random-id-1',
        rect: { x: 32, y: 32, width: 32, height: 32 },
        text: 'test 1',
        translation: '테스트 1',
      },
      {
        id: 'random-id-2',
        rect: { x: 32, y: 64, width: 32, height: 32 },
        text: 'test 2',
        translation: '테스트 2',
      },
      {
        id: 'random-id-3',
        rect: { x: 32, y: 96, width: 32, height: 32 },
        text: 'test 3',
        translation: '테스트 3',
      },
      {
        id: 'random-id-4',
        rect: { x: 32, y: 128, width: 32, height: 32 },
        text: 'test 4',
        translation: '테스트 4',
      },
    ],
    reason: undefined,
  },
};

export const taskResultsMapper = ({
  ocrResultId,
  transResultId,
  x,
  y,
  width,
  height,
  originalText,
  translatedText,
}: TaskPollResponse['taskResults'][number]) => ({
  id: `${ocrResultId},${transResultId}`,
  rect: { x, y, width, height },
  text: originalText,
  translation: translatedText,
});

export const retryTaskMapper = ({ id, text }: RecoveryPayload[number]) => {
  const [ocrResultId, transResultId] = id.split(',').map(Number);

  if (Number.isNaN(ocrResultId) || Number.isNaN(transResultId)) {
    throw new Error(`Unexpected id format: ${id}`);
  }

  return {
    ocrResultId,
    transResultId,
    originalText: text,
    translateFrom: 'ja-JP',
    translateTo: 'ko-KR',
  };
};
