import React, { useState } from 'react';
import makeStyles from '@src/styles/makeStyles';
import TextField from '@src/components/molecules/TextField';
import ConfirmTextField from '@src/components/molecules/ConfirmTextField';
import EditableSenryuImage from '@src/components/molecules/EditableSenryuImage';
import EditButton from '@src/components/molecules/EditButton';
import SenryuImageDialog from '@src/components/organisms/SenryuImageDialog';
import { Senryu, SenryuDraft, User } from '@src/domain';
import { useBool } from '@src/hooks/useBool';

export type Props = {
  user: User | null;
  initialSenryu?: Senryu;
  onSubmit: (senryu: SenryuDraft) => void;
  className?: string;
};

export type PresenterProps = {
  isAuthorized: boolean;
  jouku: string;
  chuuku: string;
  geku: string;
  comment: string;
  imageUrl: string | null;
  ryugou: string;
  imageDialogOpen: boolean;
  onChangeField: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickOpenSetImage: () => void;
  onCloseSetImage: () => void;
  onSetImage: (cropped: string) => void;
  onRemovetImage: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
};

export type ContainerProps = Props & {
  presenter: (props: PresenterProps) => React.ReactElement;
};

type Value = Pick<SenryuDraft, 'jouku' | 'chuuku' | 'geku' | 'imageUrl'> & {
  comment: string;
};

const useStyles = makeStyles(theme => ({
  fieldMargin: {
    marginTop: theme.spacing(2),
  },
}));

const UNKNOWN_RYUGOU = `詠み人知らず`;

export const Presenter = ({
  isAuthorized,
  jouku,
  chuuku,
  geku,
  comment,
  imageUrl,
  ryugou,
  imageDialogOpen,
  onChangeField,
  onSetImage,
  onClickOpenSetImage,
  onCloseSetImage,
  onRemovetImage,
  onSubmit,
  className,
}: PresenterProps) => {
  const classes = useStyles();
  return (
    <form method="post" onSubmit={onSubmit} className={className}>
      <TextField
        id="jouku"
        value={jouku}
        label="上句（上五）"
        fullWidth={true}
        required={true}
        onChange={onChangeField}
      />
      <TextField
        id="chuuku"
        value={chuuku}
        label="中句（中七）"
        fullWidth={true}
        required={true}
        onChange={onChangeField}
      />
      <TextField
        id="geku"
        value={geku}
        label="下句（下五）"
        fullWidth={true}
        required={true}
        onChange={onChangeField}
      />
      {isAuthorized && (
        <EditableSenryuImage
          src={imageUrl}
          alt="投稿画像"
          size={144}
          onClickNoImage={onClickOpenSetImage}
          onClickRemoveImage={onRemovetImage}
          className={classes.fieldMargin}
        />
      )}
      <SenryuImageDialog
        open={imageDialogOpen}
        onClickSet={onSetImage}
        onClose={onCloseSetImage}
      />
      <TextField
        id="comment"
        value={comment}
        label="一言"
        fullWidth={true}
        onChange={onChangeField}
        className={classes.fieldMargin}
      />
      <ConfirmTextField label="柳号" value={ryugou} />
      <EditButton color="primary" className={classes.fieldMargin}>
        投稿を確認
      </EditButton>
    </form>
  );
};

export const Container = ({
  user,
  initialSenryu,
  onSubmit,
  className,
  presenter,
}: ContainerProps) => {
  const [state, setState] = useState<Value>(
    initialSenryu
      ? {
          ...initialSenryu,
          comment: initialSenryu.comment ? initialSenryu.comment : '',
        }
      : {
          jouku: '',
          chuuku: '',
          geku: '',
          comment: '',
          imageUrl: null,
        }
  );
  const [imageDialogOpen, openImageDialog, closeImageDialog] = useBool(false);

  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setState({ ...state, [name]: value });
  };

  const handleSetImage = (cropped: string) => {
    setState({ ...state, imageUrl: cropped });
    closeImageDialog();
  };

  const handleRemoveImage = () => {
    setState({ ...state, imageUrl: null });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const value = initialSenryu
      ? {
          id: initialSenryu.id,
          createdAt: initialSenryu.createdAt,
        }
      : {
          id: null,
          createdAt: null,
        };
    const comment = state.comment === '' ? null : state.comment;
    const userValue =
      user === null
        ? { userId: null, ryugou: UNKNOWN_RYUGOU }
        : { userId: user.id, ryugou: user.ryugou };
    onSubmit({ ...value, ...state, comment, ...userValue });
  };

  return presenter({
    isAuthorized: user !== null,
    jouku: state.jouku,
    chuuku: state.chuuku,
    geku: state.geku,
    comment: state.comment,
    imageUrl: state.imageUrl,
    ryugou: user ? user.ryugou : UNKNOWN_RYUGOU,
    imageDialogOpen,
    onChangeField: handleChangeField,
    onClickOpenSetImage: openImageDialog,
    onCloseSetImage: closeImageDialog,
    onSetImage: handleSetImage,
    onRemovetImage: handleRemoveImage,
    onSubmit: handleSubmit,
    className,
  });
};

const SenryuForm = (props: Props) => (
  <Container {...props} presenter={Presenter} />
);

export default SenryuForm;
