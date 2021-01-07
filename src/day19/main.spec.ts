import chai = require('chai')
const { expect } = chai
import { getInputs } from '../../utils/files'
import { extractFileDetails } from './main'

describe('day 19', () => {
  beforeEach(function () {
    this.inputs = getInputs(19, { filepath: 'input.spec.txt' })

    const { rules, messages } = extractFileDetails(this.inputs)

    this.rules = rules
    this.messages = messages
  })

  it('should extract file details', function () {
    expect(this.rules).to.deep.equal([
      '0: 4 1 5',
      '1: 2 3 | 3 2',
      '2: 4 4 | 5 5',
      '3: 4 5 | 5 4',
      '4: "a"',
      '5: "b"'
    ])
    expect(this.messages).to.deep.equal(['ababbb', 'bababa', 'abbbab', 'aaabbb', 'aaaabbb'])
  })

  // Your goal is to determine the number of messages that completely match rule 0.
  // In the above example, ababbb and abbbab match, but bababa, aaabbb, and aaaabbb do not, producing the answer 2.
  // The whole message must match all of rule 0; there can't be extra unmatched characters in the message.
  // (For example, aaaabbb might appear to match rule 0 above, but it has an extra unmatched b on the end.)
  describe('part a examples', () => {
    const scenarios = [

    ]
    
    it('should find the count of matching messages', function () {
      
    })
  })

  describe('part b examples', () => {
    // tests
  })
})
