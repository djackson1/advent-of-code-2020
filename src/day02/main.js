const { getInputs } = require("../../utils/files");

function parseInputs() {
  const inputs = getInputs(2);

  return inputs.map((input) => {
    const values = input.split(/ |: |-/g);

    return values.map((value) => {
      return !isNaN(value) ? Number(value) : value;
    });
  });
}

function a() {
  const inputs = parseInputs();

  const validPasswordCount = inputs.reduce((acc, input) => {
    const [min, max, char, password] = input;

    const count = password.split(char).length - 1;

    if (count >= min && count <= max) {
      return acc + 1;
    }

    return acc;
  }, 0);

  console.log(`day 02 a => ${validPasswordCount}`);
}

function b() {
  const inputs = parseInputs();

  const validPasswordCount = inputs.reduce((acc, input) => {
    const [min, max, char, password] = input;

    const c1 = password[min - 1] === char;
    const c2 = password[max - 1] === char;

    if (c1 !== c2) {
      return acc + 1;
    }

    return acc;
  }, 0);

  console.log(`day 02 b => ${validPasswordCount}`);
}

// var runningAsScript = require.main === module
// if (runningAsScript) {
//   a();
//   b();
// }
