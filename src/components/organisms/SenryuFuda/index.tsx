import React, { useRef, useState, useLayoutEffect } from 'react';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import makeStyles from '@src/styles/makeStyles';
import SenryuImgae from '@src/components/molecules/SenryuImage';
import Txt from '@src/components/atoms/Txt';
import { Senryu as SenryuType, SenryuDraft, SenryuId } from '@src/domain';
import { ThemeInterface } from '@src/styles/theme';

export type Props = {
  senryu: SenryuType | SenryuDraft;
  size: `s` | `m` | `l` | `ll`;
  isVisibleImage?: boolean;
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
      border: `${theme.spacing(1)}px solid ${theme.palette.primary.dark}`,
      backgroundColor: `#fafafa`,
      borderRadius: 4,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      width: props.width,
      minWidth: 176,
      minHeight: 240,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      [theme.breakpoints.up('sm')]: {
        minWidth: 'unset',
        flexDirection: 'row-reverse',
      },
    }),
    contents: {
      writingMode: `vertical-rl`,
      textOrientation: 'upright',
      wordBreak: 'keep-all',
    },
    first: () => ({
      textAlign: 'start',
      display: `block`,
    }),
    second: props => ({
      textAlign: 'start',
      display: `block`,
      marginRight: theme.spacing(0.5),
      paddingTop: `${marginBase[props.size ? props.size : `m`] * 1.5}rem`,
    }),
    third: props => ({
      textAlign: 'start',
      display: `block`,
      marginRight: theme.spacing(0.5),
      paddingTop: `${marginBase[props.size ? props.size : `m`] * 3}rem`,
    }),
    fourth: {
      textAlign: 'end',
      display: `block`,
      marginRight: theme.spacing(1.5),
    },
    image: {
      marginTop: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        marginTop: 0,
        marginRight: theme.spacing(1.5),
      },
    },
  })
);

const SenryuFuda = ({
  senryu,
  size = `m`,
  isVisibleImage = true,
  onClick,
  className,
}: Props) => {
  const theme = useTheme();
  const [width, setWidth] = useState(0);
  const ref1 = useRef<HTMLElement>(null);
  const ref2 = useRef<HTMLElement>(null);
  const ref3 = useRef<HTMLElement>(null);
  const ref4 = useRef<HTMLElement>(null);
  const refs = [ref1, ref2, ref3, ref4];

  const isUpSm = useMediaQuery<ThemeInterface>(theme =>
    theme.breakpoints.up('sm')
  );

  useLayoutEffect(() => {
    if (refs.every(ref => ref.current)) {
      const containerWidth = refs.reduce(
        (previous, current) => (previous += current.current!.clientWidth),
        theme.spacing(8.5)
      );
      if (senryu.imageUrl && isVisibleImage && isUpSm) {
        setWidth(containerWidth + 144 + theme.spacing(1.5));
      } else {
        setWidth(containerWidth);
      }
    }
  }, [refs.every(ref => ref.current), isUpSm]);

  const classes = useStyles({ width, size });

  const handleClick = onClick
    ? () => {
        if (senryu.id) {
          onClick(senryu.id);
        }
      }
    : undefined;

  return (
    <div onClick={handleClick} className={clsx(classes.root, className)}>
      <p className={classes.contents}>
        <Txt ref={ref1} size={size} className={classes.first}>
          {senryu.jouku}
        </Txt>
        <Txt ref={ref2} size={size} className={classes.second}>
          {senryu.chuuku}
        </Txt>
        <Txt ref={ref3} size={size} className={classes.third}>
          {senryu.geku}
        </Txt>
        <Txt
          ref={ref4}
          size={ryugouSize[size]}
          className={clsx(classes.txt, classes.fourth)}
        >
          {senryu.ryugou}
        </Txt>
      </p>
      {senryu.imageUrl && isVisibleImage && (
        <SenryuImgae
          src={senryu.imageUrl}
          size={144}
          alt={`${senryu.jouku} ${senryu.chuuku} ${senryu.geku}`}
          className={classes.image}
        />
      )}
    </div>
  );
};

export default React.memo(SenryuFuda);
