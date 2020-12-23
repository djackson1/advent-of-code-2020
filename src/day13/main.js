const { getInputs } = require("../../utils/files");

function extractInputs(inputs) {
  const timestamp = Number(inputs[0]);
  const busIds = inputs[1].split(",").reduce((acc, busId, idx) => {
    if (!busId) return acc;

    acc.push({
      busId: Number(busId),
      idx,
    });

    return acc;
  }, []);

  return {
    timestamp,
    busIds,
  };
}

function findClosestBusTime(inputs) {
  const { busIds, timestamp } = extractInputs(inputs);

  for (let busTime = timestamp; ; busTime++) {
    const busId = busIds.reduce((acc, { busId }) => {
      if (Number.isInteger(busTime / busId)) {
        return busId;
      }
      return acc;
    }, -1);

    if (busId > -1) {
      return {
        busId,
        busTime,
        timestamp,
      };
    }
  }
}

function findSubsequentDepartureTimes(inputs) {
  const extractedInputs = extractInputs(inputs);
  console.log("🚀 ~ file: main.js ~ line 45 ~ findSubsequentDepartureTimes ~ extractedInputs", extractedInputs)
  const { busIds } = extractedInputs

  // let busTime = 0;
  // while (true) {
  //   console.log('1068781', 1068781)
  //   console.log('busTime', busTime)

  //   // const canDepartSubsequently = busIds.every(({ busId, idx } ) => {
  //   //   if(isNaN(busId)) return true
      
  //   //   return Number.isInteger((busTime + idx) / busId);
  //   // });

  //   // if (canDepartSubsequently) break;

  //   // busTime += busIds[0].busId;

  //   busTime += 59

  //   if(busTime === 1068786) break
  // }

  return busTime 
}

function partASolution(inputs) {
  const { busId, busTime, timestamp } = findClosestBusTime(inputs);

  return (busTime - timestamp) * busId;
}

const a = () => {
  const inputs = getInputs(13);
  console.log(`a = ${partASolution(inputs)}`);
};

const b = () => {
  const inputs = getInputs(13);
  console.log(`b = ${"?"}`);
};

// var runningAsScript = require.main === module;
// if (runningAsScript) {
//   a();
//   b();
// }

module.exports = {
  a,
  b,
  partASolution,
  findClosestBusTime,
  findSubsequentDepartureTimes,
};
