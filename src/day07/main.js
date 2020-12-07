const { getInputs } = require("../../utils/files");

// remove final newline... eslint is helping
const inputs = getInputs(7).filter(r => r);

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

        acc[bag].push(bag2);
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
        const allInMap = items.every(i => bagMap[i])

        if (allInMap && notInBagMap) {
          const mapped = items.reduce((acc, i) => {
            acc[i] = bagMap[i]
            return acc
          }, {})

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

const a = () => {
  const mappedInputs = createMappedInputs(inputs);
  const fullBagMap = iterativelyCreateFullBagMap(mappedInputs);
  const outmostBagsWithShinyGold = countBagTypeInMap(fullBagMap, 'shiny gold')

  console.log(`a = ${outmostBagsWithShinyGold}`);
};

const b = () => {
  console.log(`b = ${"?"}`);
};

var runningAsScript = require.main === module;
if (runningAsScript) {
  a();
  b();
}

module.exports = {
  createMappedInputs,
  countBagTypeInMap,
  iterativelyCreateFullBagMap
};
