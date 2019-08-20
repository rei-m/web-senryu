import React, { FC, SyntheticEvent, useCallback } from 'react';
import * as ReactDOM from 'react-dom';
import styled from '@src/styles/styled';
import { useReactPortal } from '@src/hooks/useReactPortal';

export type Props = {
  onClick?: () => void;
};

const Container = styled.div({
  width: '100%',
  height: '100%',
  overflow: 'scroll',
  position: 'fixed',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

const Overlay: FC<Props> = ({ children, onClick }) => {
  const el = useReactPortal();

  const handleOnClick = useCallback((e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  }, []);

  return ReactDOM.createPortal(
    <Container onClick={handleOnClick}>{children}</Container>,
    el
  );
};

export default Overlay;
