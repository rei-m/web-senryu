import React from 'react';
import NoIndexPageTemplate from '@src/components/templates/NoIndexPageTemplate';

const NotFoundPage = () => (
  <NoIndexPageTemplate
    title={`404: Not found`}
    content={
      <>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </>
    }
  />
);

export default NotFoundPage;
