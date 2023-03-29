export const base = {
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        '.plyr': {
          '--plyr-color-main': theme.palette.primary.main,
        },

        '.plyr__caption': {
          background: 'none',
          fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
          fontSize: '22px',
          fontWeight: '600',
          textShadow: '-1px -1px #000, 1px -1px #000, -1px 1px #000, 1px 1px #000, 0 0 0.5rem #000',
        },
      }),
    },
  },
};
