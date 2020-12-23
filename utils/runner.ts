const { argv } = require('yargs')

const PART_BOTH = 'both';

(function () {  
  const [dayRaw, part] = argv._
  const day = Number(dayRaw) < 10 ? `0${Number(dayRaw)}` : Number(dayRaw)
  
  if (!dayRaw) {
    return console.error('No day string => "npm run start 1 a"')
  }
  
  if (!part) {
    return console.error('No part to solve string => "npm run start 1 a"')
  }
  
  const daySolutions = require(`../src/day${day}/main.js`)
  
  if (part !== PART_BOTH && !daySolutions[part]) {
    return console.error(`Can't run part "${part}" for day "${day}"`)
  }
  
  if (part === PART_BOTH) {
    daySolutions.a()
    daySolutions.b()
  } else if (part === 'a' || part === 'b') {
    daySolutions[part]()
  } else {
    console.log(`Not sure how to run part "${part}"`)
  }
})()
