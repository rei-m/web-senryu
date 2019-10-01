import React from 'react';
import clsx from 'clsx';
import makeStyles from '@src/styles/makeStyles';
import { FontSize } from '@src/styles/theme';

export type Props = {
  tag?: `span` | `p` | `cite`;
  size?: FontSize;
  children?: React.ReactNode;
  className?: string;
};

const useStyles = makeStyles(({ fontSize }) => ({
  ll: {
    fontSize: fontSize.ll,
  },
  l: {
    fontSize: fontSize.l,
  },
  m: {
    fontSize: fontSize.m,
  },
  s: {
    fontSize: fontSize.s,
  },
  ss: {
    fontSize: fontSize.ss,
  },
  sss: {
    fontSize: fontSize.sss,
  },
}));

const renderTxt = (
  {
    children,
    tag = `span`,
    size = `m`,
    className,
  }: React.PropsWithChildren<Props>,
  ref: React.Ref<HTMLSpanElement>
) => {
  const classes = useStyles();
  const Tag = tag;
  return (
    <Tag ref={ref} className={clsx(classes[size], className)}>
      {children}
    </Tag>
  );
};

const Txt = React.forwardRef(renderTxt);

export default Txt;
