export function timeSince(date) {

  var seconds = Math.floor((new Date() - new Date(date)) / 1000);
  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " año";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " meses";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " dias";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " horas";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutos";
  }
  interval = seconds / 60;
  if (interval < 1) {
    return "unos segundos";

  }

}

export const options = {  year: 'numeric', month: 'long', day: 'numeric' };
