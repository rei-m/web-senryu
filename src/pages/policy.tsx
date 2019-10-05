import React from 'react';
import clsx from 'clsx';
import makeStyles from '@src/styles/makeStyles';
import NoIndexPageTemplate from '@src/components/templates/NoIndexPageTemplate';
import Section from '@src/components/atoms/Section';
import Heading from '@src/components/atoms/Heading';
import Txt from '@src/components/atoms/Txt';
import { useAuthUser } from '@src/hooks/useAuthUser';
import { useSiteMetaData } from '@src/hooks/useSiteMetaData';
import { OWNER_EMAIL } from '@src/constants';

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
    '& dd': {
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
      marginLeft: theme.spacing(4),
      fontSize: theme.fontSize.s,
      display: 'list-item',
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

const PolicyPage = () => {
  const user = useAuthUser();
  const { site } = useSiteMetaData();
  const classes = useStyles();

  return (
    <NoIndexPageTemplate
      user={user}
      title="プライバシーポリシー"
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
              {`${site.siteMetadata.title}の運営者（以下「運営者」といいます。）は${site.siteMetadata.title}（以下「本サービス」といいます。）におけるユーザーについての個人情報を含む利用者情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。`}
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
                1. 収集する利用者情報及び収集方法
              </Heading>
            }
            className={clsx(classes.section, classes.sectionMargin)}
          >
            <Txt size={`s`} tag="p" className={classes.paragraph}>
              本ポリシーにおいて、「利用者情報」とは、ユーザーの識別に係る情報、通信サービス上の行動履歴、その他ユーザーのスマートフォン、PC等の端末においてユーザーまたはユーザーの端末に関連して生成または蓄積された情報であって、本ポリシーに基づき本サービスが収集するものを意味するものとします。本サービスにおける利用者情報は、その収集方法に応じて、以下のようなものとなります。
            </Txt>
            <dl className={classes.descriptionList}>
              <dt>
                <Heading level={3} visualLevel={4} className={classes.heading}>
                  a. ユーザーからご提供いただく情報
                </Heading>
              </dt>
              <dd>メールアドレス</dd>
              <dd>
                運営者が定める本サービス内の入力フォームにユーザーが入力する情報
              </dd>
              <dt>
                <Heading level={3} visualLevel={4} className={classes.heading}>
                  b.
                  ユーザーが本サービスの利用において、他のサービスと連携を許可することにより、当該他のサービスからご提供いただく情報
                </Heading>
              </dt>
              <dd>当該外部サービスでユーザーが利用するID</dd>
              <dd>
                その他当該外部サービスのプライバシー設定によりユーザーが連携先に開示を認めた情報
              </dd>
              <dt>
                <Heading level={3} visualLevel={4} className={classes.heading}>
                  c. ユーザーが利用するにあたり、本サービスが収集する情報
                </Heading>
              </dt>
              <dd>端末情報</dd>
              <dd>ログ情報</dd>
              <dd>Cookie及び匿名ID</dd>
              <dd>位置情報</dd>
            </dl>
          </Section>
          <Section
            heading={
              <Heading
                level={2}
                visualLevel={1}
                underline
                className={classes.heading}
              >
                2. 利用目的
              </Heading>
            }
            className={clsx(classes.section, classes.sectionMargin)}
          >
            <Txt size={`s`} tag="p" className={classes.paragraph}>
              運営者が個人情報を収集利用する主な目的は，以下のとおりです。
            </Txt>
            <ol className={classes.orderedList}>
              <li>
                本サービスに関する登録の受付、本人確認等本サービスの提供、維持、保護及び改善のため
              </li>
              <li>本サービスに関するご案内、お問い合せ等への対応のため</li>
              <li>
                本サービスに関する規約、ポリシー等（以下「規約等」といいます。）に違反する行為に対する対応のため
              </li>
              <li>本サービスに関する規約等の変更などを通知するため</li>
              <li>本サービスへのアクセス状況やそのご利用方法の解析のため</li>
              <li>広告の配信または表示のため</li>
              <li>上記の利用目的に付随する利用目的のため</li>
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
                3. 利用目的の変更
              </Heading>
            }
            className={clsx(classes.section, classes.sectionMargin)}
          >
            <Txt size={`s`} tag="p" className={classes.paragraph}>
              運営者は，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。
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
                4. 個人情報の第三者提供
              </Heading>
            }
            className={clsx(classes.section, classes.sectionMargin)}
          >
            <ol className={classes.orderedList}>
              <li>
                運営者は、あらかじめユーザーの同意を得ることなく，第三者に個人情報を提供することはありません。ただし，個人情報保護法その他の法令で認められる場合を除きます。
              </li>
              <li>
                以下の場合は当該情報の提供先は第三者に該当しないものとします
              </li>
            </ol>
            <dl className={classes.descriptionList}>
              <dt>
                &nbsp;&nbsp;&nbsp;&nbsp;・運営者が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
              </dt>
              <dt>
                &nbsp;&nbsp;&nbsp;&nbsp;・合併その他の事由による事業の承継に伴って個人情報が提供される場合
              </dt>
            </dl>
          </Section>
          <Section
            heading={
              <Heading
                level={2}
                visualLevel={1}
                underline
                className={classes.heading}
              >
                5. 個人情報の開示
              </Heading>
            }
            className={clsx(classes.section, classes.sectionMargin)}
          >
            <Txt size={`s`} tag="p" className={classes.paragraph}>
              運営者は，本人から個人情報の開示を求められたときは，本人に対し，遅滞なくこれを開示します。ただし，開示することにより次のいずれかに該当する場合は，その全部または一部を開示しないこともあり，開示しない決定をした場合には，その旨を遅滞なく通知します。
            </Txt>
            <ol className={classes.orderedList}>
              <li>
                本人または第三者の生命，身体，財産その他の権利利益を害するおそれがある場合
              </li>
              <li>適正な運営に著しい支障を及ぼすおそれがある場合</li>
              <li>その他法令に違反することとなる場合</li>
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
                6. 個人情報の訂正および削除
              </Heading>
            }
            className={clsx(classes.section, classes.sectionMargin)}
          >
            <ol className={classes.orderedList}>
              <li>
                ユーザーは、自己の個人情報が誤った情報である場合には，運営者が定める手続きにより，運営者に対して個人情報の訂正，追加または削除（以下，「訂正等」といいます。）を請求することができます。
              </li>
              <li>
                運営者は，ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の訂正等を行うものとします。
              </li>
              <li>
                運営者は，前項の規定に基づき訂正等を行った場合，または訂正等を行わない旨の決定をしたときは遅滞なく，これをユーザーに通知します。
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
                7. 個人情報の利用停止等
              </Heading>
            }
            className={clsx(classes.section, classes.sectionMargin)}
          >
            <ol className={classes.orderedList}>
              <li>
                運営者は，本人から，個人情報が利用目的の範囲を超えて取り扱われているという理由，または不正の手段により取得されたものであるという理由により，その利用の停止または消去（以下，「利用停止等」といいます。）を求められた場合には，遅滞なく必要な調査を行います。
              </li>
              <li>
                前項の調査結果に基づき，その請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の利用停止等を行います。
              </li>
              <li>
                前項の規定に基づき利用停止等を行った場合，または利用停止等を行わない旨の決定をしたときは，遅滞なく，これをユーザーに通知します。
              </li>
              <li>
                前2項にかかわらず，利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって，ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとれる場合は，この代替策を講じるものとします。
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
                8. プライバシーポリシーの変更
              </Heading>
            }
            className={clsx(classes.section, classes.sectionMargin)}
          >
            <ol className={classes.orderedList}>
              <li>
                本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。
              </li>
              <li>
                運営者が別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。
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
                9. お問い合わせ窓口
              </Heading>
            }
            className={clsx(classes.section, classes.sectionMargin)}
          >
            <Txt size={`s`} tag="p" className={classes.paragraph}>
              本ポリシーに関するお問い合わせは，下記の窓口までお願いいたします。
            </Txt>
            <Txt size={`s`} tag="p" className={classes.paragraph}>
              {`Eメールアドレス：${OWNER_EMAIL}`}
            </Txt>
          </Section>
        </>
      }
    />
  );
};

export default PolicyPage;
