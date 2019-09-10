import React, { useState } from 'react';
import makeStyles from '@src/styles/makeStyles';
import TextField from '@src/components/molecules/TextField';
import ConfirmTextField from '@src/components/molecules/ConfirmTextField';
import EditButton from '@src/components/molecules/EditButton';
import { Senryu, SenryuDraft, User } from '@src/domain';

export type Props = {
  user: User | null;
  initialSenryu?: Senryu;
  onSubmit: (senryu: SenryuDraft) => void;
  className?: string;
};

export type PresenterProps = {
  jouku: string;
  chuuku: string;
  geku: string;
  ryugou: string;
  onChangeField: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
};

export type ContainerProps = Props & {
  presenter: (props: PresenterProps) => React.ReactElement;
};

export type State = {
  senryu: Pick<SenryuDraft, 'jouku' | 'chuuku' | 'geku'>;
};

const useStyles = makeStyles(theme => ({
  fieldMargin: {
    marginTop: theme.spacing(2),
  },
}));

const UNKNOWN_RYUGOU = `詠み人知らず`;

export const Presenter = ({
  jouku,
  chuuku,
  geku,
  ryugou,
  onChangeField,
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
        onChange={onChangeField}
      />
      <TextField
        id="chuuku"
        value={chuuku}
        label="中句（中七）"
        fullWidth={true}
        onChange={onChangeField}
      />
      <TextField
        id="geku"
        value={geku}
        label="下句（下五）"
        fullWidth={true}
        onChange={onChangeField}
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
  const [state, setState] = useState<State>({
    senryu: initialSenryu
      ? {
          jouku: initialSenryu.jouku,
          chuuku: initialSenryu.chuuku,
          geku: initialSenryu.geku,
        }
      : {
          jouku: '',
          chuuku: '',
          geku: '',
        },
  });

  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const updated = { ...state.senryu, [name]: value };
    setState({ ...state, senryu: updated });
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
    const userValue =
      user === null
        ? { userId: null, ryugou: UNKNOWN_RYUGOU }
        : { userId: user.id, ryugou: user.ryugou };
    onSubmit({ ...value, ...userValue, ...state.senryu });
  };

  return presenter({
    jouku: state.senryu.jouku,
    chuuku: state.senryu.chuuku,
    geku: state.senryu.geku,
    ryugou: user ? user.ryugou : UNKNOWN_RYUGOU,
    onChangeField: handleChangeField,
    onSubmit: handleSubmit,
    className,
  });
};

const SenryuForm = (props: Props) => (
  <Container {...props} presenter={Presenter} />
);

export default SenryuForm;
