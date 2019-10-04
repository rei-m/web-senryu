import React from 'react';
import clsx from 'clsx';
import makeStyles from '@src/styles/makeStyles';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const HEADINGS: Array<HeadingElements> = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export type Props = {
  level?: Level;
  visualLevel?: Level;
  underline?: boolean;
  className?: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    fontWeight: 500,
    margin: 0,
  },
  1: {
    fontSize: theme.fontSize.ll,
  },
  2: {
    fontSize: theme.fontSize.l,
  },
  3: {
    fontSize: theme.fontSize.m,
  },
  4: {
    fontSize: theme.fontSize.s,
  },
  5: {
    fontSize: theme.fontSize.ss,
  },
  6: {
    fontSize: theme.fontSize.sss,
  },
  underline: {
    position: 'relative',
    '&:after': {
      content: '""',
      width: '100%',
      borderBottom: `4px double ${theme.palette.grey[500]}`,
      position: 'absolute',
      bottom: theme.spacing(-1),
      left: 0,
    },
  },
}));

export const Heading: React.FC<Props> = ({
  children,
  level = 2,
  visualLevel,
  underline,
  className,
}) => {
  const classes = useStyles();
  const Tag = HEADINGS[level - 1];
  const visualClassName = classes[visualLevel ? visualLevel : level];
  return (
    <Tag
      className={clsx(
        classes.root,
        visualClassName,
        underline && classes.underline,
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Heading;
