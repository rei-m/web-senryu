import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconLabelButton, {
  Props as IconLabelButtonProps,
} from '@src/components/atoms/IconLabelButton';

export type Props = Omit<IconLabelButtonProps, 'Icon'>;

const CloseButton: React.FC<Props> = props => (
  <IconLabelButton Icon={CloseIcon} {...props} />
);

export default CloseButton;
