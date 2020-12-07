const { getInputs } = require("../../utils/files");
const inputs = getInputs(7);

function createMappedInputs(bagInputs) {
  return bagInputs.reduce((acc, line) => {
    const [bag, bagsContained] = line.split(" bags contain ");

    acc[bag] = [];

    if (bagsContained !== "no other bags.") {
      const bagsSplit = bagsContained.split(", ");
      console.log(
        "🚀 ~ file: main.js ~ line 12 ~ returninputs.reduce ~ bagsSplit",
        bagsSplit
      );

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

function iterativelyCreateFullBagMap(mappedInputs) {
  const bagKeys = Object.keys(mappedInputs);

  const bagMap = { ...mappedInputs };

  let iterating = true;
  while (iterating) {
    let hasModified = false;

    bagKeys.forEach((key) => {
      const item = bagMap[key]
      console.log("🚀 ~ file: main.js ~ line 45 ~ bagKeys.forEach ~ item", item)
    });

    if (!hasModified) {
      iterating = false;
    }
  }

  return bagMap
}

const a = () => {
  const mappedInputs = createMappedInputs(inputs);
  const fullBagMap = iterativelyCreateFullBagMap(mappedInputs);
  console.log("🚀 ~ file: main.js ~ line 36 ~ a ~ fullBagMap", fullBagMap);

  console.log(`a = ${"?"}`);
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
  iterativelyCreateFullBagMap
};
