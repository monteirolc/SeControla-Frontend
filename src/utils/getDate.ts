export default function getDate(){
  const date = new Date()
  const year = Number(date.getFullYear);
  const month = Number(date.getMonth);

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0)

  const format = (d: Date) => {
    return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
  }

  return {
    month: month,
    year: year,
    firstDay: format(firstDay),
    lastDay: format(lastDay),
  }
}