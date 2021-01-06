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
  if (op === "+") return v1 + v2
  if (op === "*") return v1 * v2
  if(op === '-') return v1 - v2

  return 99999
}

function runExpressions(rpn: string[]): number {
  const stack = []
  
  rpn.forEach(value => {
    if (!isNaN(Number(value))){
      stack.push(value)
    } else {
      const v2 = stack.pop()
      const v1 = stack.pop()

      const newValue = evaluateOp(v1, v2, value as string)
      stack.push(newValue)
    }
  })

  return stack[0]
}

// RPN: Reverse Polish Notation
function convertTokensToRPN(tokens: Token[]): string[] {

  const queue = []
  const stack = [];
  
  tokens.forEach(token => {
    console.log("queue", queue)
    console.log("stack", stack)
    console.log("token", token, '\n')

    const { type, value } = token

    if (type === NUMBER) {
      queue.push(value)
      return
    }

    if (value === '(') {
      stack.push(value)
      return
    }

    if (value === ')') {
      while (stack.length > 0) {
        const nextChar = stack[0]
        console.log("nextChar", nextChar)

        if (nextChar !== '(') {
          queue.push(stack.shift())
        } else {
          stack.shift()
          break
        }
      }
      return 
    }

    // an operator
    while (stack.length > 0) {
      const nextToken = stack[0] // stack.length - 1]
      const a = partAPrecedence[value]
      const b = partAPrecedence[nextToken]
      if (a <= b) {
        queue.push(stack.shift());
      } else {
        break
      }
    }
    stack.unshift(value);
  })

  console.log("queue", queue)
  console.log("stack", stack)
  
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
