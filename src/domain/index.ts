/**
 * ユーザー
 */
export type UserId = string;

export type User = Readonly<{
  id: UserId;
  ryugou: string;
  description: string | null;
  profileImageUrl: string | null; // プロフ画像は未実装
}>;

export type UninitializedUser = Readonly<{
  id: UserId;
  ryugou: null;
  description: null;
  profileImageUrl: null;
}>;

export type SenryuId = string;

export type Senryu = Readonly<{
  id: SenryuId;
  jouku: string;
  chuuku: string;
  geku: string;
  ryugou: string;
  imageUrl: string | null;
  comment: string | null;
  userId: UserId | null;
  createdAt: number;
}>;

export type SenryuDraft = Draft<Senryu, 'id' | 'createdAt'>;
