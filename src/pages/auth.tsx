import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import NoIndexPageTemplate from '@src/components/templates/NoIndexPageTemplate';

export type Props = {};

export type PresenterProps = {
  referrer: string;
};

export type ContainerProps = Props & { presenter: React.FC<PresenterProps> };

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
  // Terms of service url.
  tosUrl: '<your-tos-url>', // あとで作る
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>', // あとで作る
};

export const AuthPagePresenter = ({ referrer }: PresenterProps) => (
  <NoIndexPageTemplate
    title={`認証`}
    content={
      <StyledFirebaseAuth
        uiConfig={{ ...uiConfig, signInSuccessUrl: referrer }}
        firebaseAuth={firebase.auth()}
      />
    }
  />
);

export const AuthPageContainer = ({ presenter }: ContainerProps) => {
  return presenter({ referrer: document ? document.referrer : '/' });
};

const AuthPage = (props: Props) => (
  <AuthPageContainer {...props} presenter={AuthPagePresenter} />
);

export default AuthPage;
