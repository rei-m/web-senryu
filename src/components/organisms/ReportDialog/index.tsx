import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from '@src/styles/makeStyles';
import { SenryuId } from '@src/domain';
import { OWNER_EMAIL } from '@src/constants';
import { ROUTING } from '@src/constants/routing';

export type Props = {
  open?: boolean;
  senryuId?: SenryuId;
  onClose: () => void;
};

const useStyles = makeStyles(theme => ({
  contact: {
    marginTop: theme.spacing(4),
  },
}));

const ReportDialog = ({ open, senryuId, onClose }: Props) => {
  const classes = useStyles();
  return (
    <Dialog
      maxWidth={`sm`}
      open={!!open}
      onClose={onClose}
      aria-labelledby="report-dialog-title"
      aria-describedby="report-dialog-description"
    >
      <DialogTitle id="report-dialog-title">違反報告</DialogTitle>
      <DialogContent>
        <DialogContentText id="report-dialog-description">
          <div>
            <a
              href={ROUTING.termsOfService}
              target="_blank"
              rel="noopener noreferrer"
            >
              利用規約
            </a>
            に違反している歌を見つけた場合は、お手数ですが必要な情報を記載の上、以下のアドレスまでご連絡ください。
          </div>
          <ul className={classes.contact}>
            <li>{`連絡先: ${OWNER_EMAIL}`}</li>
            <li>{`川柳ID: ${senryuId}`}</li>
            <li>違反理由: (記入ください)</li>
          </ul>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>閉じる</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportDialog;
