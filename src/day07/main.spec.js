const chai = require("chai");
const { expect } = chai;
const { getInputs } = require("../../utils/files");
const {
  bagsContainedInsideOfBagType,
  countBagTypeInMap,
  createMappedInputs,
  iterativelyCreateFullBagMap,
  SHINY_GOLD,
} = require('./main')

describe("day 07", () => {

  describe("part a examples", () => {
    beforeEach(function () {
      this.inputs = getInputs(7, { filepath: 'input1.spec.txt', removeLastNewline: true })
      this.mappedInputs = createMappedInputs(this.inputs);
      this.bagMap = iterativelyCreateFullBagMap(this.mappedInputs)
    })
    describe("using the test input file", () => {
      it("it loads the file", function () {
        const [firstLine] = this.inputs
        expect(firstLine).to.equal('light red bags contain 1 bright white bag, 2 muted yellow bags.')
      });

      it('correctly creates a map of the input file', function () {
        // A bright white bag, which can hold your shiny gold bag directly.
        expect(this.bagMap['bright white']).to.exist
        expect(this.bagMap['bright white'].bags[SHINY_GOLD]).to.exist

        // A muted yellow bag, which can hold your shiny gold bag directly, plus some other bags.
        expect(this.bagMap['muted yellow']).to.exist
        expect(this.bagMap['muted yellow'].bags[SHINY_GOLD]).to.exist

        // A dark orange bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
        expect(this.bagMap['dark orange']).to.exist
        expect(this.bagMap['dark orange'].bags['bright white']).to.exist
        expect(this.bagMap['dark orange'].bags['bright white'].bags[SHINY_GOLD]).to.exist


        // A light red bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
        expect(this.bagMap['light red']).to.exist
        expect(this.bagMap['light red'].bags['bright white']).to.exist
        expect(this.bagMap['light red'].bags['bright white'].bags[SHINY_GOLD]).to.exist
      })

      it('should correctly count the number of "shiny gold" bags', function () {
        expect(countBagTypeInMap(this.bagMap, SHINY_GOLD)).to.equal(4)
      })
    });
  });

  describe("part b examples", () => {
    describe('bag count with input file 1', () => {
      beforeEach(function () {
        this.inputs = getInputs(7, { filepath: 'input1.spec.txt', removeLastNewline: true })
        this.mappedInputs = createMappedInputs(this.inputs);
        this.bagMap = iterativelyCreateFullBagMap(this.mappedInputs)
      })

      it('should return 32 bags', function () {
        expect(bagsContainedInsideOfBagType(this.bagMap, SHINY_GOLD)).to.equal(32)
      })
    })

    describe('bag count with input file 2', () => {
      beforeEach(function () {
        this.inputs = getInputs(7, { filepath: 'input2.spec.txt', removeLastNewline: true })
        this.mappedInputs = createMappedInputs(this.inputs);
        this.bagMap = iterativelyCreateFullBagMap(this.mappedInputs)
      })

      it('should return 32 bags', function () {
        expect(bagsContainedInsideOfBagType(this.bagMap, SHINY_GOLD)).to.equal(126)
      })
    })
  });
});
