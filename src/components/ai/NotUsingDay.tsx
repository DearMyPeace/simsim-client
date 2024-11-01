import React from 'react';
import DotSingle from '@assets/svg/icons/entypo--dot-single.svg';

interface NotUsingDayProps {
  date: string;
}

const NotUsingDay: React.FC<NotUsingDayProps> = ({ date }) => {
  const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
  // const color = dayOfWeek === 'Sunday' ? '#FF1F00' : 'gray';
  const color = 'gray';
  return <DotSingle width={26} height={26} fill={color} />;
};

export default NotUsingDay;
