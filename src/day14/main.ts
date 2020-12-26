const { getInputs } = require("../../utils/files");

function updateBit(number, bitPosition, bitValue) {
  const bitValueNormalized = bitValue ? 1 : 0;
  const clearMask = ~(1 << bitPosition);
  return (number & clearMask) | (bitValueNormalized << bitPosition);
}

function getValueThroughMask (value: number, currentMask: string) : number {
  
  return value
}

function runProgram(instructions: Instruction[]): number {
  const memory = {};
  let currentMask;
  
  instructions.forEach(({ type, position, value }) => {
    if (type === "mask") {
      currentMask = value;
    } else if (type === 'mem') {
      const newValue = getValueThroughMask(value as number, currentMask)
      console.log("🚀 ~ file: main.ts ~ line 23 ~ instructions.forEach ~ newValue", newValue)
    }
  });
  console.log("🚀 ~ file: main.ts ~ line 16 ~ runProgram ~ memory", memory)

  return -1
}

type MaskValues = {
  bitPosition: number,
  bitValue: number
}

type Instruction = {
  type: string,
  value: number,
  masks: MaskValues[],
  position?: number,
}

export function getInstructions(inputs): Instruction[] {
  return inputs.map((input) => {
    const [type, value] = input.split("=").map((s) => s.trim());
    console.log("🚀 ~ file: main.ts ~ line 46 ~ returninputs.map ~ value", value)

    if (type === "mask") {
      return {
        type,
        value,
      };
    } else if (type.substr(0, 3) === "mem") {
      const position = Number(type.substr(4, type.length - 5));

      return {
        type: "mem",
        position,
        value: Number(value),
      };
    }
  });
}

export function a() {
  const inputs = getInputs(14);
  const instructions = getInstructions(inputs);

  console.log(`a = ${"?"}`);
}

export function b() {
  const inputs = getInputs(14);
  console.log(`b = ${"?"}`);
}

// module.exports = {
//   a,
//   b,
//   getInstructions,
// };

// export {};