export const isBlankOrEmpty = (value: string): boolean => {
  // eslint-disable-next-line no-irregular-whitespace
  const trimed = value.replace(/ |　/g, '');
  return trimed.length === 0;
};

export const isIncludeBlank = (value: string): boolean => {
  // eslint-disable-next-line no-irregular-whitespace
  const match = value.match(/ |　/);
  return !!match;
};
