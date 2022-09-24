import { Box, useTheme } from '@mui/material';

const FixedBackground = () => {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, width: 1, height: 1, zIndex: -1, lineHeight: 0 }}>
      <svg viewBox="0 0 960 540" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <g transform="translate(960, 0)">
          <path
            fill={theme.palette.background.main}
            fillOpacity="0.5"
            d="M0 482C-84.4 471.5 -168.9 461.1 -245 424.4C-321.1 387.6 -388.9 324.6 -432.1 249.5C-475.4 174.4 -494.2 87.2 -513 0L0 0Z"
          ></path>
          <path
            fill={theme.palette.background.main}
            fillOpacity="1"
            d="M0 241C-42.2 235.8 -84.4 230.5 -122.5 212.2C-160.6 193.8 -194.4 162.3 -216.1 124.8C-237.7 87.2 -247.1 43.6 -256.5 0L0 0Z"
          ></path>
        </g>
        <g transform="translate(0, 540)">
          <path
            fill={theme.palette.background.main}
            fillOpacity="0.5"
            d="M0 -512C90.9 -500.4 181.9 -488.7 256.5 -444.3C331.1 -399.8 389.4 -322.5 420.9 -243C452.4 -163.5 457.2 -81.7 462 0L0 0Z"
          ></path>
          <path
            fill={theme.palette.background.main}
            fillOpacity="1"
            d="M0 -256C45.5 -250.2 90.9 -244.4 128.2 -222.1C165.6 -199.9 194.7 -161.3 210.4 -121.5C226.2 -81.7 228.6 -40.9 231 0L0 0Z"
          ></path>
        </g>
      </svg>
    </Box>
  );
};

export default FixedBackground;
