const { getInputs } = require('../../utils/files')

function getUniqueGroupAnswers (groupAnswers) {
  return groupAnswers.reduce((acc, answers) => {
    const split = answers.split('')

    split.forEach(answer => {
      acc[answer] = true
    })

    return acc
  }, {})
}

function getUniqueGroupAnswerCount (groupAnswers) {
  return Object.keys(getUniqueGroupAnswers(groupAnswers)).length
}

function getInputsSplitByDoubleNewline () {
  const inputs = getInputs(6)

  const grouped = inputs.map(i => {
    if (i === '') return '\n'
    return i
  })

  const rows = grouped.join(' ').split('\n').map(r => r.trim().split(' '))

  return rows
}

const a = () => {
  const inputs = getInputsSplitByDoubleNewline()

  const result = inputs.reduce((count, groupAnswers) => {
    return count + getUniqueGroupAnswerCount(groupAnswers)
  }, 0)
  
  console.log(`a = ${result}`)
}

const b = () => {
  console.log(`b = ${'?'}`)
}

a()
b()

module.exports = {
  getUniqueGroupAnswerCount
}