const { getInputs } = require("../../utils/files");

const Types = {
  MASK: 'mask',
  MEM: 'mem'
}

function getBinaryStrArr(value: number): string[] {
  return [...(value >>> 0).toString(2).padStart(36, "0")];
}

function binaryStrToInt(binaryStr: string | string[]) {
  if (Array.isArray(binaryStr)) {
    return parseInt(binaryStr.join(""), 2);
  }

  return parseInt(binaryStr, 2);
}

// JS can only shift up to 2^32 so we have to convert to a string and manipulate
// it that way
function getValueThroughMask(
  value: number,
  currentMasks: MaskValues[]
): number {
  // turn the integer into a binary string and turn into array of numbers
  const binStr = getBinaryStrArr(value);

  // for each mask, update the bit position with the value
  currentMasks.forEach(({ bitPosition, bitValue }) => {
    if (bitValue !== "X") {
      binStr[35 - bitPosition] = bitValue;
    }
  });

  // turn the binary digit array back into a number
  return binaryStrToInt(binStr);
}

function processAddresses(addresses: string[]): string[] {
  const finalArr = [];
  const unprocessedArr = [...addresses];

  while (unprocessedArr.length > 0) {
    const address = unprocessedArr.pop();

    const xIndex = address.indexOf("X");

    if (xIndex === -1) {
      finalArr.push(address);
      continue;
    }

    const strStart = address.substring(0, xIndex);
    const strEnd = address.substring(xIndex + 1);

    unprocessedArr.push(`${strStart}0${strEnd}`);
    unprocessedArr.push(`${strStart}1${strEnd}`);
  }

  return finalArr;
}

function getAddressesThroughMask(
  position: number,
  currentMasks: MaskValues[]
): number[] {
  const posStr = getBinaryStrArr(position);

  const posStrMasked = currentMasks.reduce(
    (acc, { bitPosition, bitValue }) => {
      const index = 35 - bitPosition;
      
      if (bitValue === "1" || bitValue === "X") {
        acc[index] = bitValue;
      }

      return acc;
    },
    [...posStr]
  );

  const posStrValue = posStrMasked.join('')
  const addresses = processAddresses([posStrValue]);
  return addresses.map(binaryStrToInt)
}

function sumOfMemoryValues(memory: Object): number {
  const memoryValues = Object.values(memory) as number[];
  const sum = memoryValues.reduce((acc, value) => acc + value, 0);

  return sum;
}

export function runProgram(instructions: Instruction[]): number {
  const memory = {};
  let currentMasks;

  instructions.forEach(({ type, position, value, masks }) => {
    if (type === "mask") {
      currentMasks = masks;
    } else if (type === "mem") {
      const newValue = getValueThroughMask(value, currentMasks);
      memory[position] = newValue;
    }
  });

  return sumOfMemoryValues(memory);
}

export function runProgramV2(instructions: Instruction[]): number {
  const memory = {};
  let currentMasks;

  instructions.forEach(({ type, position, value, masks }) => {
    if (type === "mask") {
      currentMasks = masks;
    } else if (type === "mem") {
      const addresses = getAddressesThroughMask(position, currentMasks);

      addresses.forEach((address) => {
        memory[address] = value;
      });
    }
  });

  return sumOfMemoryValues(memory);
}

type MaskValues = {
  bitPosition: number;
  bitValue: string;
};

type Instruction = {
  type: string;
  value?: number;
  masks?: MaskValues[];
  position?: number;
};

function extractMasks(value: string): MaskValues[] {
  return value
    .split("")
    .reverse()
    .reduce((acc, maskValue, idx) => {
      acc.push({
        bitPosition: idx,
        bitValue: maskValue,
      });

      return acc;
    }, []);
}

export function getInstructions(inputs): Instruction[] {
  return inputs.map((input) => {
    const [type, value] = input.split("=").map((s) => s.trim());

    if (type === Types.MASK) {
      const masks = extractMasks(value);

      return {
        type,
        masks,
      };
    } else if (type.substr(0, 3) === Types.MEM) {
      const position = Number(type.substr(4, type.length - 5));

      return {
        type: Types.MEM,
        position,
        value: Number(value),
      };
    }
  });
}

export function a() {
  const inputs = getInputs(14);
  const instructions = getInstructions(inputs);
  const sum = runProgram(instructions);

  console.log(`a = ${sum}`);
}

export function b() {
  const inputs = getInputs(14);
  const instructions = getInstructions(inputs);
  const sum = runProgramV2(instructions);

  console.log(`b = ${sum}`);
}
