import React from 'react';
import clsx from 'clsx';
import EditIcon from '@material-ui/icons/Edit';
import PeopleIcon from '@material-ui/icons/People';
import makeStyles from '@src/styles/makeStyles';
import SingleContentPageTemplate from '@src/components/templates/SingleContentPageTemplate';
import TopMenuLink from '@src/components/molecules/TopMenuLink';
import Section from '@src/components/atoms/Section';
import Heading from '@src/components/atoms/Heading';
import Txt from '@src/components/atoms/Txt';
import { useAuthUser } from '@src/hooks/useAuthUser';
import { useSiteMetaData } from '@src/hooks/useSiteMetaData';
import { ROUTING } from '@src/constants/routing';

const useStyles = makeStyles(theme => ({
  section: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
  },
  sectionMargin: {
    marginTop: theme.spacing(4),
  },
  linkContainer: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    '& > :nth-child(n+2)': {
      marginTop: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      '& > :nth-child(n+2)': {
        marginTop: 0,
        marginLeft: theme.spacing(3),
      },
    },
  },
  heading: {
    fontWeight: 'bold',
    textAlign: 'left',
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
  paragraph: {
    textAlign: 'left',
    marginTop: theme.spacing(2),
  },
  link: {
    boxShadow: theme.shadows['1'],
  },
}));

const IndexPage = () => {
  const user = useAuthUser();
  const { site } = useSiteMetaData();
  const classes = useStyles();
  return (
    <SingleContentPageTemplate
      user={user}
      title={site.siteMetadata.title}
      description={site.siteMetadata.description}
      content={
        <>
          <Section
            heading={
              <Heading level={2} visualLevel={1} className={classes.heading}>
                {`${site.siteMetadata.title}へようこそ`}
              </Heading>
            }
            className={classes.section}
          >
            <Txt size={`s`} tag="p" className={classes.paragraph}>
              {`${site.siteMetadata.title}へようこそ。このサイトでは誰でも簡単に川柳を投稿できます。あなたが日々の暮らしの中で感じたこと、伝えたいことなどを川柳で残してみませんか。`}
            </Txt>
            <div className={classes.linkContainer}>
              <TopMenuLink
                to={ROUTING.senryuNew}
                label="川柳を投稿する"
                description="会員登録不要で川柳を投稿できます。登録すると柳号（ペンネーム）の設定や画像付きの川柳を投稿できるようになります。"
                icon={<EditIcon />}
                className={classes.link}
              />
              <TopMenuLink
                to={ROUTING.senryu}
                label="川柳を見る"
                description={`今までに${site.siteMetadata.title}に投稿された川柳を見ることができます。`}
                icon={<PeopleIcon />}
                className={classes.link}
              />
            </div>
          </Section>
          <Section
            heading={
              <Heading level={2} visualLevel={1} className={classes.heading}>
                川柳とは
              </Heading>
            }
            className={clsx(classes.section, classes.sectionMargin)}
          >
            <Txt size={`s`} tag="p" className={classes.paragraph}>
              川柳（せんりゅう）は、五・七・五の音を持つ日本語の定型詩です。同じ形式を持つ詩として俳句がありますが、川柳は「季語を入れる必要がない」「切れ字が必要ない」「口語体である」など約束がなく日常の会話に近いので、より自由に詩を表現できます。
              <br />
              <br />
              近年は様々なお題に対して川柳を募集する形式のコンテストが開催されていますが、中でも「サラリーマン川柳」は特に人気があり、サラリーマンの悲哀や苦労をテーマにした川柳が幅広い世代から投稿されています。
            </Txt>
          </Section>
        </>
      }
    />
  );
};

export default IndexPage;
