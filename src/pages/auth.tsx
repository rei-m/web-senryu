import React from 'react';
import { RouteComponentProps, Redirect } from '@reach/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import NoIndexPageTemplate from '@src/components/templates/NoIndexPageTemplate';
import { useAuthUser } from '@src/hooks/useAuthUser';
import { ROUTING } from '@src/constants/routing';
import { NavMenu } from '@src/constants';

export type Props = RouteComponentProps;

export type PresenterProps = {
  signInSuccessUrl: string;
};

export type ContainerProps = Props & {
  presenter: (props: PresenterProps) => React.ReactElement;
};

const uiConfig = {
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  tosUrl: ROUTING.termsOfService,
  privacyPolicyUrl: ROUTING.privacyPolicy,
};

export const AuthPagePresenter = ({ signInSuccessUrl }: PresenterProps) => (
  <NoIndexPageTemplate
    title={`サインイン`}
    navMenu={NavMenu.SignIn}
    content={
      <StyledFirebaseAuth
        uiConfig={{ ...uiConfig, signInSuccessUrl }}
        firebaseAuth={firebase.auth()}
      />
    }
  />
);

export const AuthPageContainer = ({ presenter }: ContainerProps) => {
  const authUser = useAuthUser();
  if (authUser) {
    return <Redirect to={ROUTING.root} replace />;
  }

  return presenter({
    signInSuccessUrl: '/',
  });
};

const AuthPage = (props: Props) => (
  <AuthPageContainer {...props} presenter={AuthPagePresenter} />
);

export default AuthPage;
