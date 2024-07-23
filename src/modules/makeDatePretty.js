import dateFormat from 'dateformat';

export default function makeDatePretty(date) {
  const prettyDate = dateFormat(Date.parse(date), "dddd dd.mm.yyyy HH:MM");
  return prettyDate;
};