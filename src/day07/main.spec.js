const chai = require("chai");
const { expect } = chai;
const { getInputs } = require("../../utils/files");
const { countBagTypeInMap, createMappedInputs, iterativelyCreateFullBagMap } = require('./main')

describe("day 07", () => {
  describe("part a examples", () => {
    describe("using the test input file", () => {
      beforeEach(function () {
        this.inputs = getInputs(7, { filepath: 'input.spec.txt' })
        this.mappedInputs = createMappedInputs(this.inputs);
        this.bagMap = iterativelyCreateFullBagMap(this.mappedInputs)
      })

      it("it loads the file", function () {
        const [firstLine] = this.inputs
        expect(firstLine).to.equal('light red bags contain 1 bright white bag, 2 muted yellow bags.')
      });

      it('correctly creates a map the inputs file lines', function () {

        // A bright white bag, which can hold your shiny gold bag directly.
        expect(this.bagMap['bright white']).to.exist
        expect(this.bagMap['bright white']['shiny gold']).to.exist

        // A muted yellow bag, which can hold your shiny gold bag directly, plus some other bags.
        expect(this.bagMap['muted yellow']).to.exist
        expect(this.bagMap['muted yellow']['shiny gold']).to.exist

        // A dark orange bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
        expect(this.bagMap['dark orange']).to.exist
        expect(this.bagMap['dark orange']['bright white']).to.exist
        expect(this.bagMap['dark orange']['bright white']['shiny gold']).to.exist


        // A light red bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
        expect(this.bagMap['light red']).to.exist
        expect(this.bagMap['light red']['bright white']).to.exist
        expect(this.bagMap['light red']['bright white']['shiny gold']).to.exist
      })

      it('should correctly count the number of "shiny gold" bags', function () {
        expect(countBagTypeInMap(this.bagMap, 'shiny gold')).to.equal(4)
      })
    });
  });

  describe("part b examples", () => {
    // tests
  });
});
