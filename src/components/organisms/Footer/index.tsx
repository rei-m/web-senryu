import React from 'react';
import { Link } from 'gatsby';
import makeStyles from '@src/styles/makeStyles';
import Heading from '@src/components/atoms/Heading';
import Txt from '@src/components/atoms/Txt';
import { ROUTING } from '@src/constants/routing';
import { useSiteMetaData } from '@src/hooks/useSiteMetaData';

export type PresenterProps = {
  siteName: string;
};

export type ContainerProps = {
  presenter: (props: PresenterProps) => React.ReactElement;
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  heading: {
    textAlign: 'left',
  },
  linkContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
    '& li': {
      marginRight: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  link: {
    color: theme.palette.text.secondary,
  },
}));

export const FooterPresenter = ({ siteName }: PresenterProps) => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Heading level={6} visualLevel={1} className={classes.heading}>
        {siteName}
      </Heading>
      <ul className={classes.linkContainer}>
        <li>
          <Link to={ROUTING.search} className={classes.link}>
            <Txt size={`ss`}>川柳をさがす</Txt>
          </Link>
        </li>
        <li>
          <Link to={ROUTING.about} className={classes.link}>
            <Txt size={`ss`}>このサイトについて</Txt>
          </Link>
        </li>
        <li>
          <Link to={ROUTING.privacyPolicy} className={classes.link}>
            <Txt size={`ss`}>プライバシーポリシー</Txt>
          </Link>
        </li>
        <li>
          <Link to={ROUTING.termsOfService} className={classes.link}>
            <Txt size={`ss`}>利用規約</Txt>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export const FooterContainer = ({ presenter }: ContainerProps) => {
  const { site } = useSiteMetaData();
  return presenter({ siteName: site.siteMetadata.title });
};

const Footer = () => <FooterContainer presenter={FooterPresenter} />;

export default Footer;
