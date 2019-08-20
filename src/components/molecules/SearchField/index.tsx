import React, { ChangeEventHandler } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@src/components/molecules/TextField';

export type Props = {
  id: string;
  value: string;
  label: string;
  placeholder?: string;
  helperText?: string;
  fullWidth?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

const SearchField = (props: Props) => (
  <TextField {...props} startAdornment={<SearchIcon />} />
);

export default SearchField;
