import React, { useState, ReactElement, ChangeEvent, FormEvent } from 'react';
import TextField from '@src/components/molecules/TextField';
import EditButton from '@src/components/molecules/EditButton';
import { Senryu, SenryuDraft } from '@src/domain';

export type Props = {
  initialSenryu?: Senryu;
  onSubmit: (senryu: SenryuDraft) => void;
  className?: string;
};

export type PresenterProps = {
  senryu: SenryuDraft;
  onChangeField: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
};

export type ContainerProps = Props & {
  presenter: (props: PresenterProps) => ReactElement;
};

export const Presenter = ({
  senryu,
  onChangeField,
  onSubmit,
  className,
}: PresenterProps) => {
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
      <TextField
        id="ryugou"
        value={senryu.ryugou}
        label="柳号（ペンネーム）"
        fullWidth={true}
        onChange={onChangeField}
      />
      <EditButton color="primary">投稿を確認</EditButton>
    </form>
  );
};

export const Container = ({
  initialSenryu,
  onSubmit,
  className,
  presenter,
}: ContainerProps) => {
  const [state, setState] = useState<{ senryu: SenryuDraft }>({
    senryu: initialSenryu
      ? { ...initialSenryu }
      : { id: null, jouku: '', chuuku: '', geku: '', ryugou: '詠み人知らず' },
  });

  const handleChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const updated = { ...state.senryu, [name]: value };
    setState({ ...state, senryu: updated });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
