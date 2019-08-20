import React, { FC } from 'react';
import MuiContainer from '@material-ui/core/Container';
import styled from '@src/styles/styled';

const StyledMuiContainer = styled(MuiContainer)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const Container: FC<{}> = ({ children }) => (
  <StyledMuiContainer component={`main`}>{children}</StyledMuiContainer>
);

export default Container;
