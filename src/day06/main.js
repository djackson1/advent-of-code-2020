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
      acc[answer] = true;
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

const a = () => {
  const inputs = getInputsSplitByDoubleNewline();

  const result = getSumOfGroupUniqueAnswers(inputs);

  console.log(`a = ${result}`);
};

const b = () => {
  const inputs = getInputsSplitByDoubleNewline();

  console.log(`b = ${"?"}`);
};

a();
b();

module.exports = {
  getUniqueGroupAnswerCount,
  getSumOfGroupUniqueAnswers
};
