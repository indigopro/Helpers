export const getCssText = (ruleSelectors: Array<string>) =>
  ruleSelectors.map((ruleSelector) => {
    return { ruleSelector, cssText: getStyleRule(ruleSelector)?.cssText || '' }
  })

export const getStyleRule = (ruleSelector: string): CSSStyleDeclaration | null => {
  for (let i = 0; i < document.styleSheets.length; i++) {
    const sheet: CSSStyleSheet = document.styleSheets[i]
    const rules: CSSRuleList = sheet.cssRules ? sheet.cssRules : sheet.rules

    for (let j = 0; j < rules.length; j++) {
      const rule = rules[j] as CSSStyleRule

      if (rule.selectorText && rule.selectorText === ruleSelector) return rule.style

      if (rule.selectorText && rule.selectorText.split(',').length > 1 && rule.selectorText && rule.selectorText.split(',').includes(ruleSelector)) return rule.style

      if (rule.selectorText && rule.selectorText.split(' ').length > 1 && rule.selectorText && rule.selectorText.split(' ').includes(ruleSelector)) return rule.style
    }
  }
  return null
}

export const getScrollbarWidth = () => {
  // Creating invisible container
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll' // forcing scrollbar to appear
  document.body.appendChild(outer)

  // Creating inner element and placing it in the container
  const inner = document.createElement('div')
  outer.appendChild(inner)

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

  // Removing temporary elements from the DOM
  outer.parentNode?.removeChild(outer)

  return scrollbarWidth
}

export namespace zIndex {
  export const getHighest = () => {
    let highestZ = 0
    let elements = [...document.getElementsByTagName('*')] as Array<HTMLElement>
    elements.forEach((element) => {
      const style = getComputedStyle(element)
      if (style.zIndex !== 'auto' && +style.zIndex > highestZ) {
        highestZ = +style.zIndex
      }
    })

    return highestZ
  }

  export const getRange = (): Array<number> => {
    let highestZ: number = 0
    let lowestZ: number = 0
    let oneFound = false
    let elements = [...document.getElementsByTagName('*')] as Array<HTMLElement>
    if (!elements.length) {
      return Array(highestZ, lowestZ)
    }

    elements.forEach((element) => {
      if (element.style.position && element.style.zIndex) {
        if (!oneFound) {
          highestZ = lowestZ = parseInt(element.style.zIndex)
          oneFound = true
        } else {
          const ii = parseInt(element.style.zIndex)
          if (ii > highestZ) {
            highestZ = ii
          }
          if (ii < lowestZ) {
            lowestZ = ii
          }
        }
      }
    })
    return Array(highestZ, lowestZ)
  }
}
