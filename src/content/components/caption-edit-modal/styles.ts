// @/content/components/CaptionEditModal.styles.ts
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background-color: #fff;
  border-left: 1px solid #ccc;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
`;

export const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
`;

export const InputGroup = styled.div`
  margin-bottom: 12px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 6px 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Footer = styled.div`
  padding-top: 12px;
  border-top: 1px solid #eee;
`;

export const SaveButton = styled.button`
  width: 100%;
  padding: 8px;
  font-size: 14px;
  background-color: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
