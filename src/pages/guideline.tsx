import React from 'react';
import clsx from 'clsx';
import makeStyles from '@src/styles/makeStyles';
import NoIndexPageTemplate from '@src/components/templates/NoIndexPageTemplate';
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
    textAlign: 'left',
  },
  paragraph: {
    textAlign: 'left',
    marginTop: theme.spacing(2),
  },
  orderedList: {
    textAlign: 'left',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    '& li': {
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
      fontSize: theme.fontSize.s,
      display: 'list-item',
      listStyleType: 'decimal',
    },
  },
}));

const GuidelinePage = () => {
  const user = useAuthUser();
  const { site } = useSiteMetaData();
  const classes = useStyles();

  return (
    <NoIndexPageTemplate
      user={user}
      title="ガイドライン"
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
                はじめに
              </Heading>
            }
            className={clsx(classes.section)}
          >
            <Txt size={`s`} tag="p" className={classes.paragraph}>
              {`これは${site.siteMetadata.title}の投稿に関するガイドラインです。ガイドラインを守って投稿を楽しみましょう。`}
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
                投稿ガイドライン
              </Heading>
            }
            className={clsx(classes.section, classes.sectionMargin)}
          >
            <ol className={classes.orderedList}>
              <li>
                このサービスは誰でも簡単に川柳を投稿できる場所を目指して作りました。難しいことは考えずに気軽に思ったこと、感じたことを五七五のリズムに乗せて投稿してみてください。
              </li>
              <li>
                特定の人物、団体を非難、中傷するような内容はやめましょう。川柳は世の中を風刺する内容を投稿することはあってよいですが、節度を守って投稿してください。
              </li>
              <li>
                著作権を意識しましょう。著作権で守られている画像の投稿や、他人の盗作を投稿するようなことはやめましょう。こちらは見つけ次第予告なく削除します。
              </li>
            </ol>
          </Section>
        </>
      }
    />
  );
};

export default GuidelinePage;
