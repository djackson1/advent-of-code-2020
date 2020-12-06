const { getInputs } = require("../../utils/files");

function uniqueAnswersOfPerson(answers) {
  return answers.split("").reduce((acc, answer) => {
    acc[answer] = true;
    return acc;
  }, {});
}

function getUniqueGroupAnswers(groupAnswers) {
  return groupAnswers.reduce((acc, answers) => {
    const uniqueAnswers = uniqueAnswersOfPerson(answers);

    Object.keys(uniqueAnswers).forEach((answer) => {
      if (!acc[answer]) acc[answer] = 0;
      acc[answer] += 1;
    });

    return acc;
  }, {});
}

function getUniqueGroupAnswerCount(groupAnswers) {
  return Object.keys(getUniqueGroupAnswers(groupAnswers)).length;
}

function getInputsSplitByDoubleNewline() {
  const inputs = getInputs(6);

  const grouped = inputs.map((i) => {
    if (i === "") return "\n";
    return i;
  });

  const rows = grouped
    .join(" ")
    .split("\n")
    .map((r) => r.trim().split(" "));

  return rows;
}

function getSumOfGroupUniqueAnswers(groups) {
  return groups.reduce((count, groupAnswers) => {
    return count + getUniqueGroupAnswerCount(groupAnswers);
  }, 0);
}

function getUniqueCountsInGroups(groups) {
  const uniques = groups.reduce((acc, groupAnswers) => {
    const groupTotal = groupAnswers.length;

    const uniqueAnswers = getUniqueGroupAnswers(groupAnswers);

    const uniqueInGroup = Object.entries(uniqueAnswers).reduce(
      (acc, [answer, count]) => {
        if (count === groupTotal) {
          return acc + 1;
        }

        return acc;
      },
      0
    );

    acc.push(uniqueInGroup);
    return acc;
  }, []);
  console.log("🚀 ~ file: main.js ~ line 65 ~ uniques ~ uniques", uniques);

  return uniques.reduce((count, uniqueCount) => count + uniqueCount, 0);
}

const a = () => {
  const inputs = getInputsSplitByDoubleNewline();

  const result = getSumOfGroupUniqueAnswers(inputs);

  console.log(`a = ${result}`);
};

const b = () => {
  const inputs = getInputsSplitByDoubleNewline();

  const uniques = getUniqueCountsInGroups(inputs);

  console.log(`b = ${uniques}`);
};

var runningAsScript = !module.parent;
if (runningAsScript) {
  a();
  b();
}

module.exports = {
  getUniqueGroupAnswerCount,
  getSumOfGroupUniqueAnswers,
  getUniqueCountsInGroups,
};
