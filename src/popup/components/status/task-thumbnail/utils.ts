import toast from 'react-hot-toast';

export const openImage = (image: string) => {
  try {
    const newWindow = window.open();
    if (!newWindow) throw new Error('새 탭을 열 수 없습니다.');

    const iframe = document.createElement('iframe');
    iframe.src = image;
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.bottom = '0';
    iframe.style.right = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    newWindow.document.body.style.margin = '0';
    newWindow.document.body.appendChild(iframe);
  } catch (error) {
    const errStr = String(error);
    toast.error(errStr.length === 0 ? '알 수 없는 오류가 발생했습니다.' : errStr);
  }
};
