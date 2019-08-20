import React from 'react';
import Fab, { FabProps } from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

export type Props = Omit<FabProps, 'color'>;

const EditFab = (props: Props) => (
  <Fab {...props} color="secondary">
    <EditIcon />
  </Fab>
);

export default EditFab;
