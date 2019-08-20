/**
 * メタ情報
 */
export type SiteMetaData = Readonly<{
  title: string;
  description: string;
  author: string;
}>;

/**
 * ユーザー
 */
export type UserId = string;

export type User = Readonly<{
  id: UserId;
  name: string;
}>;
