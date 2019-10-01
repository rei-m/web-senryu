import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export type Props = {
  open?: boolean;
  onClickPositive: () => void;
  onClose: () => void;
};

const ConfirmDeleteAccountDialog = ({
  open,
  onClickPositive,
  onClose,
}: Props) => (
  <Dialog
    maxWidth={`md`}
    open={!!open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">アカウント削除</DialogTitle>
    <DialogContent>
      <div id="alert-dialog-description">
        <div>
          アカウントを削除します。下記の事項について了承の上、「削除する」を押してください
        </div>
        <div>
          <ul>
            <li>登録した認証情報、プロフィールの情報は完全に削除されます</li>
            <li>投稿した川柳は削除されません</li>
            <li>アカウント削除後にアカウントを復活することはできかねます</li>
          </ul>
        </div>
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>戻る</Button>
      <Button onClick={onClickPositive} color="primary" autoFocus>
        削除する
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDeleteAccountDialog;
