const { getInputs } = require("../../utils/files");
const inputs = createSortedInputs(getInputs(10, { fn: Number }));

function createSortedInputs(input) {
  return [0, ...input].sort((i, j) => i - j);
}

function diffsFromInputs(inputs) {
  const diffs = inputs.map((a, id) => {
    const item2 = inputs[id + 1];

    // if no item we are at end of list, next increase is always the max of +3
    if (isNaN(item2)) return 3;

    return item2 - a;
  });

  return diffs;
}

function findAdapterJoltageDifference(inputs) {
  const diffs = diffsFromInputs(inputs);

  const counts = diffs.reduce((acc, i) => {
    if (!acc[i]) acc[i] = 0;
    acc[i] += 1;

    return acc;
  }, {});

  return counts;
}

// 1 1 2 1 1 1 1
// 0 1 4 5 6 9 12
// 0 1 4   6 9 12

//      2 1 
// 1 1 3 2 1 1 1  1  1
// 0 1 4 5 6 7 10 13 16
// 0 1 4 5   7 10 13 16
// 0 1 4   6 7 10 13 16
//

// N =
//       3           2           = 6
// 0, 1, 4, 5, 6, 7, 10, 11, 12
// 0, 1, 4, 5,    7, 10, 11, 12
// 0, 1, 4,       7, 10, 11, 12
// 0, 1, 4, 5, 6, 7, 10,     12
// 0, 1, 4, 5,    7, 10,     12
// 0, 1, 4,       7, 10,     12

// how many can go to
// 1  1  2  1  2   1   1   1
// 0, 2, 5, 6, 8, 10, 11, 12, 15, (18)
// 0, 2, 5, 6, 8, 10,     12, 15, (18)
// 0, 2, 5,    8, 10, 11, 12, 15, (18)
// 0, 2, 5,    8, 10,     12, 15, (18)

// 12, 15, 16, 19, (22)
//
//                     x 3         x 2         x 1
//                     2^(3-1) =4  2^(2-1) =2  2^(1-0) = 1
// TO NEXT  => 1    3  1  1  1  3  1   1   3   1   3   3
//             (0), 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19, (22) 1
//             (0), 1, 4,    6, 7, 10, 11, 12, 15, 16, 19, (22)  2
//             (0), 1, 4, 5,    7, 10, 11, 12, 15, 16, 19, (22)
//             (0), 1, 4,       7, 10, 11, 12, 15, 16, 19, (22) 1

//             (0), 1, 4, 5, 6, 7, 10,     12, 15, 16, 19, (22)
//             (0), 1, 4, 5,    7, 10,     12, 15, 16, 19, (22)
//             (0), 1, 4,    6, 7, 10,     12, 15, 16, 19, (22)
//             (0), 1, 4,       7, 10,     12, 15, 16, 19, (22)

//

// 1 => 1
// 4 => 3
// 5 => 3
// 6 => 2
// 7 => 1

// how many ways to get to?
// 14 (11) = 1
// 11 (8) = 1
// 8 (5,6,7) = 3
// 7 (4,5,6) = 3
// 6 (4,5) = 2
// 5 (4) = 1
// 4 (1) = 1



// nPr = n!/(n-r)!
// n! = 6! = 6 x 5 x 4 x 3 x 2 x 1
// n! = 720


// 4 
// 4! = 24
// = 7?
//  1x1    1x4         
//  1   3  1  1  1  1  3  3   
//         
//  1   1  3  3  2  1  1  1   1
// (0), 1, 4, 5, 6, 7, 8, 11, 14 1
// (0), 1, 4, 5, 6,    8, 11, 14 3
// (0), 1, 4, 5,    7, 8, 11, 14
// (0), 1, 4,    6, 7, 8, 11, 14 
// (0), 1, 4, 5,       8, 11, 14 3
// (0), 1, 4,    6,    8, 11, 14
// (0), 1, 4,       7, 8, 11, 14 

// = 2
// (0), 1, 4, 5, 7, 10, (13) 1
// (0), 1, 4,    7, 10, (13) 1

//    
// (0), 1, 4, 5, 6, 7, 10, (13)
// (0), 1, 4, 5,    7, 10, (13)
// (0), 1, 4,    6, 7, 10, (13)
// (0), 1, 4,       7, 10, (13)

// 3  1  1  3  1  1   1   3   3
// 1, 4, 5, 6, 9, 10, 11, 14, 17

//                     x3          x2          x1
//                     2^(3-1) =4  2^(2-1) =2  2^(1-0) = 1
// TO NEXT  => 1    3  1  1  1  3  1   1   3   1   3   3
//             (0), 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19, (22) 1
function getArrangementCount(inputs) {
  const diffs = diffsFromInputs(inputs);

  const groupSingles = [];
  let count = 0;

  for (let i = 0; i < diffs.length; i++) {
    if (diffs[i] === 1) {
      count += 1;
    } else {
      if (count > 0) {
        groupSingles.push(count);
        count = 0;
      }
    }
  }

  const productOfTriangleNos = groupSingles.reduce((acc, pow) => {
    return acc * ((((pow - 1) * pow) / 2) + 1)
  }, 1)

  return productOfTriangleNos
}

const a = () => {
  const counts = findAdapterJoltageDifference(inputs);

  console.log(`a = ${counts[1] * counts[3]}`);
};

const b = () => {
  const permutations = getArrangementCount(inputs)

  console.log(`b = ${permutations}`);
};

var runningAsScript = require.main === module;
if (runningAsScript) {
  a();
  b();
}

module.exports = {
  a,
  b,
  createSortedInputs,
  findAdapterJoltageDifference,
  getArrangementCount,
};
