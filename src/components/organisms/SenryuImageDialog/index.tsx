import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CroppableSquareImage from '@src/components/molecules/CroppableSquareImage';
import makeStyles from '@src/styles/makeStyles';
import Heading from '@src/components/atoms/Heading';

export type Props = {
  open: boolean;
  onClickSet: (croppedImageUrl: string) => void;
  onClose: () => void;
};

export type State = {
  orgImageUrl: string | null;
  croppedImageUrl: string | null;
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

const SenryuImageDialog = ({ open, onClickSet, onClose }: Props) => {
  const [state, setState] = useState<State>({
    orgImageUrl: null,
    croppedImageUrl: null,
  });

  const classes = useStyles();

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setState({
          orgImageUrl: reader.result as string,
          croppedImageUrl: null,
        })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleChangeCropped = (cropped: string) => {
    setState({ ...state, croppedImageUrl: cropped });
  };

  const handleClickSet = (e: React.MouseEvent<{}>) => {
    e.preventDefault();
    e.stopPropagation();
    if (state.croppedImageUrl) {
      onClickSet(state.croppedImageUrl);
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
          投稿画像
        </Heading>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>投稿する画像を設定してください</DialogContentText>
        <div className={classes.fudaWrapper}>
          <input
            accept="image/jpeg,image/png,image/webp,image/gif"
            type="file"
            onChange={handleSelectFile}
          />
          {state.orgImageUrl && (
            <CroppableSquareImage
              src={state.orgImageUrl}
              onChange={handleChangeCropped}
            />
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          戻る
        </Button>
        <Button onClick={handleClickSet} color="primary">
          設定する
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SenryuImageDialog;
