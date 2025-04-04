import styled from '@emotion/styled';

const Container = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  background-color: white;
  color: black;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 2147483646;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TaskLink = styled.a`
  width: 100%;
  display: block;
  margin-bottom: 8px;
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
  }
`;

const openBase64InNewTab = (base64: string, mimeType = 'image/png') => {
  // base64 디코드
  const byteString = atob(base64.split(',')[1]);
  const byteArray = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  // Blob 생성
  const blob = new Blob([byteArray], { type: mimeType });

  // Object URL 만들고 새 탭에서 열기
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, '_blank');

  // cleanup은 나중에 window unload 시 등에서 가능 (선택)
  // setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
};

export const DummyMessage = ({ tasks }: { tasks: string[] }) => {
  if (tasks.length === 0) return null;

  return (
    <Container>
      {tasks.map((task) => (
        <TaskLink
          key={task}
          onClick={() => openBase64InNewTab(task, 'image/png')}
        >
          {task.slice(task.indexOf(','))}
        </TaskLink>
      ))}
    </Container>
  );
};
