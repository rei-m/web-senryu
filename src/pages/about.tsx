import React from 'react';
import { Link } from 'gatsby';
import clsx from 'clsx';
import makeStyles from '@src/styles/makeStyles';
import SingleContentPageTemplate from '@src/components/templates/SingleContentPageTemplate';
import Section from '@src/components/atoms/Section';
import Heading from '@src/components/atoms/Heading';
import Txt from '@src/components/atoms/Txt';
import { useAuthUser } from '@src/hooks/useAuthUser';
import { useSiteMetaData } from '@src/hooks/useSiteMetaData';
import { ROUTING } from '@src/constants/routing';
import { NavMenu } from '@src/constants';

const useStyles = makeStyles(theme => ({
  section: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
  },
  sectionMargin: {
    marginTop: theme.spacing(4),
  },
  heading: {
    fontWeight: 'bold',
    textAlign: 'left',
  },
  paragraph: {
    textAlign: 'left',
    marginTop: theme.spacing(2),
  },
}));

const AboutPage = () => {
  const user = useAuthUser();
  const { site } = useSiteMetaData();
  const classes = useStyles();

  return (
    <SingleContentPageTemplate
      user={user}
      title={`${site.siteMetadata.title}について`}
      description={`${site.siteMetadata.title}についての紹介です。${site.siteMetadata.description}`}
      navMenu={NavMenu.About}
      content={
        <>
          <Section
            heading={
              <Heading
                level={2}
                visualLevel={1}
                underline
                className={classes.heading}
              >
                {`${site.siteMetadata.title}について`}
              </Heading>
            }
            className={clsx(classes.section)}
          >
            <Txt size={`s`} tag="p" className={classes.paragraph}>
              {`${site.siteMetadata.title}へようこそ。このサイトでは誰でも簡単に川柳を投稿できます。あなたが日々の暮らしの中で感じたこと、伝えたいことなどを川柳で残してみませんか。`}
            </Txt>
          </Section>
          <Section
            heading={
              <Heading
                level={2}
                visualLevel={1}
                underline
                className={classes.heading}
              >
                使い方について
              </Heading>
            }
            className={clsx(classes.section, classes.sectionMargin)}
          >
            <Txt size={`s`} tag="p" className={classes.paragraph}>
              川柳はユーザー登録せずに「よみ人知らず」として投稿できます。こちらの
              <Link to={ROUTING.guideline}>ガイドライン</Link>
              を守った上で投稿してください。ユーザー登録すると、画像つきの川柳の投稿や、あなただけの投稿のページが作成できるようになります。
            </Txt>
          </Section>
          <Section
            heading={
              <Heading
                level={2}
                visualLevel={1}
                underline
                className={classes.heading}
              >
                運営者について
              </Heading>
            }
            className={clsx(classes.section, classes.sectionMargin)}
          >
            <Txt size={`s`} tag="p" className={classes.paragraph}>
              当サイトは
              <a
                href="https://twitter.com/rei_m"
                target="_blank"
                rel="noopener noreferrer"
              >
                @rei_m
              </a>
              が個人で運営しています。不具合や要望等あればTwitterまでお気軽にご連絡ください。
            </Txt>
          </Section>
        </>
      }
    />
  );
};

export default AboutPage;
