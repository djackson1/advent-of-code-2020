const chai = require('chai')
const { expect } = chai
const { generateSeatID } = require('./main')

describe('day 05', () => {
  describe('part a examples', () => {
    // tests

    const scenarios = [
      { seatStr: 'BFFFBBFRRR', seatId: 567 },
      { seatStr: 'FFFBBBFRRR', seatId: 119 },
      { seatStr: 'BBFFBBFRLL', seatId: 820 }
    ]

    scenarios.forEach(({ seatStr, seatId }) => {
      it(`seat string ${seatStr} should return seatId ${seatId}`, () => {
        expect(generateSeatID(seatStr)).to.equal(seatId)
      })
    })
  })

  describe('part b examples', () => {

  })
})