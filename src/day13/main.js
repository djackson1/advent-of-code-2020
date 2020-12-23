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

function findDiffsForAllSequences(busIds) {
  const [base, ...rest] = busIds;

  return rest.reduce((acc, { busId, idx }) => {
    let lastKnown = -1;
    let initial = -1
    let busTime = 0;

    if (isNaN(busId)) return acc;

    while (true) {
      if ((busTime + idx) % busId === 0) {
        if (lastKnown === -1) {
          lastKnown = busTime;
          initial = busTime
        } else {
          acc.push({ initial, busId, idx, diff: busTime - lastKnown });
          return acc;
        }
      }

      busTime += base.busId;
    }
  }, []);
}

function findSubsequentDepartureTimes(inputs) {
  const extractedInputs = extractInputs(inputs);
  const { busIds } = extractedInputs;

  const diffs = findDiffsForAllSequences(busIds);
  // console.log(
  //   "🚀 ~ file: main.js ~ line 75 ~ findSubsequentDepartureTimes ~ diffs",
  //   diffs
  // );

  const maxDiff = diffs.reduce((max, bus) => {
    if(bus.diff > max.diff) return bus
    return max
  }, { diff: -1})
  // console.log("🚀 ~ file: main.js ~ line 87 ~ maxDiff ~ maxDiff", maxDiff)

  let {initial, diff} = maxDiff
  
  const otherBuses = diffs.filter(({busId }) => busId !== maxDiff.busId)

  while(true){
    const allDivide = otherBuses.every(b => {
      return ((initial + b.idx) %  b.busId)=== 0
    })

    if(allDivide) return initial

    initial += diff
  }

  // diffs.forEach(({ initial, busId, diff }) => {
  //   console.log("🚀 ~ file: main.js ~ line 82 ~ diffs.forEach ~ diff", diff);

  //   const N = diff > 3000 ? 190 : 2000;

  //   [...Array(N).keys()].forEach((i) => {
  //     console.log(i+1, diff * (i+1), initial + diff * (i+1), (754018) / (initial + diff * (i+1)))
  //   });
  // });

  // let busTime = 0;
  // let incrementor = busIds[0].busId;

  // const values = busIds[3]

  // let lastKnown = -1;

  // while (true) {
  //   if ((busTime + values.idx) % values.busId === 0) {
  //     console.log(`TIME[${busTime}] ${lastKnown > -1 ? `DIFF ${busTime - lastKnown}` : ''}`);

  //     lastKnown = busTime;
  //   }

  //   busTime += incrementor;

  //   if (busTime >= 5000) {
  //     break;
  //   }
  // }
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

  // return busTime;
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
