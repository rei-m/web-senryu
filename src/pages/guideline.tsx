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
  descriptionList: {
    textAlign: 'left',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    '& dt:nth-child(n+2)': {
      marginTop: theme.spacing(1),
    },
    '& dt': {
      fontWeight: 'normal',
      fontSize: theme.fontSize.s,
    },
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

const TermsPage = () => {
  const user = useAuthUser();
  const { site } = useSiteMetaData();
  const classes = useStyles();

  return (
    <NoIndexPageTemplate
      user={user}
      title="利用規約"
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
              {`この利用規約（以下「本規約」といいます。）は、${site.siteMetadata.title}の運営者（以下「運営者」といいます。）がこのウェブサイト上で提供するサービス（以下「本サービス」といいます。）の利用条件を定めるものです。サービスを利用するユーザーの皆さま（以下「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。`}
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
                1. 適用範囲
              </Heading>
            }
            className={clsx(classes.section, classes.sectionMargin)}
          >
            <ol className={classes.orderedList}>
              <li>
                本サービスは、運営者が、日本国内に向けて提供する、PCおよびスマートフォンなどの携帯端末で利用可能なサービスです。
              </li>
              <li>
                本規約は，ユーザーと運営者との間の本サービスの利用に関わる一切の関係に適用されるものとします。
              </li>
              <li>
                運営者は本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。
              </li>
              <li>
                本規約の規定が前条の個別規定の規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします。
              </li>
            </ol>
          </Section>
          <Section
            heading={
              <Heading
                level={2}
                visualLevel={1}
                underline
                className={classes.heading}
              >
                2. アカウント管理
              </Heading>
            }
            className={clsx(classes.section, classes.sectionMargin)}
          >
            <ol className={classes.orderedList}>
              <li>
                ユーザーは，自己の責任において，本サービスの認証情報を適切に管理するものとします。
              </li>
              <li>
                ユーザーは，いかなる場合にも，認証情報を第三者に譲渡または貸与し，もしくは第三者と共用することはできません。運営者は，ユーザーから送信された認証情報がサービスの登録情報と一致してログインされた場合には，そのユーザー自身による利用とみなします。
              </li>
              <li>
                認証情報が第三者によって使用されたことによって生じた損害は，運営者に故意又は重大な過失がある場合を除き，運営者は一切の責任を負わないものとします。
              </li>
            </ol>
          </Section>
          <Section
            heading={
              <Heading
                level={2}
                visualLevel={1}
                underline
                className={classes.heading}
              >
                3. 禁止事項
              </Heading>
            }
            className={clsx(classes.section, classes.sectionMargin)}
          >
            <ol className={classes.orderedList}>
              <li>
                ユーザーは，自己の責任において，本サービスの認証情報を適切に管理するものとします。
              </li>
              <li>
                ユーザーは，いかなる場合にも，認証情報を第三者に譲渡または貸与し，もしくは第三者と共用することはできません。運営者は，ユーザーから送信された認証情報がサービスの登録情報と一致してログインされた場合には，そのユーザー自身による利用とみなします。
              </li>
              <li>
                認証情報が第三者によって使用されたことによって生じた損害は，運営者に故意又は重大な過失がある場合を除き，運営者は一切の責任を負わないものとします。
              </li>
            </ol>
          </Section>
        </>
      }
    />
  );
};

export default TermsPage;
