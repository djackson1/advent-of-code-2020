const { getInputs } = require('../../utils/files')

function minMax(value, min, max) {
  const number = Number(value)
  return number >= min && number <= max
}

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
const requiredFieldValidations = {
  byr: (v) => minMax(v, 1920, 2002),
  iyr: (v) => minMax(v, 2010, 2020),
  eyr: (v) => minMax(v, 2020, 2030),
  hgt: (v) => {
    const number = v.substring(0, v.length - 2)
    const type = v.substring(v.length - 2)

    if (type === 'in') {
      return minMax(number, 59, 76)
    } else if (type === 'cm') {
      return minMax(number, 150, 193)
    }
  },
  hcl: v => {
    const hash = v[0]
    const values = v.substring(1).split('')

    if (hash !== '#') return false
    if (values.length !== 6) return false

    return values.every(value => {
      return ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(value)
    })
  },
  ecl: v => {
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v)
  },
  pid: v => {
    const split = v.split('')

    if (split.length !== 9) return false

    return split.every(value => {
      return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(value)
    })
  },
}

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
  })

  return passports
}

const a = () => {
  const passports = extractPassports()

  const validPassportCount = passports.reduce((acc, p) => {
    if (requiredFields.every(field => p[field])) {
      return acc + 1
    }

    return acc
  }, 0)

  console.log(`a = ${validPassportCount}`)
}

const b = () => {
  const passports = extractPassports()

  const validPassportCount = passports.reduce((acc, p) => {
    const allRequiredFieldsValidated = requiredFields.every(field => {
      const validator = requiredFieldValidations[field]
      const value = p[field]

      if (!value) return false

      return validator(value)
    })

    if (allRequiredFieldsValidated) {
      return acc + 1
    }

    return acc
  }, 0)

  console.log(`b = ${validPassportCount}`)
}

var runningAsScript = require.main === module
if (runningAsScript) {
  a();
  b();
}
