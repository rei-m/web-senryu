import React, { ReactElement } from 'react';
import clsx from 'clsx';
import styled from '@src/styles/styled';
import Txt from '@src/components/atoms/Txt';

export type Props = {
  currentPageNo: number;
  totalPageCnt: number;
  displayPageCnt: number;
  baseUrl: string;
  query?: string;
  pageNoKey: string;
  className?: string;
  classes?: { root?: string; navigation?: string; page?: string };
};

export type PresenterProps = {
  pageCnt: number;
  fromPageNo: number;
  toPageNo: number;
  currentPageNo: number;
  canMovePrev: boolean;
  canMoveNext: boolean;
  pageUrl: (pageNo: number) => string;
  className?: string;
  classes?: { root?: string; navigation?: string; page?: string };
};

export type ContainerProps = Props & {
  presenter: (props: PresenterProps) => ReactElement;
};

const Container = styled.div(props => ({
  '& :nth-of-type(n+1)': {
    marginLeft: props.theme.spacing(0.5),
    marginRight: props.theme.spacing(0.5),
  },
}));

const CurrentPageNo = styled(Txt)(props => ({
  color: props.theme.palette.text.secondary,
}));

export const PagenationPresenter = ({
  pageCnt,
  fromPageNo,
  currentPageNo,
  canMovePrev,
  canMoveNext,
  pageUrl,
  classes,
  className,
}: PresenterProps) => {
  return (
    <Container className={clsx(className, classes && classes.root)}>
      {canMovePrev && (
        <a
          href={pageUrl(currentPageNo - 1)}
          className={clsx(classes && classes.navigation)}
        >
          前へ
        </a>
      )}
      {Array.from({ length: pageCnt }).map((_, i) => {
        const pageNo = i + fromPageNo;
        return currentPageNo === pageNo ? (
          <CurrentPageNo
            key={pageNo}
            size={'l'}
            className={clsx(classes && classes.page)}
          >
            {pageNo}
          </CurrentPageNo>
        ) : (
          <a
            key={pageNo}
            href={pageUrl(pageNo)}
            className={clsx(classes && classes.page)}
          >
            {pageNo}
          </a>
        );
      })}
      {canMoveNext && (
        <a
          href={pageUrl(currentPageNo + 1)}
          className={clsx(classes && classes.navigation)}
        >
          次へ
        </a>
      )}
    </Container>
  );
};

export const PagenationContainer = ({
  currentPageNo,
  totalPageCnt,
  displayPageCnt = 9,
  baseUrl,
  query,
  pageNoKey,
  classes,
  className,
  presenter,
}: ContainerProps) => {
  const canMovePrev = 1 < currentPageNo;
  const canMoveNext = currentPageNo < totalPageCnt;
  const fromRange = Math.floor(displayPageCnt / 2);
  let fromPageNo = currentPageNo - fromRange;
  if (fromPageNo < 1) {
    fromPageNo = 1;
  }
  let toPageNo = fromPageNo + displayPageCnt - 1;
  if (totalPageCnt < toPageNo) {
    toPageNo = totalPageCnt;
  }
  const pageUrl = (pageNo: number) =>
    `${baseUrl}${query ? `?${query}&` : '?'}${pageNoKey}=${pageNo}`;
  return presenter({
    pageCnt: toPageNo - fromPageNo + 1,
    fromPageNo,
    toPageNo,
    currentPageNo,
    canMovePrev,
    canMoveNext,
    pageUrl,
    className,
    classes,
  });
};

const Pagenation = (props: Props) => (
  <PagenationContainer {...props} presenter={PagenationPresenter} />
);

export default Pagenation;
