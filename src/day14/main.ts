const { getInputs } = require("../../utils/files");

// JS can only shift up to 2^32 so we have to convert to a string and manipulate
// it that way
function getValueThroughMask (value: number, currentMasks: MaskValues[]) : number {
  // turn the integer into a binary string and turn into array of numbers
  const binStr = [...(value >>> 0).toString(2).padStart(36, '0')].map(Number)
  
  // for each mask, update the bit position with the value
  currentMasks.forEach(({ bitPosition ,bitValue }) => {
    binStr[35 - bitPosition] = bitValue
  }, value)

  // turn the binary digit array back into a number
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
  const sum = runProgram(instructions)

  console.log(`a = ${sum}`);
}

export function b() {
  const inputs = getInputs(14);
  console.log(`b = ${"?"}`);
}
