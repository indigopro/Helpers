export const getType = (obj: any): string => Object.prototype.toString.call(obj)

export const getTypeNative = (obj: any): string =>
  getType(obj)
    .replace(/[\[\]]/g, '')
    .replace('object', '')
    .trim()
    .toLowerCase()

export const getElementType = (element?: any) => element && element.type.name

export const isString = (obj: any): boolean => {
  return getType(obj) === '[object String]'
}

export const isNumber = (obj: any): boolean => {
  return getType(obj) === '[object Number]'
}

export const isBoolean = (obj: any): boolean => {
  return getType(obj) === '[object Boolean]'
}

export const isDate = (obj: any): boolean => {
  return getType(obj) === '[object Date]'
}

export const isHtmlContent = (content: string): boolean => {
  content = content.trim()

  if (content.startsWith('<') && content.endsWith('>')) {
    if (content.substring(content.length - 2) === '/>') return true

    const tag = content.substring(1, content.indexOf('>'))
    if (content.startsWith(`<${tag}>`) && content.endsWith(`</${tag}>`)) return true
  }

  return false
}

export const convertibleToNumber = (value: string) => {
  return !isNaN(Number.parseFloat(value))
}

export const getDefaultValue = (type: 'string' | 'int' | 'float' | 'bool' | 'date') => {
  switch (type) {
    case 'string':
      return ''
    case 'int':
    case 'float':
      return 0
    case 'bool':
      return false
    case 'date':
      return new Date()
  }
}

export const changeType = (value: any, conversionType: 'string' | 'number' | 'int' | 'float' | 'bool' | 'date', defaultValue?: any): string | number | boolean | Date | undefined => {
  switch (conversionType) {
    case 'string':
      return toString(value, defaultValue)
    case 'number':
      return toInt(value, defaultValue)
    case 'int':
      return toInt(value, defaultValue)
    case 'float':
      return toNumber(value, defaultValue)
    case 'bool':
      return toBoolean(value, defaultValue)
    case 'date':
      return toDate(value, defaultValue)
  }
}

export const toString = (value: any, defaultValue?: string): string | undefined => {
  if (!value) return defaultValue ? defaultValue : undefined
  return value.toString()
}

export const toNumber = (value: string, defaultValue: number = 0): number => {
  const val = Number.parseFloat(value)
  return Number.isNaN(val) ? defaultValue : val
}

export const toInt = (value: string, defaultValue: number = 0): number => {
  const val = toNumber(value, defaultValue)
  return Math.round(val)
}

export const toBoolean = (value: string | number | boolean, defaultValue: boolean = false): boolean => {
  if (isBoolean(value)) return value as boolean

  if (!value) return defaultValue

  if (isNumber(value) && value <= 0) return false

  if (isNumber(value) && value > 0) return true

  if (isString(value)) {
    value = (value as string).toLowerCase()

    if (value == '' || value == 'false' || value == 'f' || value == 'n' || value == 'no' || value == 'off') {
      return false
    }

    if (value == 'true' || value == 't' || value == 'y' || value == 'yes' || value == 'on') {
      return true
    }
  }

  return defaultValue
}

export const toDate = (value: string | Date, defaultValue?: Date): Date | undefined => {
  if (isDate(value)) return value as Date

  if (!value) return defaultValue ? defaultValue : undefined

  if (isString(value)) return new Date(value as string)

  return defaultValue ? defaultValue : undefined
}

export const toHexColor = (color: string) => {
  const ctx = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D
  ctx.fillStyle = color
  return ctx.fillStyle
}

export const toRgbColor = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}
