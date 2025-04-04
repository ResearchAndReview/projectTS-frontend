export const mockTranslate = (cropped: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cropped);
    }, 500);
  });
};
