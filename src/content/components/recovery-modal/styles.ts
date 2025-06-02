// @/content/components/CaptionEditModal.styles.ts
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  z-index: 200;
  background-color: #fff;
  border-left: 1px solid #ccc;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  color: #000;
  font-size: 14px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 11px;
  right: 10px;
  user-select: none;
  border-radius: 100%;
  width: 32px;
  height: 32px;

  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #000;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }

  > svg {
    transform: translateY(2px);
  }
`;

export const Description = styled.div`
  margin: 4px 0 8px 0;
  box-sizing: border-box;
  color: #6a6a6a;
`;

export const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
`;

export const InputGroup = styled.div`
  margin-top: 12px;
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 6px 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  color: #000;
`;

export const Footer = styled.div`
  padding-top: 12px;
  border-top: 1px solid #eee;
`;

export const SaveButton = styled.button`
  width: 100%;
  padding: 8px;
  font-size: 14px;
  background-color: #7300ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
