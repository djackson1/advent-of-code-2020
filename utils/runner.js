const { argv } = require('yargs')

const run = () => {
  const [dayRaw, part] = argv._
  const day = Number(dayRaw) < 10 ? `0${dayRaw}` : dayRaw

  const daySolutions = require(`../src/day${day}/main.js`)

  if (part === 'a' || part === 'b') {
    daySolutions[part]()
  } else {
    console.log(`Not sure how to run part "${part}"`)
  }
}

run()
