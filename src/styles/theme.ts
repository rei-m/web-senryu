import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import createPalette from '@material-ui/core/styles/createPalette';

export type FontSize = 'sss' | 'ss' | 's' | 'm' | 'l' | 'll';

const palette = createPalette({
  primary: {
    light: '#fff350',
    main: '#ffc107',
    dark: '#c79100',
    contrastText: '#4a4a4a',
  },
  secondary: {
    light: '#9c786c',
    main: '#6d4c41',
    dark: '#40241a',
    contrastText: '#fff',
  },
});

export const appTheme = {
  fontSize: {
    sss: '1rem',
    ss: '1.2rem',
    s: '1.4rem',
    m: '1.6rem',
    l: '1.8rem',
    ll: '2rem',
  },
};

export const muiTheme = createMuiTheme({
  palette: palette,
  overrides: {
    MuiTypography: {
      body1: {
        fontSize: appTheme.fontSize.m,
      },
      body2: {
        fontSize: appTheme.fontSize.s,
      },
    },
    MuiButton: {
      root: {
        fontSize: appTheme.fontSize.m,
        textTransform: 'none',
      },
      sizeSmall: {
        fontSize: appTheme.fontSize.s,
      },
      sizeLarge: {
        fontSize: appTheme.fontSize.l,
      },
      outlined: {
        color: palette.text.primary,
        backgroundColor: palette.grey[100],
      },
      outlinedPrimary: {
        color: palette.primary.contrastText,
        backgroundColor: palette.primary.light,
        borderColor: palette.primary.main,
        '&:active': {
          borderColor: palette.primary.dark,
          backgroundColor: palette.primary.dark,
        },
        '&:hover': {
          borderColor: palette.primary.dark,
          backgroundColor: palette.primary.dark,
        },
      },
      outlinedSecondary: {
        color: palette.secondary.contrastText,
        backgroundColor: palette.secondary.light,
        borderColor: palette.secondary.main,
        '&:active': {
          borderColor: palette.secondary.dark,
          backgroundColor: palette.secondary.dark,
        },
        '&:hover': {
          borderColor: palette.secondary.dark,
          backgroundColor: palette.secondary.dark,
        },
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: 'inherit',
      },
    },
    MuiFormControl: {
      root: {
        fontSize: appTheme.fontSize.m,
      },
    },
    MuiInputBase: {
      root: {
        fontSize: appTheme.fontSize.m,
      },
    },
    MuiFormHelperText: {
      root: {
        fontSize: appTheme.fontSize.sss,
      },
    },
    MuiPaper: {
      root: {
        textAlign: 'left',
      },
    },
  },
  props: {
    MuiTextField: {
      variant: `outlined`,
    },
    MuiButton: {
      variant: `outlined`,
    },
    MuiSvgIcon: {
      fontSize: `large`,
    },
  },
});

export const theme = {
  ...appTheme,
  ...muiTheme,
};

export type ThemeInterface = typeof theme;
