type Draft<T, D extends keyof T> = {
  [K in keyof T]-?: (K extends D ? T[K] | null : T[K]);
};

export type SenryuId = string;
export type Senryu = Readonly<{
  id: SenryuId;
  jouku: string;
  chuuku: string;
  geku: string;
  ryugou: string;
}>;
export type SenryuDraft = Draft<Senryu, 'id'>;
