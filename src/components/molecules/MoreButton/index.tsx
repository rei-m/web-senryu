import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconLabelButton from '@src/components/atoms/IconLabelButton';
import Txt from '@src/components/atoms/Txt';
import { FontSize } from '@src/styles/theme';

export type Props = {
  size?: FontSize;
  onClick: () => void;
  className?: string;
};

const MoreButton = ({ size = 'm', onClick, className }: Props) => {
  return (
    <IconLabelButton
      Icon={ExpandMoreIcon}
      elevation={0}
      onClick={onClick}
      className={className}
    >
      <Txt size={size}>もっとみる</Txt>
    </IconLabelButton>
  );
};

export default MoreButton;
