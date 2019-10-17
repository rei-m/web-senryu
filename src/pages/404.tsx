import React from 'react';
import makeStyles from '@src/styles/makeStyles';
import Heading from '@src/components/atoms/Heading';
import NoIndexPageTemplate from '@src/components/templates/NoIndexPageTemplate';
import { useAuthUser } from '@src/hooks/useAuthUser';
import dogeza from '@src/images/dogeza.png';

const useStyles = makeStyles(theme => ({
  dogezaContainer: {
    marginTop: theme.spacing(4),
  },
  dogeza: {
    width: 200,
  },
}));

const NotFoundPage = () => {
  const authUser = useAuthUser();
  const classes = useStyles();
  return (
    <NoIndexPageTemplate
      title={`ページが見つかりませんでした`}
      user={authUser}
      content={
        <>
          <Heading level={1}>ページが見つかりませんでした</Heading>
          <p className={classes.dogezaContainer}>
            <img
              src={dogeza}
              alt="ページが見つかりませんでした"
              className={classes.dogeza}
            />
          </p>
        </>
      }
    />
  );
};

export default NotFoundPage;
