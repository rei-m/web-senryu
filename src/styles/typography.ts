import Typography from 'typography';
import { theme } from './theme';

const typography = new Typography({
  baseLineHeight: 1.28581,
  bodyFontFamily: [
    'Roboto',
    'Hiragino Kaku Gothic ProN',
    'Meiryo',
    'sans-serif',
  ],
  bodyWeight: 400,
  bodyColor: '#182026',
  overrideStyles: (_verticalRhythm, _options) => ({
    html: {
      fontSize: '62.5%',
    },
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    body: {
      fontSize: theme.fontSize.m,
      color: theme.palette.text.primary,
      textAlign: 'center',
      textTransform: 'none',
      letterSpacing: 0,
    },
    p: {
      margin: 0,
    },
    ul: {
      margin: 0,
    },
    li: {
      listStyle: 'none',
    },
    strong: {
      fontWeight: 600,
    },
    '::-moz-selection': {
      background: 'rgba(125, 188, 255, 0.6)',
    },
    '::selection': {
      background: 'rgba(125, 188, 255, 0.6)',
    },
    a: {
      textDecoration: 'none',
      color: theme.palette.primary.dark,
    },
    'a:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
    ':focus': {
      outline: 'rgba(19, 124, 189, 0.6) auto 2px',
      outlineOffset: '2px',
      '-moz-outline-radius': '6px',
    },
  }),
});

export default typography;
