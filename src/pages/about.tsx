import React from 'react';
import NoIndexPageTemplate from '@src/components/templates/NoIndexPageTemplate';

const AboutPage = () => (
  <NoIndexPageTemplate
    title={`このサイトについて`}
    content={
      <>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </>
    }
  />
);

export default AboutPage;
