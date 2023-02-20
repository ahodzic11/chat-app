function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();

  month = month.length > 1 ? month : "0" + month;
  let day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return day + "/" + month + "/" + year;
}

export const todayDate = getFormattedDate();
const today = new Date();
const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
export const time = today.getHours() + ":" + minutes;
