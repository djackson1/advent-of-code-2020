const { getInputs } = require("../../utils/files");
const inputs = getInputs(12);

const DIRS = {
  0: { x: 1, y: 0 },
  90: { x: 0, y: -1 },
  180: { x: -1, y: 0 },
  270: { x: 0, y: 1 },
};

const INSTRUCTIONS = {
  NORTH: "N",
  EAST: "E",
  SOUTH: "S",
  WEST: "W",
  LEFT: "L",
  RIGHT: "R",
  FORWARD: "F",
};

function extractInstructions(inputs) {
  return inputs.map((i) => {
    const instruction = i[0];
    const value = Number(i.slice(1));

    return {
      instruction,
      value,
    };
  });
}

function moveShip(inputs) {
  const position = { x: 0, y: 0 };
  let direction = 0;

  inputs.forEach(({ instruction, value }) => {
    switch (instruction) {
      case INSTRUCTIONS.NORTH:
        position.y += value;
        break;

      case INSTRUCTIONS.SOUTH:
        position.y -= value;
        break;

      case INSTRUCTIONS.EAST:
        position.x += value;
        break;

      case INSTRUCTIONS.WEST:
        position.x -= value;
        break;

      case INSTRUCTIONS.LEFT:
        direction -= value;
        if (direction < 0) {
          direction += 360;
        }
        break;

      case INSTRUCTIONS.RIGHT:
        direction += value;
        if (direction >= 360) {
          direction -= 360;
        }
        break;

      case INSTRUCTIONS.FORWARD:
        const dir = DIRS[direction];
        position.x += dir.x * value;
        position.y += dir.y * value;
        break;
    }
  });

  return position
}

const a = () => {
  const instructions = extractInstructions(inputs)
  const position = moveShip(instructions)
  const dist = Math.abs(position.x) + Math.abs(position.y)

  console.log(`a = ${dist}`);
};

const b = () => {
  console.log(`b = ${"?"}`);
};

var runningAsScript = require.main === module;
if (runningAsScript) {
  a();
  b();
}

module.exports = {
  a,
  b,
  extractInstructions,
  moveShip,
};
