import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconLabelButton, {
  Props as IconLabelButtonProps,
} from '@src/components/atoms/IconLabelButton';

export type Props = Omit<IconLabelButtonProps, 'Icon'>;

const DeleteButton: React.FC<Props> = props => (
  <IconLabelButton Icon={DeleteIcon} {...props} />
);

export default DeleteButton;
