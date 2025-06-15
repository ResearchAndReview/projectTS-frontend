import { Task } from '@/types';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1.0;
  }
  70% {
    transform: scale(2.5);
    opacity: 0;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
`;

const getColor = (status: Task['status'], opacity: number) => {
  switch (status) {
    case 'success':
      return `rgba(76, 175, 80, ${opacity})`;
    case 'pending':
      return `rgba(255, 225, 5, ${opacity})`;
    case 'error':
      return `rgba(244, 67, 54, ${opacity})`;
    default:
      return `rgba(128, 128, 128, ${opacity})`;
  }
};

export const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

export const ThumbnailImg = styled.img`
  width: 100px;
  height: auto;
  display: block;
  padding: 1px;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 0;
`;

export const Badge = styled.span<{ status: Task['status'] }>`
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 1;

  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ status }) => getColor(status, 1.0)};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    border-radius: 50%;

    background-color: ${({ status }) => getColor(status, 0.8)};

    animation: ${pulse} 1.5s ease-out infinite;
  }
`;
