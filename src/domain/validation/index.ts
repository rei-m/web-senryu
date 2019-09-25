import { KU_LENGTH, COMMENT_LENGTH } from '../constant';

export const validateKu = (value: string) => {
  if (value.length === 0) {
    return '必須項目です';
  }
  if (KU_LENGTH < value.length) {
    return `${KU_LENGTH}文字以内で入力してください`;
  }
  return null;
};

export const validateComment = (value: string) => {
  if (COMMENT_LENGTH < value.length) {
    return `${COMMENT_LENGTH}文字以内で入力してください`;
  }
  return null;
};
