export default function stringDate(date: string | unknown): string{
  const dateString = String(date)
  const arrayDate = dateString.split('-')
  return `${arrayDate[1]}/${arrayDate[2]}/${arrayDate[0]}`
}