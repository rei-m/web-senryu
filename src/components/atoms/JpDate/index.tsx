import React from 'react';

export type Props = {
  date: number | string;
  className?: string;
};

const JpDate = ({ date, className }: Props) => {
  const d = new Date(date);
  const dateString = `${d.getMonth() + 1}月${d.getDate()}日`;
  return (
    <time dateTime={d.toISOString()} className={className}>
      {dateString}
    </time>
  );
};

export default JpDate;
