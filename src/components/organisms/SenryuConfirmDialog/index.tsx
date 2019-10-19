import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import makeStyles from '@src/styles/makeStyles';
import SenryuFuda from '@src/components/organisms/SenryuFuda';
import ConfirmTextField from '@src/components/molecules/ConfirmTextField';
import Txt from '@src/components/atoms/Txt';
import Heading from '@src/components/atoms/Heading';
import { SenryuDraft } from '@src/domain';
import { ROUTING } from '@src/constants/routing';

export type Props = {
  open: boolean;
  senryu?: SenryuDraft;
  onClickPost: (senryu: SenryuDraft) => void;
  onClose: () => void;
};

const useStyles = makeStyles(theme => ({
  fuda: {
    boxShadow: theme.elevation(1),
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: theme.spacing(2),
  },
  contents: {
    padding: theme.spacing(2, 3),
  },
  comment: {
    marginTop: theme.spacing(2),
  },
}));

const SenryuConfirmDialog = ({ open, senryu, onClickPost, onClose }: Props) => {
  const classes = useStyles();
  const [isAgreedTOU, setIsAgreedTOU] = useState(false);

  const handleChangeAgreedTOU = (
    _e: React.SyntheticEvent<{}>,
    checked: boolean
  ) => {
    setIsAgreedTOU(checked);
  };

  const handleClickPost = (e: React.MouseEvent<{}>) => {
    e.preventDefault();
    e.stopPropagation();
    if (senryu) {
      if (senryu.userId === null && !isAgreedTOU) {
        window.alert('投稿前に利用規約に同意してください');
        return;
      }
      onClickPost(senryu);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="senryu-form-dialog-title"
    >
      <DialogTitle id="senryu-form-dialog-title" disableTypography>
        <Heading level={6} visualLevel={3}>
          投稿確認
        </Heading>
      </DialogTitle>
      <DialogContent className={classes.contents}>
        <DialogContentText>以下の内容で川柳を投稿します</DialogContentText>
        {senryu && (
          <>
            <SenryuFuda senryu={senryu} size={`m`} className={classes.fuda} />
            {senryu.comment && (
              <ConfirmTextField
                label={`一言`}
                value={senryu.comment}
                className={classes.comment}
              />
            )}
            {senryu.userId === null && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAgreedTOU}
                    onChange={handleChangeAgreedTOU}
                    color="primary"
                  />
                }
                label={
                  <Txt size="ss">
                    <a
                      href={ROUTING.termsOfService}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      利用規約
                    </a>
                    に同意する
                  </Txt>
                }
              />
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>戻る</Button>
        <Button onClick={handleClickPost} color="primary">
          投稿する
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SenryuConfirmDialog;
