import { RecoveryPayload } from '@/types';
import { TaskPollResponse } from '@/types/task/server';

export const DevCreateResponse = { success: true, data: { taskId: 'environment-development' } };

export const DevPollResponse = {
  success: true,
  data: {
    status: 'success',
    captions: [
      {
        id: 'cap-1',
        rect: { x: 48, y: 62, width: 180, height: 32 },
        text: 'この文章を翻訳してください。',
        translation: '이 문장을 번역해주세요.',
      },
      {
        id: 'cap-2',
        rect: { x: 240, y: 64, width: 140, height: 32 },
        text: '簡単なテストです。',
        translation: '간단한 테스트입니다.',
      },
      {
        id: 'cap-3',
        rect: { x: 52, y: 110, width: 32, height: 210 },
        text: '翻訳された内容をここに表示します。',
        translation: '번역된 내용을 여기에 표시합니다.',
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
