import { convertToNepali } from './nepaliConverter'

export const formatBudgetValueToNepali = (value: string): string => {
  const fixedLen = 3
  const firstSplit = -3
  const secondSplit = 2

  const numericValue = parseFloat(value)
  if (isNaN(numericValue)) {
    throw new Error('Invalid number format')
  }

  const [integerPart, decimalPart] = numericValue.toFixed(secondSplit).split('.')
  let formattedIntegerPart = ''
  if (integerPart.length > fixedLen) {
    const lastThree = integerPart.slice(firstSplit)
    const remaining = integerPart.slice(0, firstSplit)
    formattedIntegerPart =
      remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree
  } else {
    formattedIntegerPart = integerPart
  }

  const formattedValue = `${formattedIntegerPart}.${decimalPart}`

  // Convert the formatted value to Nepali numerals
  const nepaliValue = convertToNepali(formattedValue)

  return nepaliValue
}
