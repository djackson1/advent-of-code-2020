const { getInputs } = require('../../utils/files')

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

function extractPassports() {
  const inputs = getInputs(4)

  const grouped = inputs.map(i => {
    if (i === '') return '\n'
    return i
  })

  const rows = grouped.join(' ').split('\n').map(r => r.trim())

  const passports = rows.map(r => {
    const split = r.split(' ')

    return properties = split.reduce((acc, s) => {
      const [k, v] = s.split(':')
      acc[k] = v
      return acc
    }, {})

    return properties
  })

  return passports
}

const a = () => {
  const passports = extractPassports()

  const validPassports = passports.reduce((acc, p) => {
    if (requiredFields.every(field => p[field])) {
      return acc + 1
    }

    return acc
  }, 0)

  console.log(`a = ${validPassports}`)
}

const b = () => {
  console.log(`b = ${'?'}`)
}

a()
b()
