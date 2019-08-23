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
import { User, UserId } from '@src/domain';
import { isIncludeBlank } from '@src/utils';

export type Props = {
  open: boolean;
  userId: UserId;
  ryugou?: string;
  onClickPost: (user: User) => void;
};

type FieldKey = keyof Omit<User, 'id'>;
type FieldError = { [K in FieldKey]?: string };

export type State = {
  user: User;
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
  user: User;
  error: FieldError;
  onChangeField: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickPost: (e: React.SyntheticEvent<HTMLElement>) => void;
};

export type ContainerProps = Props & {
  presenter: (props: PresenterProps) => React.ReactElement;
};

const validateRyugou = (value: string): string | undefined => {
  if (isIncludeBlank(value)) {
    return '空文字は入力できません';
  }
  return undefined;
};

const validate = (name: FieldKey, value: unknown): string | undefined => {
  switch (name) {
    case 'ryugou':
      return validateRyugou(value as string);
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
}: PresenterProps) => {
  const classes = useStyles();
  return (
    <Dialog open={open} aria-labelledby="user-form-dialog-title">
      <DialogTitle id="user-form-dialog-title" disableTypography>
        <Heading level={6} visualLevel={3}>
          ユーザー設定
        </Heading>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          className={classes.text}
          classes={{ root: classes.text }}
        >
          柳号を設定してください（後で変更できます）
        </DialogContentText>
        <TextField
          id="ryugou"
          value={user.ryugou}
          label="柳号"
          fullWidth={true}
          onChange={onChangeField}
          error={error.ryugou}
          placeholder="詠み人知らず"
          className={classes.fieldMargin}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickPost} color="primary">
          設定する
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const Container = ({
  open,
  userId,
  ryugou,
  onClickPost,
  presenter,
}: ContainerProps) => {
  const [state, setState] = useState<State>({
    user: { id: userId, ryugou: ryugou ? ryugou : '' },
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
    const errorText =
      state.user.ryugou !== ''
        ? Object.values(state.error)
            .filter((v: string | undefined): v is string => !!v)
            .join(`\n`)
        : '必須項目です';
    if (0 < errorText.length) {
      alert(errorText);
      return;
    }
    onClickPost(state.user);
  };

  return presenter({
    open,
    user: state.user,
    error: state.error,
    onChangeField: handleChangeField,
    onClickPost: handleClickPost,
  });
};

const SenryuConfirmDialog = (props: Props) => (
  <Container {...props} presenter={Presenter} />
);

export default SenryuConfirmDialog;
