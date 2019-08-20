import React, { ReactElement, useMemo } from 'react';
import { Link } from 'gatsby';
import styled from '@src/styles/styled';
import Heading from '@src/components/atoms/Heading';
import Txt from '@src/components/atoms/Txt';
import { ROUTING } from '@src/constants/routing';
import { useSiteMetaData } from '@src/hooks/useSiteMetaData';

export type PresenterProps = {
  siteName: string;
};

export type ContainerProps = {
  presenter: (props: PresenterProps) => ReactElement;
};

const Container = styled.footer(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(6),
}));

const StyledHeading = styled(Heading)({
  textAlign: 'left',
});

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const LinkContainer = styled.ul(({ theme }) => ({
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
}));

export const FooterPresenter = ({ siteName }: PresenterProps) => (
  <Container>
    <StyledHeading level={6} visualLevel={1}>
      {siteName}
    </StyledHeading>
    <LinkContainer>
      <li>
        <StyledLink to={ROUTING.search}>
          <Txt size={`ss`}>レシピをさがす</Txt>
        </StyledLink>
      </li>
      <li>
        <StyledLink to={ROUTING.about}>
          <Txt size={`ss`}>このサイトについて</Txt>
        </StyledLink>
      </li>
      <li>
        <StyledLink to={ROUTING.privacyPolicy}>
          <Txt size={`ss`}>プライバシーポリシー</Txt>
        </StyledLink>
      </li>
      <li>
        <StyledLink to={ROUTING.termsOfService}>
          <Txt size={`ss`}>利用規約</Txt>
        </StyledLink>
      </li>
    </LinkContainer>
  </Container>
);

export const FooterContainer = ({ presenter }: ContainerProps) => {
  const { site } = useSiteMetaData();
  return useMemo(() => presenter({ siteName: site.siteMetadata.title }), []);
};

const Footer = () => <FooterContainer presenter={FooterPresenter} />;

export default Footer;
