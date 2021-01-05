const { getInputs } = require("../../utils/files");

const OP = "OP"
const BRACKET_OPEN = "BRACKET_OPEN";
const BRACKET_CLOSE = "BRACKET_CLOSE";
const ADD = "ADD";
const SUB = "SUB"
const MUL = "MUL";
const NUMBER = "NUMBER";

type Token = {
  type: string;
  value: number | string;
};

function splitOn(input: string[], splitToken: string): string[] {
  return input.reduce((acc, s) => {
    const split = s.split(splitToken).map((s2) => {
      if (s2 === "") return splitToken;
      return s2;
    });
    acc.push(...split);
    return acc;
  }, []);
}

export function getTokens(input: string): Token[] {
  const tokens = splitOn(splitOn(splitOn([input], " "), "("), ")");

  return tokens.map((s) => {
    if (["(", ")", "+", "*", "-"].includes(s)) {
      return { type: OP, value: s }
    }

    return { type: NUMBER, value: Number(s) };
  });
}

const partAPrecedence = {
  [ADD]: 10,
  [MUL]: 10,
  [SUB]: 10,
  [BRACKET_OPEN]: 0
}

function evaluateOp(v1: number, v2: number, op: string): number {
  console.log("🚀 ~ file: main.ts ~ line 46 ~ evaluateOp ~ op", op)
  if (op === "+") return v1 + v2
  if (op === "*") return v1 * v2
  if(op === '-') return v1 - v2

  return 99999
}

function runExpressions(rpn: Token[]): number {
  const stack = []
  
  rpn.forEach(({ type, value }) => {
    console.log("🚀 ~ file: main.ts ~ line 55 ~ runExpressions ~ stack", stack)
    console.log("type", type, value)
    if (type === NUMBER) {
      stack.push(value)
    } else if (type === OP) {
      const v2 = stack.pop()
      const v1 = stack.pop()
      console.log("🚀 ~ file: main.ts ~ line 60 ~ rpn.forEach ~ v1", v1)
      console.log("🚀 ~ file: main.ts ~ line 60 ~ rpn.forEach ~ v2", v2)


      const newValue = evaluateOp(v1, v2, value as string)
      stack.push(newValue)
    }
  })

  console.log('stack', stack)

  return stack[0]
}

// RPN: Reverse Polish Notation
function convertTokensToRPN(tokens: Token[]): Token[] {

  const queue = []
  const stack = [];
  
  tokens.forEach(token => {
    console.log("🚀 ~ file: main.ts ~ line 82 ~ convertTokensToRPN ~ queue", queue)
    console.log("🚀 ~ file: main.ts ~ line 83 ~ convertTokensToRPN ~ stack", stack)
    console.log("🚀 ~ file: main.ts ~ line 88 ~ convertTokensToRPN ~ token", token, '\n')

    const { type, value } = token

    if (type === NUMBER) {
      queue.push(token)
      return
    }

    if (value === '(') {
      stack.unshift(token)
      return
    }

    if (value === ')') {
      while (stack.length > 0) {
        const nextChar = stack[stack.length - 1]

        if (nextChar.value !== '(') {
          queue.push(stack.pop())
        } else {
          stack.pop()
          break
        }
      }
      return 
    }

    // an operator
    while (stack.length > 0) {
      const nextToken = stack[0] // stack.length - 1]
      const a = partAPrecedence[token.value]
      const b = partAPrecedence[nextToken.value]
      if (a < b) {
        queue.push(stack.shift());
      } else {
        break
      }
    }
    stack.unshift(token);
  })

  while (stack.length > 0) {
    queue.push(stack.shift())
  }

  return queue

}


export function evaluateExpression(input: string): number {
  // split into tokens
  const tokens = getTokens(input);

  const rpn = convertTokensToRPN(tokens)
  console.log("🚀 ~ file: main.ts ~ line 59 ~ evaluateExpression ~ rpn", rpn)

  const value = runExpressions(rpn)

  return value
}

export function evaluateExpressionV2(input: string): number {
  return 2
}

export function a(): void {
  const inputs = getInputs(18);

  const value = inputs.reduce((acc, input) => {
    return acc + evaluateExpression(input);
  }, 0);

  console.log(`a = ${value}`);
}

export function b(): void {
  const inputs = getInputs(18);
  console.log(`b = ${"?"}`);
}
