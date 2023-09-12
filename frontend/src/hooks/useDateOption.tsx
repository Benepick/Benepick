import { useState } from 'react';

function useDateOption() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [selectedDate, setSelectedDate] = useState({
    month: currentMonth,
    year: currentYear,
  });
  const [showModal, setShowModal] = useState(false);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const selectDate = (month: number, year: number) => {
    setSelectedDate({ month, year });
    setShowModal(false);
  };

  return {
    selectedDate,
    showModal,
    months,
    setShowModal,
    selectDate,
    setSelectedDate,
  };
}

export default useDateOption;
