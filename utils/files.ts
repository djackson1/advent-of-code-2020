const fs = require("fs-extra");
const path = require("path");

function getDayString (day: number) : string {
  if (day < 10) return `0${day}`;
  return `${day}`;
};

function getInputsRaw (day: number, filepath: string) : string {
  const dayDir = path.resolve(
    __dirname,
    `../src/day${getDayString(day)}`,
    filepath
  );

  return fs.readFileSync(dayDir, "utf-8");
};


type Options = {
  splitByNewLine: boolean
  splitByComma: boolean
  splitter: string
  filepath: string
  fn: Function | null
}

const getInputs = (
  day: number,
  {
    splitByNewLine = true,
    splitByComma = false,
    splitter = null,
    filepath = 'input.txt',
    fn = null
  } = {}
) => {
  const inputs = getInputsRaw(day, filepath);

  function getInput(): string[] {
    if (splitter) {
      return inputs.split(splitter).map((r) => r.trim());
    } else if (splitByNewLine && splitByComma) {
      throw new Error("cant return string[][] ????")
      // return inputs.split("\n").map((r) => r.trim().split(","));
    } else if (splitByNewLine) {
      return inputs.split("\n");
    } else if (splitByComma) {
      return inputs.split(",");
    }
  }

  const input = getInput()

  const trimmed = (input[input.length - 1] === '')
    ? input.slice(0, input.length - 1)
    : input

  if (fn) {
    return trimmed.map(value => fn(value))
  }

  return trimmed;
};

module.exports = {
  getInputsRaw,
  getInputs,
};
