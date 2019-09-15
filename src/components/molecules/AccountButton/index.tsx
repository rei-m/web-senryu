import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconLabelButton, {
  Props as IconLabelButtonProps,
} from '@src/components/atoms/IconLabelButton';

export type Props = Omit<IconLabelButtonProps, 'Icon'>;

const AccountButton: React.FC<Props> = props => (
  <IconLabelButton Icon={AccountCircleIcon} {...props} />
);

export default AccountButton;
