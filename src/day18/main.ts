const { getInputs } = require("../../utils/files");

// [START WIP]
function splitOn(tokens, splitToken) {
  return tokens.reduce((acc, s) => {
    const split = s.split(splitToken).map((s2) => {
      if (s2 === "") return splitToken;
      return s2;
    });
    acc.push(...split);
    return acc;
  }, []);
}

export function getTokens(input: string): string[] {
  const s1 = input.split(" ");
  const s2 = splitOn(s1, "(");
  const s3 = splitOn(s2, ")");

  return s3
}
// [END WIP]

export function evaluateExpression(input: string): number {
  // split into tokens
  const tokens = getTokens(input);
  console.log(
    "🚀 ~ file: main.ts ~ line 11 ~ evaluateExpression ~ tokens",
    tokens
  );

  // some sort of tree?

  // process?

  return -1;
}

export function a(): void {
  const inputs = getInputs(18);
  console.log(`a = ${"?"}`);
}

export function b(): void {
  const inputs = getInputs(18);
  console.log(`b = ${"?"}`);
}
