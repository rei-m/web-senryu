import React from 'react';
import clsx from 'clsx';
import makeStyles from '@src/styles/makeStyles';
import Txt, { Props as TxtProps } from '@src/components/atoms/Txt';

export type Props = TxtProps;

const useStyles = makeStyles({
  root: {
    writingMode: `vertical-lr`,
    textOrientation: 'upright',
  },
});

const renderTxt = (
  props: React.PropsWithChildren<Props>,
  ref: React.Ref<HTMLSpanElement>
) => {
  const classes = useStyles();
  return (
    <Txt ref={ref} {...props} className={clsx(classes.root, props.className)} />
  );
};

const VerticalTxt = React.forwardRef(renderTxt);

export default VerticalTxt;
