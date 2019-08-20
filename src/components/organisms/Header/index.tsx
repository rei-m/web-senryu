import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Note from '@material-ui/icons/Note';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Favorite from '@material-ui/icons/Favorite';
import styled from '@src/styles/styled';
import Heading from '@src/components/atoms/Heading';

export type Props = {
  title: string;
  login?: boolean;
};

const StyledHeading = styled(Heading)({
  flexGrow: 1,
  textAlign: 'left',
});

const LoginLink = styled.a(({ theme }) => ({
  fontSize: theme.fontSize.l,
  color: theme.palette.text.secondary,
  padding: '5px 16px',
}));

const Header = ({ title, login }: Props) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <StyledHeading level={6} visualLevel={1}>
            {title}
          </StyledHeading>
          {login ? (
            <div>
              <IconButton aria-label="Show favorite">
                <Favorite />
              </IconButton>
              <IconButton aria-label="Show list of menu">
                <Note />
              </IconButton>
              <IconButton aria-label="Show personal">
                <AccountCircle />
              </IconButton>
            </div>
          ) : (
            <LoginLink href="/auth/">Login</LoginLink>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
