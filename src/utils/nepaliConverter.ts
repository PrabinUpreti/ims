const nepaliNumbers = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९']

export const convertToNepali = (num: number | string) => {
  return num
    .toString()
    .split('')
    .map(digit => {
      if (/\d/.test(digit)) {
        return nepaliNumbers[Number(digit)]
      }
      return digit
    })
    .join('')
}
