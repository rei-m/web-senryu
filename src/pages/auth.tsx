import React from 'react';
import { RouteComponentProps, Redirect } from '@reach/router';
import NoIndexPageTemplate from '@src/components/templates/NoIndexPageTemplate';
import FirebaseAuthUI from '@src/components/organisms/FirebaseAuthUI';
import { useAuthUser } from '@src/hooks/useAuthUser';
import { ROUTING } from '@src/constants/routing';
import { NavMenu } from '@src/constants';

export type Props = RouteComponentProps;

const AuthPage = () => {
  if (useAuthUser()) {
    return <Redirect to={ROUTING.root} replace noThrow />;
  }

  return (
    <NoIndexPageTemplate
      title={`サインイン`}
      navMenu={NavMenu.SignIn}
      content={<FirebaseAuthUI signInSuccessUrl="/" />}
    />
  );
};

export default AuthPage;
