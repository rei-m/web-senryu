import React from 'react';
import clsx from 'clsx';
import grey from '@material-ui/core/colors/grey';
import makeStyles from '@src/styles/makeStyles';

export type Props = {
  src: string;
  alt: string;
  size: number;
  className?: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: grey[500],
    borderRadius: theme.spacing(1),
    textAlign: `center`,
  },
  image: {
    borderRadius: theme.spacing(1),
  },
}));

const SenryuImage = ({ src, alt, size, className }: Props) => {
  const classes = useStyles();
  return (
    <figure
      className={clsx(classes.root, className)}
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: size, height: size, margin: 0 }}
        className={classes.image}
      />
    </figure>
  );
};

export default SenryuImage;
