// 단순 변환 함수
const JDMonthTextChanger = (Month) => {
  if (Month === 'December' || Month === 0) return '12월';
  if (Month === 'November' || Month === 1) return '11월';
  if (Month === 'October' || Month === 2) return '10월';
  if (Month === 'September' || Month === 3) return '9월';
  if (Month === 'August' || Month === 4) return '8월';
  if (Month === 'July' || Month === 5) return '7월';
  if (Month === 'June' || Month === 6) return '6월';
  if (Month === 'May' || Month === 7) return '5월';
  if (Month === 'April' || Month === 8) return '4월';
  if (Month === 'March' || Month === 9) return '3월';
  if (Month === 'February' || Month === 10) return '2월';
  if (Month === 'January' || Month === 11) return '1월';
  console.err('JDMonthTextChanger');
  return '';
};

const JDWeekChanger = (number) => {
  const weekLanguage = ['일', '월', '화', '수', '목', '금', '토'];
  return weekLanguage[number % 7];
};

export { JDMonthTextChanger, JDWeekChanger };
