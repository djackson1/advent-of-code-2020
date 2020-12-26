const { getInputs } = require("../../utils/files");

function updateBit(number, bitPosition, bitValue) {
  const bitValueNormalized = bitValue ? 1 : 0;
  const clearMask = ~(1 << bitPosition);
  return (number & clearMask) | (bitValueNormalized << bitPosition);
}

function getValueThroughMask (value: number, currentMasks: MaskValues[]) : number {
  return currentMasks.reduce((currentNumber, { bitPosition ,bitValue }) => {
    return updateBit(value, bitPosition, bitValue)
  }, value)
}

export function runProgram(instructions: Instruction[]): number {
  const memory = {};
  let currentMasks;
  
  instructions.forEach(({ type, position, value, masks }) => {
    if (type === "mask") {
      currentMasks = masks;
    } else if (type === 'mem') {
      const newValue = getValueThroughMask(value as number, currentMasks)
      console.log("🚀 ~ file: main.ts ~ line 23 ~ instructions.forEach ~ newValue", newValue)
      memory[position] = newValue
    }
  });
  console.log("🚀 ~ file: main.ts ~ line 16 ~ runProgram ~ memory", memory)

  const sum = Object.values(memory).reduce((acc, value) => acc as number + (value as number), 0) as number

  return sum
}

type MaskValues = {
  bitPosition: number,
  bitValue: number
}

type Instruction = {
  type: string,
  value?: number,
  masks?: MaskValues[],
  position?: number,
}

export function getInstructions(inputs): Instruction[] {
  return inputs.map((input) => {
    const [type, value] = input.split("=").map((s) => s.trim());
    
    if (type === "mask") {
      const masks = value.split('').reverse().reduce((acc, maskValue, idx) => {
        if(maskValue === 'X') return acc

        acc.push({
          bitPosition: idx,
          bitValue: Number(maskValue)
        })

        return acc
      }, [])

      return {
        type,
        masks
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