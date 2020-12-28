const { getInputs } = require("../../utils/files");

function getValueThroughMask (value: number, currentMasks: MaskValues[]) : number {
  const binStr = [...(value >>> 0).toString(2).padStart(36, '0')]
  // console.log( binStr.join(''))
  
  currentMasks.forEach(({ bitPosition ,bitValue }) => {
    binStr[35 - bitPosition] = `${bitValue}`
  }, value)
  // console.log( binStr.join(''))

  return parseInt(binStr.join(''), 2)
}

export function runProgram(instructions: Instruction[]): number {
  const memory = {};
  let currentMasks;
  
  instructions.forEach(({ type, position, value, masks }) => {
    if (type === "mask") {
      currentMasks = masks;
    } else if (type === 'mem') {
      const newValue = getValueThroughMask(value, currentMasks)
      memory[position] = newValue
    }
  });

  // console.log("🚀 ~ file: main.ts ~ line 30 ~ runProgram ~ memory", memory)
  const memoryValues = Object.values(memory) as number[]
  const sum = memoryValues.reduce((acc, value) => acc + value, 0)

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
    
    // console.log("🚀 ~ file: main.ts ~ line 53 ~ returninputs.map ~ value", value)
    // console.log("🚀 ~ file: main.ts ~ line 53 ~ returninputs.map ~ type", type)
    if (type === "mask") {
      const masks = value.split('').reverse().reduce((acc, maskValue, idx) => {
        if(maskValue === 'X') return acc
        // console.log("🚀 ~ file: main.ts ~ line 56 ~ masks ~ maskValue", maskValue)
        // console.log("🚀 ~ file: main.ts ~ line 56 ~ masks ~ idx", idx)

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
  const sum = runProgram(instructions)

  console.log(`a = ${sum}`);
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