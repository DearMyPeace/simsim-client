import React, { useState } from 'react';
import { ICalendarModalDate } from '@type/Diary';

const useCalendarModal = ({ month, year }: ICalendarModalDate) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedModalDate, setSelectedModalDate] = useState<ICalendarModalDate>({ month, year });

  return {
    isModalVisible,
    setModalVisible,
    selectedModalDate,
    setSelectedModalDate,
  };
};

export default useCalendarModal;
