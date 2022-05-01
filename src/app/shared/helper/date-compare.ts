export const isEqualDates = (date_1: Date, date_2: Date) => {
  const sameDay = date_1.getDate() === date_2.getDate();
  const sameMonth = date_1.getMonth() === date_2.getMonth();
  const sameYear = date_1.getFullYear() === date_2.getFullYear();

  return sameDay && sameMonth && sameYear;
};
