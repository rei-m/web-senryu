import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
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
  senryu: SenryuDraft;
  onChangeField: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
};

export type ContainerProps = Props & {
  presenter: (props: PresenterProps) => React.ReactElement;
};

const useStyles = makeStyles(theme => ({
  fieldMargin: {
    marginTop: theme.spacing(2),
  },
}));

export const Presenter = ({
  senryu,
  onChangeField,
  onSubmit,
  className,
}: PresenterProps) => {
  const classes = useStyles();
  return (
    <form method="post" onSubmit={onSubmit} className={className}>
      <TextField
        id="jouku"
        value={senryu.jouku}
        label="上句（上五）"
        fullWidth={true}
        onChange={onChangeField}
      />
      <TextField
        id="chuuku"
        value={senryu.chuuku}
        label="中句（中七）"
        fullWidth={true}
        onChange={onChangeField}
      />
      <TextField
        id="geku"
        value={senryu.geku}
        label="下句（下五）"
        fullWidth={true}
        onChange={onChangeField}
      />
      <ConfirmTextField label="柳号" value={senryu.ryugou} />
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
  const [state, setState] = useState<{ senryu: SenryuDraft }>({
    senryu: initialSenryu
      ? { ...initialSenryu }
      : {
          id: null,
          jouku: '',
          chuuku: '',
          geku: '',
          ryugou: user ? user.ryugou : `詠み人知らず`,
          userId: user ? user.id : null,
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
    onSubmit(state.senryu);
  };

  return presenter({
    senryu: state.senryu,
    onChangeField: handleChangeField,
    onSubmit: handleSubmit,
    className,
  });
};

const SenryuForm = (props: Props) => (
  <Container {...props} presenter={Presenter} />
);

export default SenryuForm;
