import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

interface NotUsingDayProps {
  date: string;
}

const NotUsingDay: React.FC<NotUsingDayProps> = ({ date }) => {
  const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
  // const color = dayOfWeek === 'Sunday' ? '#FF1F00' : 'gray';
  const color = 'gray';
  return <Entypo name="dot-single" color={color} size={26} />;
};

export default NotUsingDay;
