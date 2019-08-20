import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTheme } from '@material-ui/core';

export type Props = {
  size?: number;
  color?: string;
};

const Progress = ({ size = 64, color }: Props) => (
  <CircularProgress
    size={size}
    style={{ color: color ? color : useTheme().palette.primary.main }}
  />
);

export default Progress;
