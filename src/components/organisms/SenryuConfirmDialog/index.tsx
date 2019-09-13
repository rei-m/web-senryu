import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from '@src/styles/makeStyles';
import Heading from '@src/components/atoms/Heading';
import SenryuFuda from '@src/components/organisms/SenryuFuda';
import { SenryuDraft } from '@src/domain';

export type Props = {
  open: boolean;
  senryu?: SenryuDraft;
  onClickPost: (senryu: SenryuDraft) => void;
  onClose: () => void;
};

const useStyles = makeStyles(theme => ({
  fudaWrapper: {
    padding: theme.spacing(4),
  },
  fuda: {
    boxShadow: theme.elevation(1),
    margin: 'auto',
  },
}));

const SenryuConfirmDialog = ({ open, senryu, onClickPost, onClose }: Props) => {
  const classes = useStyles();
  const handleClickPost = (e: React.MouseEvent<{}>) => {
    e.preventDefault();
    e.stopPropagation();
    if (senryu) {
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
      <DialogContent>
        <DialogContentText>
          以下の内容で川柳を投稿します。よろしければ「投稿する」を押してください
        </DialogContentText>
        <div className={classes.fudaWrapper}>
          {senryu && (
            <SenryuFuda senryu={senryu} size={`m`} className={classes.fuda} />
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          戻る
        </Button>
        <Button onClick={handleClickPost} color="primary">
          投稿する
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SenryuConfirmDialog;
