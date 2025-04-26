const dummyCaptions = [
  {
    id: '1',
    rect: { x: 395, y: 60, width: 40, height: 160 },
    text: 'さっきまで ピーマンだったのに',
    translation: '방금 전까진 피망이었는데',
  },
  {
    id: '2',
    rect: { x: 310, y: 60, width: 50, height: 180 },
    text: 'スプーンに 謝らなきゃ...',
    translation: '숟가락에게 사과해야 해...',
  },
  {
    id: '3',
    rect: { x: 30, y: 50, width: 60, height: 225 },
    text: 'その傘、 たべものだよ？',
    translation: '그 우산, 먹는 거야?',
  },
  {
    id: '4',
    rect: { x: 333, y: 300, width: 100, height: 160 },
    text: 'でも海老は まだ知らない',
    translation: '하지만 새우는 아직 모르고 있어',
  },
];

export const fetchDummy = (
  imageString: string,
): Promise<{ status: 'success'; captions: typeof dummyCaptions }> => {
  if (imageString.length === 1) console.log(imageString);

  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        status: 'success' as const,
        captions: dummyCaptions,
      };

      resolve(response);
    }, 1500); // 1.5초 딜레이
  });
};
