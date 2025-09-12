import { generateAESKey } from "@/utils/generateAESKey"

export async function encryptJSON(publicKey: CryptoKey, data: object) {
  const jsonString = JSON.stringify(data);

  // 1. Gerar chave AES
  const aesKey = await generateAESKey();

  // 2. Criptografar o JSON com AES
  const encoder = new TextEncoder();
  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // vetor inicial
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    encoder.encode(jsonString)
  );

  // 3. Exportar a chave AES para array
  const rawAESKey = await window.crypto.subtle.exportKey("raw", aesKey);

  // 4. Criptografar a chave AES com RSA
  const encryptedAESKey = await window.crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    publicKey,
    rawAESKey
  );

  return {
    encryptedData: btoa(String.fromCharCode(...new Uint8Array(encryptedData))),
    encryptedAESKey: btoa(String.fromCharCode(...new Uint8Array(encryptedAESKey))),
    iv: btoa(String.fromCharCode(...iv)),
  };
}