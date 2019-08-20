import React, { FC } from 'react';
import MuiButton from '@material-ui/core/Button';

export type Props = {
  color?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

const TextButton: FC<Props> = ({
  children,
  color,
  size = `medium`,
  disabled,
  className,
  onClick,
}) => (
  <MuiButton
    variant={`text`}
    color={color}
    type={onClick ? `button` : `submit`}
    size={size}
    disabled={disabled}
    className={className}
    onClick={onClick}
  >
    {children}
  </MuiButton>
);

export default TextButton;
