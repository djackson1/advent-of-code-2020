const { getInputs } = require('../../utils/files')

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

const requiredFieldValidations = {
  byr: (v) => {
    const n = Number(v)
    return n >= 1920 && n <= 2002
  },
  iyr: (v) => {
    const n = Number(v)
    return n >= 2010 && n <= 2020
  },
  eyr: (v) => {
    const n = Number(v)
    return n >= 2020 && n <= 2030
  },
  hgt: (v) => {
    if (!v) return false

    const number = Number(v.substring(0, v.length - 2))
    const type = v.substring(v.length - 2)

    if (type === 'in') {
      return number >= 59 && number <= 76
    } else if (type === 'cm') {
      return number >= 150 && number <= 193
    }
  },
  hcl: v => {
    if (!v) return false

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
    if (!v) return false

    const split = v.split('')

    if (split.length !== 9) return false

    return split.every(value => {
      return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(value)
    })
  },
  cid: () => {
    return true
  }
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

  const validPassports = passports.reduce((acc, p) => {
    if (requiredFields.every(field => p[field])) {
      return acc + 1
    }

    return acc
  }, 0)

  console.log(`a = ${validPassports}`)
}

const b = () => {
  const passports = extractPassports()

  const validPassports = passports.reduce((acc, p) => {
    const allRequiredFieldsValidated = requiredFields.every(field => {
      const validator = requiredFieldValidations[field]
      const value = p[field]

      return validator(value)

    })

    if (allRequiredFieldsValidated) {
      return acc + 1
    }
    return acc
  }, 0)

  console.log(`b = ${validPassports}`)
}

a()
b()
