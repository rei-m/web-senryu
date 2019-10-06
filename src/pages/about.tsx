import React from 'react';
import clsx from 'clsx';
import makeStyles from '@src/styles/makeStyles';
import SingleContentPageTemplate from '@src/components/templates/SingleContentPageTemplate';
import Section from '@src/components/atoms/Section';
import Heading from '@src/components/atoms/Heading';
import Txt from '@src/components/atoms/Txt';
import { useAuthUser } from '@src/hooks/useAuthUser';
import { useSiteMetaData } from '@src/hooks/useSiteMetaData';

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
      title="このサイトについて"
      description={`${site.siteMetadata.title}についての紹介です。${site.siteMetadata.description}`}
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
                このサイトについて
              </Heading>
            }
            className={clsx(classes.section)}
          >
            <Txt size={`s`} tag="p" className={classes.paragraph}>
              サイトに付いて説明
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
              使い方について説明
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
              当サイトは@rei_mが個人で運営しています。不具合や要望等あればTwitterまでご連絡ください。
            </Txt>
          </Section>
        </>
      }
    />
  );
};

export default AboutPage;
