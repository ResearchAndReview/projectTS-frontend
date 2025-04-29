import styled from '@emotion/styled';

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  font-size: 13px;

  padding: 24px 24px;
  background-color: #f6f7f9;
  color: #718096;
`;

export const Footer = () => (
  <Wrapper>
    <span>comutrans (version 0.0.1)</span>
    <span>&copy; Team Research & Review.</span>
  </Wrapper>
);
