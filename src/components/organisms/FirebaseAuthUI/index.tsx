import React, { useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import { ROUTING } from '@src/constants/routing';

import '../../../../custom_modules/firebaseui/firebaseui.css';

export type Props = {
  signInSuccessUrl?: string;
  callbacks?: {
    signInSuccessWithAuthResult: (authResult: any) => boolean;
    signInFailure: (error: any) => Promise<void>;
  };
  providerIdList?: Array<string>;
  className?: string;
};

let provideUI: any;

if (typeof window !== `undefined`) {
  const firebaseui = require('../../../../custom_modules/firebaseui');
  let ui: any;
  provideUI = () => {
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    return ui;
  };
} else {
  provideUI = () => null;
}

const uiConfig = {
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  tosUrl: ROUTING.termsOfService,
  privacyPolicyUrl: ROUTING.privacyPolicy,
};

const FirebaseAuthUI = ({
  signInSuccessUrl,
  callbacks,
  providerIdList = [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  className,
}: Props) => {
  const authFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authFormRef.current) {
      const ui = provideUI();
      if (ui) {
        ui.start(authFormRef.current, {
          ...uiConfig,
          signInOptions: providerIdList,
          signInSuccessUrl,
          callbacks,
        });
      }
    }
  }, []);

  return <div ref={authFormRef} className={className} />;
};

export default FirebaseAuthUI;
