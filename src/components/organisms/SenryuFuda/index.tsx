import React, { useRef, useState, useLayoutEffect } from 'react';
import clsx from 'clsx';
import useTheme from '@material-ui/core/styles/useTheme';
import makeStyles from '@src/styles/makeStyles';
import VerticalTxt from '@src/components/atoms/VerticalTxt';
import { Senryu as SenryuType, SenryuDraft, SenryuId } from '@src/domain';

export type Props = {
  senryu: SenryuType | SenryuDraft;
  size: `s` | `m` | `l` | `ll`;
  onClick?: (senryuId: SenryuId) => void;
  className?: string;
};

const ryugouSize = {
  s: `sss`,
  m: `ss`,
  l: `s`,
  ll: `s`,
} as const;

const marginBase = {
  sss: 1.4,
  ss: 1.4,
  s: 1.4,
  m: 1.6,
  l: 1.8,
  ll: 2,
} as const;

const useStyles = makeStyles<{ width: number; size: `s` | `m` | `l` | `ll` }>(
  theme => ({
    root: props => ({
      display: `flex`,
      flexDirection: `row-reverse`,
      alignItems: `start`,
      border: `${theme.spacing(1)}px solid ${theme.palette.primary.dark}`,
      backgroundColor: `#fafafa`,
      borderRadius: 4,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      width: props.width,
      minHeight: props.width / 0.7,
    }),
    second: props => ({
      marginRight: theme.spacing(0.5),
      paddingTop: `${marginBase[props.size ? props.size : `m`] * 1.5}rem`,
    }),
    third: props => ({
      marginRight: theme.spacing(0.5),
      paddingTop: `${marginBase[props.size ? props.size : `m`] * 3}rem`,
    }),
    fourth: {
      alignSelf: `flex-end`,
      marginRight: theme.spacing(1.5),
    },
  })
);

const SenryuFuda = ({ senryu, size = `m`, onClick, className }: Props) => {
  const theme = useTheme();
  const [width, setWidth] = useState(0);
  const ref1 = useRef<HTMLElement>(null);
  const ref2 = useRef<HTMLElement>(null);
  const ref3 = useRef<HTMLElement>(null);
  const ref4 = useRef<HTMLElement>(null);
  const refs = [ref1, ref2, ref3, ref4];

  useLayoutEffect(() => {
    if (refs.every(ref => ref.current)) {
      const containerWidth = refs.reduce(
        (previous, current) => (previous += current.current!.clientWidth),
        theme.spacing(8.5)
      );
      setWidth(containerWidth);
    }
  }, [refs.every(ref => ref.current)]);

  const classes = useStyles({ width, size });

  const handleClick = onClick
    ? () => {
        if (senryu.id) {
          onClick(senryu.id);
        }
      }
    : undefined;

  return (
    <p onClick={handleClick} className={clsx(classes.root, className)}>
      <VerticalTxt ref={ref1} size={size}>
        {senryu.jouku}
      </VerticalTxt>
      <VerticalTxt ref={ref2} size={size} className={classes.second}>
        {senryu.chuuku}
      </VerticalTxt>
      <VerticalTxt ref={ref3} size={size} className={classes.third}>
        {senryu.geku}
      </VerticalTxt>
      <VerticalTxt
        ref={ref4}
        size={ryugouSize[size]}
        className={clsx(classes.txt, classes.fourth)}
      >
        {senryu.ryugou}
      </VerticalTxt>
    </p>
  );
};

export default SenryuFuda;
