import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from '@src/styles/makeStyles';
import Heading from '@src/components/atoms/Heading';
import TextField from '@src/components/molecules/TextField';
import { User, UninitializedUser } from '@src/domain';
import { isIncludeBlank } from '@src/utils';

export type Props = {
  open: boolean;
  initialUser: User | UninitializedUser;
  onClickPost: (user: User) => void;
  onClose?: () => void;
};

type FieldKey = keyof Omit<User, 'id'>;
type FieldError = { [K in FieldKey]?: string };

export type State = {
  user: {
    ryugou: string;
    description: string;
    profileImageUrl: string | null;
  };
  error: FieldError;
};

const useStyles = makeStyles(theme => ({
  fieldMargin: {
    marginTop: theme.spacing(2),
  },
  text: {
    fontSize: theme.fontSize.s,
  },
}));

export type PresenterProps = {
  open: boolean;
  onChangeField: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickPost: (e: React.SyntheticEvent<HTMLElement>) => void;
  onClose?: () => void;
} & State;

export type ContainerProps = Props & {
  presenter: (props: PresenterProps) => React.ReactElement;
};

const validateRyugou = (value: string): string | undefined => {
  if (value.length === 0) {
    return '必須項目です';
  }
  if (isIncludeBlank(value)) {
    return '空文字は入力できません';
  }
  return undefined;
};

const validateDescription = (value: string): string | undefined => {
  if (80 < value.length) {
    return '80文字以下で入力してください';
  }
  return undefined;
};

const validate = (name: FieldKey, value: unknown): string | undefined => {
  switch (name) {
    case 'ryugou':
      return validateRyugou(value as string);
    case 'description':
      return validateDescription(value as string);
    default:
      return undefined;
  }
};

export const Presenter = ({
  open,
  user,
  error,
  onChangeField,
  onClickPost,
  onClose,
}: PresenterProps) => {
  const classes = useStyles();
  return (
    <Dialog open={open} aria-labelledby="user-form-dialog-title">
      <DialogTitle id="user-form-dialog-title" disableTypography>
        <Heading level={6} visualLevel={3}>
          投稿者設定
        </Heading>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          className={classes.text}
          classes={{ root: classes.text }}
        >
          投稿者の情報を設定してください（後で変更できます）
        </DialogContentText>
        <TextField
          id="ryugou"
          value={user.ryugou}
          label="柳号"
          fullWidth={true}
          onChange={onChangeField}
          error={error.ryugou}
          placeholder="よみ人知らず"
          required={true}
          className={classes.fieldMargin}
        />
        <TextField
          id="description"
          value={user.description}
          label="自己紹介"
          rows={3}
          fullWidth={true}
          onChange={onChangeField}
          error={error.description}
          placeholder="紹介文を入力してください（任意）"
          className={classes.fieldMargin}
        />
      </DialogContent>
      <DialogActions>
        {onClose && (
          <Button onClick={onClose} color="primary">
            閉じる
          </Button>
        )}
        <Button onClick={onClickPost} color="primary">
          設定する
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const Container = ({
  open,
  initialUser,
  onClickPost,
  onClose,
  presenter,
}: ContainerProps) => {
  const [state, setState] = useState<State>({
    user: {
      ryugou: initialUser.ryugou ? initialUser.ryugou : '',
      description: initialUser.description ? initialUser.description : '',
      profileImageUrl: initialUser.profileImageUrl
        ? initialUser.profileImageUrl
        : null,
    },
    error: {},
  });

  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const updated = { ...state.user, [name]: value };
    const error = {
      ...state.error,
      [name]: validate(name as FieldKey, value),
    };
    setState({ ...state, user: updated, error });
  };

  const handleClickPost = (e: React.SyntheticEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const ryugouError = validateRyugou(state.user.ryugou);
    const descriptionError = validateDescription(state.user.description);
    const errorText: Array<string> = [];
    if (ryugouError) {
      errorText.push(`柳号: ${ryugouError}`);
    }
    if (descriptionError) {
      errorText.push(`自己紹介: ${descriptionError}`);
    }

    if (0 < errorText.length) {
      alert(errorText.join('\n'));
      return;
    }

    onClickPost({
      id: initialUser.id,
      ryugou: state.user.ryugou,
      description:
        state.user.description !== '' ? state.user.description : null,
      profileImageUrl:
        state.user.profileImageUrl !== '' ? state.user.profileImageUrl : null,
    });
  };

  return presenter({
    open,
    user: state.user,
    error: state.error,
    onChangeField: handleChangeField,
    onClickPost: handleClickPost,
    onClose,
  });
};

const SenryuConfirmDialog = (props: Props) => (
  <Container {...props} presenter={Presenter} />
);

export default SenryuConfirmDialog;
