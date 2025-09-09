export default function errorFunction(message?: string, code?: number, info?: string, complement?: unknown) {
  let completeInfo = "";

  if (message) completeInfo = `Error: ${message}\n `;
  if (code) completeInfo = `Code: ${code}\n `;
  if (info) completeInfo = `Info: ${info}\n `;
  if (complement) completeInfo = `Complement: ${complement} `;

  throw new Error(completeInfo);
}