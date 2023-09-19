function getMonth(timestamp: string) {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  return month.toString();
}

export default getMonth;
