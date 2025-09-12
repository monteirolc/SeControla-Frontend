//eslint-disable-next-line
export async function decryptJSON(privateKey: CryptoKey, encrypted: any) {
  // 1. Converter base64 -> Uint8Array
  const encryptedData = Uint8Array.from(atob(encrypted.encryptedData), c => c.charCodeAt(0));
  const encryptedAESKey = Uint8Array.from(atob(encrypted.encryptedAESKey), c => c.charCodeAt(0));
  const iv = Uint8Array.from(atob(encrypted.iv), c => c.charCodeAt(0));

  // 2. Descriptografar a chave AES com RSA
  const rawAESKey = await window.crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    privateKey,
    encryptedAESKey
  );

  // 3. Importar chave AES
  const aesKey = await window.crypto.subtle.importKey(
    "raw",
    rawAESKey,
    { name: "AES-GCM" },
    true,
    ["decrypt"]
  );

  // 4. Descriptografar JSON
  const decryptedData = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    aesKey,
    encryptedData
  );

  const decoder = new TextDecoder();
  return JSON.parse(decoder.decode(decryptedData));
}