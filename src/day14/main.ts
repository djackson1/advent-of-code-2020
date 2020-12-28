const { getInputs } = require("../../utils/files");

function getBinaryStr(value: number) {
  return [...(value >>> 0).toString(2).padStart(36, "0")];
}

// JS can only shift up to 2^32 so we have to convert to a string and manipulate
// it that way
function getValueThroughMask(
  value: number,
  currentMasks: MaskValues[]
): number {
  // turn the integer into a binary string and turn into array of numbers
  const binStr = getBinaryStr(value); //

  // for each mask, update the bit position with the value
  currentMasks.forEach(({ bitPosition, bitValue }) => {
    if (bitValue !== "X") {
      binStr[35 - bitPosition] = bitValue;
    }
  });

  // turn the binary digit array back into a number
  return parseInt(binStr.join(""), 2);
}

type AddressValue = {
  address: number;
  value: number;
};

// '00XX'.split('X')
// [ '00', '', '' ] - 2^3 = 8 = 000/001/010/011/100/101/110/111

// 00XX
// =>

// 001X
// 000X
// =>

// 0011
// 0010
// 0001
// 0000

function processAddresses(addresses: string[]): string[] {
  let processing = true;
  let arr = addresses;
  while (processing) {
    processing = false;
    arr = arr.reduce((acc, str) => {
      const n = str.indexOf("X");

      if (n === -1) {
        acc.push(str);
        return acc;
      }

      processing = true;

      const [strStart, ...strEnd] = str.split("X");

      acc.push(`${strStart}0${strEnd.join("X")}`);
      acc.push(`${strStart}1${strEnd.join("X")}`);

      return acc;
    }, []);
  }

  return arr
}

function getAddressesThroughMaskV2(
  position: number,
  currentMasks: MaskValues[]
): number[] {
  const posBinStr = getBinaryStr(position);

  const posBinStrAltered = currentMasks.reduce(
    (acc, { bitPosition, bitValue }) => {
      const index = 35 - bitPosition;
      if (bitValue === "1" || bitValue === "X") {
        acc[index] = bitValue;
      }

      return acc;
    },
    [...posBinStr]
  );

  const addresses = processAddresses([posBinStrAltered.join("")])

  return addresses.map(str => parseInt(str, 2))
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
      const addresses = getAddressesThroughMaskV2(position, currentMasks);
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

export function getInstructions(inputs): Instruction[] {
  return inputs.map((input) => {
    const [type, value] = input.split("=").map((s) => s.trim());

    if (type === "mask") {
      const masks = value
        .split("")
        .reverse()
        .reduce((acc, maskValue, idx) => {
          // if(maskValue === 'X') return acc

          acc.push({
            bitPosition: idx,
            bitValue: maskValue,
          });

          return acc;
        }, []);

      return {
        type,
        masks,
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
  const sum = runProgram(instructions);

  console.log(`a = ${sum}`);
}

export function b() {
  const inputs = getInputs(14);
  console.log(`b = ${"?"}`);
}
