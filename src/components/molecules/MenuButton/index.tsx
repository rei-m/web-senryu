import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export type Props = {
  onClick: () => void;
  className?: string;
};

const MenuButton = ({ onClick, className }: Props) => {
  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={onClick}
      className={className}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default MenuButton;
