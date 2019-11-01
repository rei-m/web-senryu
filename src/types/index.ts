/**
 * メタ情報
 */
export type SiteMetaData = Readonly<{
  title: string;
  siteUrl: string;
  description: string;
  author: string;
}>;

/**
 * ページャ用のコンテナタイプ
 */
export type Page<T> = Readonly<{
  currentPage: number;
  totalPages: number;
  itemList: Array<T>;
  totalCount: number;
  listPerPage: number;
  hasNextPage: boolean;
}>;

/**
 * アプリケーション内の汎用的なエラー定義（手抜き）
 */
export type AppError = Readonly<{
  code: AppErrorCode;
  message: string;
}>;

export type AppErrorCode =
  | 'not-found'
  | 'unavailable'
  | 'unauthenticated'
  | 'unhandled'
  | 'requires-recent-login';

/**
 * 更新処理のStateMachineを表現する
 */
export type ProcessingState = 'waiting' | 'processing' | 'complete';
