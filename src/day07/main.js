const { getInputs } = require("../../utils/files");


const SHINY_GOLD = 'shiny gold'

function createMappedInputs(bagInputs) {
  return bagInputs.reduce((acc, line) => {
    const [bag, bagsContained] = line.split(" bags contain ");

    acc[bag] = [];

    if (bagsContained !== "no other bags.") {
      const bagsSplit = bagsContained.split(", ");

      bagsSplit.forEach((bagStr) => {
        // console.log("🚀 ~ file: main.js ~ line 16 ~ returninputs.reduce ~ bagStr.replace(/ bag.| bags./g, '')", bagStr.replace(/ bag.| bags./g, ''))
        const [amount, ...bagArr] = bagStr
          .replace(/ bags\.| bags| bag\.| bag/g, "")
          .split(" ");

        const bag2 = bagArr.join(" ");

        acc[bag].push({
          amount,
          bagType: bag2
        });
      });
    }

    return acc;
  }, {});
}

function generateOutmostBagMapOfType(bagMap, bagType, outmostBag) {
  const keys = Object.keys(bagMap)

  if (keys.length === 0) return {}

  return keys.reduce((outmostBagTypes, bag) => {
    if (bag == bagType) {
      return { ...outmostBagTypes, [outmostBag]: 1 }
    }

    return {
      ...outmostBagTypes,
      ...generateOutmostBagMapOfType(bagMap[bag], bagType, outmostBag || bag)
    }
  }, {})
}

function countBagTypeInMap(bagMap, bagType) {
  const bagsWithoutBagType = { ...bagMap }
  delete bagsWithoutBagType[bagType]

  const bags = generateOutmostBagMapOfType(bagsWithoutBagType, bagType)
  return Object.keys(bags).length
}

function iterativelyCreateFullBagMap(mappedInputs) {
  const bagKeys = Object.keys(mappedInputs);

  const bagMap = {}

  let iterating = true;
  while (iterating) {
    let hasModified = false;

    bagKeys.forEach((key) => {
      if (!bagMap[key]) {
        const items = mappedInputs[key]

        const notInBagMap = !bagMap[key]
        const allInMap = items.every(({ bagType }) => bagMap[bagType])

        if (allInMap && notInBagMap) {
          const mapped = items.reduce((acc, { amount, bagType }) => {

            acc.bags[bagType] = {
              ...bagMap[bagType],
              amount: Number(amount)
            }
            return acc
          }, { amount: 1, bags: {} })

          bagMap[key] = mapped
          hasModified = true
        }
      }
    })

    if (!hasModified) {
      iterating = false;
    }
  }

  return bagMap
}

function countBagsInBag(bag) {
  const { amount, bags } = bag

  const keys = Object.keys(bags)
  if (keys === 0) {
    return amount
  }

  return amount * keys.reduce((count, bagType) => {
    const insideBags = bags[bagType]

    const newCount = countBagsInBag(insideBags)

    return count + insideBags.amount + newCount
  }, 0)
}

function bagsContainedInsideOfBagType(bagMap, bagType) {
  return countBagsInBag(bagMap[bagType])
}

const a = () => {
  const inputs = getInputs(7, { removeLastNewline: true })
  const mappedInputs = createMappedInputs(inputs);
  const fullBagMap = iterativelyCreateFullBagMap(mappedInputs);
  const outmostBagsWithShinyGold = countBagTypeInMap(fullBagMap, SHINY_GOLD)

  console.log(`a = ${outmostBagsWithShinyGold}`);
};

const b = () => {
  const inputs = getInputs(7, { removeLastNewline: true })
  const mappedInputs = createMappedInputs(inputs);
  const fullBagMap = iterativelyCreateFullBagMap(mappedInputs);
  const totalShinyGoldCount = bagsContainedInsideOfBagType(fullBagMap, SHINY_GOLD)

  console.log(`b = ${totalShinyGoldCount}`);
};

// var runningAsScript = require.main === module;
// if (runningAsScript) {
//   a();
//   b();
// }

module.exports = {
  bagsContainedInsideOfBagType,
  createMappedInputs,
  countBagTypeInMap,
  iterativelyCreateFullBagMap,
  SHINY_GOLD
};
