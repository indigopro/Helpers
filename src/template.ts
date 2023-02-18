export const resolve = (
    template: string
    , replacements: { [key: string]: string }
    , match: { [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string; } = /<%=.*?%>/g
): string => template.replace(match, (match: any) => replacements[match])  