import React, { FC } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import IconLabelButton, {
  Props as IconLabelButtonProps,
} from '@src/components/atoms/IconLabelButton';

export type Props = Omit<IconLabelButtonProps, 'Icon'>;

const EditButton: FC<Props> = props => (
  <IconLabelButton Icon={EditIcon} {...props} />
);

export default EditButton;
