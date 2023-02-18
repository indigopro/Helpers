export const isValidHttpUrl = (url: string) => {
  let urlIstance

  try {
    urlIstance = new URL(url)
  } catch (_) {
    return false
  }

  return urlIstance.protocol === 'http:' || urlIstance.protocol === 'https:'
}
