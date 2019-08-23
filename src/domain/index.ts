type Draft<T, D extends keyof T> = {
  [K in keyof T]-?: (K extends D ? T[K] | null : T[K]);
};

/**
 * ユーザー
 */
export type UserId = string;

export type User = Readonly<{
  id: UserId;
  ryugou: string;
}>;

export type UninitializedUser = Readonly<{
  id: UserId;
  ryugou: null;
}>;

export type SenryuId = string;

export type Senryu = Readonly<{
  id: SenryuId;
  jouku: string;
  chuuku: string;
  geku: string;
  ryugou: string;
  userId: UserId | null;
}>;

export type SenryuDraft = Draft<Senryu, 'id'>;
