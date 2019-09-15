import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import IconLabelButton, {
  Props as IconLabelButtonProps,
} from '@src/components/atoms/IconLabelButton';

export type Props = Omit<IconLabelButtonProps, 'Icon'>;

const SettingButton: React.FC<Props> = props => (
  <IconLabelButton Icon={SettingsIcon} {...props} />
);

export default SettingButton;
