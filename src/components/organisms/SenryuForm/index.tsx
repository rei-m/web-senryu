import React, { useState, ChangeEvent } from 'react';
import TextField from '@src/components/molecules/TextField';
import { Senryu, SenryuDraft } from '@src/domain';

export type Props = {
  initialSenryu?: Senryu;
};

const SenryuForm = ({ initialSenryu }: Props) => {
  const [state, setState] = useState<{ senryu: SenryuDraft }>({
    senryu: initialSenryu
      ? { ...initialSenryu }
      : { id: null, jouku: '', chuuku: '', geku: '', ryugou: '詠み人知らず' },
  });
  const handleChangeJouku = (e: ChangeEvent<HTMLInputElement>) => {
    const updated = { ...state.senryu, jouku: e.currentTarget.value };
    setState({ ...state, senryu: updated });
  };
  const handleChangeChuuku = (e: ChangeEvent<HTMLInputElement>) => {
    const updated = { ...state.senryu, chuuku: e.currentTarget.value };
    setState({ ...state, senryu: updated });
  };
  const handleChangeGeku = (e: ChangeEvent<HTMLInputElement>) => {
    const updated = { ...state.senryu, geku: e.currentTarget.value };
    setState({ ...state, senryu: updated });
  };

  return (
    <form>
      <TextField
        id="jouku"
        value={state.senryu.jouku}
        label="上句（上五）"
        fullWidth={true}
        onChange={handleChangeJouku}
      />
      <TextField
        id="chuuku"
        value={state.senryu.chuuku}
        label="中句（中七）"
        fullWidth={true}
        onChange={handleChangeChuuku}
      />
      <TextField
        id="geku"
        value={state.senryu.geku}
        label="下句（下五）"
        fullWidth={true}
        onChange={handleChangeGeku}
      />
      <TextField
        id="ryugou"
        value={state.senryu.geku}
        label="柳号（ペンネーム）"
        fullWidth={true}
        onChange={handleChangeGeku}
      />
    </form>
  );
};

export default SenryuForm;
