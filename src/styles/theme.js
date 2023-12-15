import { css } from 'styled-components';

export const theme = {
  colors: {
    p100: '#edf2ff',
    p200: '#d0ebff',
    p300: '#a5d8ff',
    p400: '#91A7FF',
    p500: '#748FFC',
    p600: '#5C7CFA',
    p700: '#4c6ef5',
    p800: '#4263eb',

    white: '#ffffff',
    black: '#212529',
    green: '#a9e34b',
    yellow: '#FFE066',
    red: '#e03131',

    gray100: '#F1F3F5',
    gray200: '#E9ECEF',
    gray300: '#DEE2E6',
    gray400: '#CED4DA',
    gray500: '#ADB5BD',
    gray600: '#868E96',
    gray700: '#495057',

    gs100: 'rgba(222, 226, 230, 0.20)',
    gs200: 'rgba(206, 212, 218, 0.40)',
    gs300: 'rgba(173, 181, 189, 0.40)',
    gs400: 'rgba(134, 142, 150, 0.60)',
    gs500: 'rgba(73, 80, 87, 0.80)',
  },
  fontSize: {
    title700: '2.5rem',
    title500: '2.5rem',
    title300: '2.5rem',
    body700: '2rem',
    body500: '2rem',
    body300: '2rem',
    button: '2.25rem',
  },
  fontWeight: {
    title700: '700',
    title500: '500',
    title300: '300',
    body700: '700',
    body500: '500',
    body300: '300',
    button: '400',
  },
  lineHeight: {
    title700: '80%',
    title500: '80%',
    title300: '80%',
    body700: '90%',
    body500: '90%',
    body300: '90%',
    button: '150%',
  },
};

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexColumnCenter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
