const { getInputs } = require("../../utils/files");

export function findNthNumber(
  inputs: number[],
  turnMax: number = 2020
): number {
  const memory = new Array(turnMax);
  let turn = 1;

  inputs.forEach((i) => {
    memory[i] = [turn++];
  });

  let lastNumber = inputs[inputs.length - 1];

  for (let turn = inputs.length + 1; turn <= turnMax; turn++) {
    if(turn %500000 === 0) {
      console.log("🚀 ~ file: main.ts ~ line 26 ~ memory",turn)
    }

    const firstTimeSpoken = memory[lastNumber];

    if (!firstTimeSpoken || firstTimeSpoken.length <= 1) {

      if (!memory[0]) {
        memory[0] = [];
      }

      if (memory[0].length === 0) {
        memory[0] = [turn];
      } else if (memory[0].length === 1) {
        memory[0] = [memory[0][0], turn];
      } else if (memory[0].length >= 1) {
        memory[0] = [memory[0][1], turn];
      }

      lastNumber = 0;

      continue;
    }

    // should be?
    if (firstTimeSpoken.length >= 2) {
      const n = firstTimeSpoken[1] - firstTimeSpoken[0];

      if (!memory[n]) {
        memory[n] = [];
      }

      if (memory[n].length === 0) {
        memory[n] = [turn];
      } else if (memory[n].length === 1) {
        memory[n] = [memory[n][0], turn];
      } else if (memory[n].length >= 1) {
        memory[n] = [memory[n][1], turn];
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
  const arr = inputs[0].split(",").map(Number);
  const result = findNthNumber(arr);

  console.log(`a = ${result}`);
}

export function b() {
  const inputs = getInputs(15);
  const arr = inputs[0].split(",").map(Number);
  const result = findNthNumber(arr, 30000000);

  console.log(`b = ${result}`);
}
