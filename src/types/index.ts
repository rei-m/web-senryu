/**
 * メタ情報
 */
export type SiteMetaData = Readonly<{
  title: string;
  description: string;
  author: string;
}>;

export type Page<T> = Readonly<{
  currentPage: number;
  totalPages: number;
  itemList: Array<T>;
  totalCount: number;
  listPerPage: number;
  hasNextPage: boolean;
}>;
