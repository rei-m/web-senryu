import React, { FC } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Txt from '@src/components/atoms/Txt';

export type Props = {
  href: string;
  citeProps?: {
    className?: string;
  };
  className?: string;
};

const useStyles = makeStyles(theme => ({
  cite: {
    color: theme.palette.secondary.main,
  },
}));

const CiteLink: FC<Props> = ({ children, href, citeProps, className }) => {
  const classes = useStyles();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(className)}
    >
      {children}
      <div>
        <Txt
          tag={`cite`}
          size={`ss`}
          className={clsx(
            classes.cite,
            citeProps ? citeProps.className : undefined
          )}
        >
          {href}
        </Txt>
      </div>
    </a>
  );
};

export default CiteLink;
