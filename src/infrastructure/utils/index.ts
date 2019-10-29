import { AppError, AppErrorCode } from '@src/types';

export const reasonToAppError = (reason: any, model: string): AppError => {
  console.error(reason);
  switch (reason.code as AppErrorCode | undefined) {
    case 'not-found':
      return {
        code: reason.code,
        message: `${model}が見つかりませんでした`,
      } as AppError;
    case 'unavailable':
      return {
        code: reason.code,
        message: '現在ご利用になることができません。回線の状況をご確認ください',
      } as AppError;
    case 'unauthenticated':
      return {
        code: reason.code,
        message: '許可されていない操作です',
      } as AppError;
    default:
      return {
        code: 'unhandled',
        message: 'エラーが発生しました。しばらく時間をおいてお試しください',
      } as AppError;
  }
};
