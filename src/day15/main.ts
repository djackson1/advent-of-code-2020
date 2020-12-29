const { getInputs } = require("../../utils/files");

export function findNthNumber(
  inputs: number[],
  turnMax: number = 2020
): number {
  console.log("🚀 ~ file: main.ts ~ line 7 ~ turnMax", turnMax)
  const memory = inputs.reduce((acc, i, idx) => {
    if (!acc[i]) acc[i] = [];

    acc[i].push(idx + 1);

    if (acc[i].length === 3) acc[i].shift();

    return acc;
  }, {});

  let lastNumber = inputs[inputs.length - 1];
  
  for (let turn = inputs.length + 1; turn <= turnMax; turn++) {
    const firstTimeSpoken = memory[lastNumber];

    if (!firstTimeSpoken || firstTimeSpoken.length <= 1) {

      if (!memory[0]) {
        memory[0] = [];
      }
      memory[0].push(turn);

      if (memory[0].length === 3) {
        memory[0].shift();
      }
      lastNumber = 0;

      continue;
    }

    // should be?
    if (firstTimeSpoken.length === 2) {
      const n = firstTimeSpoken[1] - firstTimeSpoken[0];

      if (!memory[n]) {
        memory[n] = [];
      }

      memory[n].push(turn);

      if (memory[n].length === 3) {
        memory[n].shift();
      }

      lastNumber = n;

      continue;
    }

    console.log("unknown?");
  }

  return lastNumber;
}

export function a() {
  const inputs = getInputs(15);
  console.log(`a = ${"?"}`);
}

export function b() {
  const inputs = getInputs(15);
  console.log(`b = ${"?"}`);
}
