import React from 'react';
import clsx from 'clsx';
import grey from '@material-ui/core/colors/grey';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutline';
import makeStyles from '@src/styles/makeStyles';

export type Props = {
  src: string | null;
  alt: string;
  size: number;
  onClickNoImage: () => void;
  onClickRemoveImage: () => void;
  className?: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    backgroundColor: grey[500],
  },
  image: {
    borderRadius: theme.spacing(1),
  },
  noImage: {
    borderRadius: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: grey[400],
      borderRadius: theme.spacing(1),
    },
  },
  removeIcon: {
    position: 'absolute',
    right: '-10px',
    top: '-10px',
    backgroundColor: grey[50],
    borderRadius: theme.spacing(2),
    cursor: 'pointer',
  },
  photoIcon: {
    color: theme.palette.common.white,
  },
}));

const EditableSenryuImage = ({
  src,
  alt,
  size,
  onClickNoImage,
  onClickRemoveImage,
  className,
}: Props) => {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.root, className)}
      style={{ width: size, height: size }}
    >
      {src ? (
        <>
          <img
            src={src}
            alt={alt}
            style={{ width: size, height: size, margin: 0 }}
            className={classes.image}
          />
          <RemoveCircleIcon
            fontSize={`large`}
            className={classes.removeIcon}
            onClick={onClickRemoveImage}
          />
        </>
      ) : (
        <p className={classes.noImage} onClick={onClickNoImage}>
          <AddAPhotoIcon className={classes.photoIcon} />
        </p>
      )}
    </div>
  );
};

export default EditableSenryuImage;
