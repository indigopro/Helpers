import CryptoJS from 'crypto-js'

//-------------------Symmetric-------------------
export type SymmetricCryptorSettings = {
  [key: string]: {
    key: string
    iv: string
  }
}
//NOTE: sostituire CryptoJS con crypto nel tempo
export namespace SymmetricCryptor {
  const key = CryptoJS.enc.Utf8.parse('')
  const iv = CryptoJS.enc.Utf8.parse('')

  export const encrypt = (data: string, keyString: string, ivString: string): string => {
    const key = CryptoJS.enc.Utf8.parse(keyString)
    const iv = CryptoJS.enc.Utf8.parse(ivString)

    const result = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })

    return result.toString()
  }

  export const decrypt = (encrypted: string, keyString: string, ivString: string): string => {
    const key = CryptoJS.enc.Utf8.parse(keyString)
    const iv = CryptoJS.enc.Utf8.parse(ivString)

    const result = CryptoJS.AES.decrypt(encrypted, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })

    return result.toString(CryptoJS.enc.Utf8)
  }
}
