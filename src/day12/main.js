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

function moveShip(instructions) {
  const position = { x: 0, y: 0 };
  let direction = 0;

  instructions.forEach(({ instruction, value }) => {
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

function moveWaypoint (instructions) {
  const ship = { x: 0, y: 0 }
  const waypoint = { x: 10, y: 1 }

  instructions.forEach(({ instruction, value }) => {
    switch (instruction) {
      case INSTRUCTIONS.NORTH:
        waypoint.y += value;
        break;

      case INSTRUCTIONS.SOUTH:
        waypoint.y -= value;
        break;

      case INSTRUCTIONS.EAST:
        waypoint.x += value;
        break;

      case INSTRUCTIONS.WEST:
        waypoint.x -= value;
        break;

      case INSTRUCTIONS.LEFT:
        const iterationsL = value / 90

        for(let i=0; i<iterationsL; i++) {
          const newWaypoint = {
            x: waypoint.y * -1,
            y: waypoint.x
          }
          waypoint.x = newWaypoint.x
          waypoint.y = newWaypoint.y
        }

        break;

      case INSTRUCTIONS.RIGHT:
        const iterationsR = value / 90

        for(let i=0; i<iterationsR; i++) {
          const newWaypoint = {
            x: waypoint.y,
            y: waypoint.x * -1
          }
          waypoint.x = newWaypoint.x
          waypoint.y = newWaypoint.y
        }
        break

      case INSTRUCTIONS.FORWARD:
        const distance = {
          x: waypoint.x * value,
          y: waypoint.y * value
        }

        ship.x += distance.x
        ship.y += distance.y

        break;
    }
  });

  return ship
}

const a = () => {
  const instructions = extractInstructions(inputs)
  const position = moveShip(instructions)
  const dist = Math.abs(position.x) + Math.abs(position.y)

  console.log(`a = ${dist}`);
};

const b = () => {
  const instructions = extractInstructions(inputs)
  const position = moveWaypoint(instructions)
  const dist = Math.abs(position.x) + Math.abs(position.y)

  console.log(`b = ${dist}`);
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
  moveWaypoint,
};
