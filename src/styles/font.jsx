import { styled } from 'styled-components';
import { theme } from './theme';

export const Title = styled.span`
  font-weight: ${({ weight }) => (weight ? weight : 600)};
  font-size: ${({ size }) => (size ? size : '2rem')}; // 20px
  color: ${({ color }) => (color ? color : theme.colors.black)};
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 30px */
`;

export const CustomFont = styled.span`
  font-weight: ${({ weight }) => (weight ? weight : 500)};
  font-size: ${({ size }) => (size ? size : '1.2rem')}; // 12px
  color: ${({ color }) => (color ? color : theme.colors.black)};
  font-style: normal;
  white-space: nowrap;
  font-weight: 500;
  line-height: 16px; /* 133.333% */
`;

export const Body = styled.span`
  font-weight: ${({ weight }) => (weight ? weight : 500)};
  font-size: ${({ size }) => (size ? size : '1.6rem')}; // 16px
  color: ${({ color }) => (color ? color : theme.colors.black)};

  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 25.6px */
`;

export const ButtonText = styled.span`
  font-weight: ${({ weight }) => (weight ? weight : 500)};
  font-size: ${({ size }) => (size ? size : '1.6rem')}; // 16px

  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 25.6px */
`;
