import { assert } from "console";

const { getInputs } = require("../../utils/files");

const BRACKET_OPEN = "BRACKET_OPEN";
const BRACKET_CLOSE = "BRACKET_CLOSE";
const ADD = "ADD";
const MUL = "MUL";
const NUMBER = "NUMBER";

type Token = {
  type: string;
  value?: number;
};
type Value = number;
type Expression = {
  type: string;
  value1: Expression | ExpressionNumber;
  value2: Expression | ExpressionNumber;
};
type ExpressionNumber = {
  type: string;
  value: Value;
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
    if (s === "(") return { type: BRACKET_OPEN };
    if (s === ")") return { type: BRACKET_CLOSE };
    if (s === "+") return { type: ADD };
    if (s === "*") return { type: MUL };

    return { type: NUMBER, value: Number(s) };
  });
}

type ExprResult = {
  expr: Expression;
  tokens: Token[];
};

// I think this is converting to an AST... it's been a while
function convertTokensToExpressions(tokens: Token[]): ExprResult {
  let curTokens = [...tokens];
  let curExpr = null;

  while (true) {
    const token = curTokens.shift();
    const { type } = token;

    if (type === NUMBER) {
      const { value } = token;
      if (!curExpr) {
        curExpr = token;
      } else {
        curExpr.value2 = token;
      }
    } else if (type === ADD || type === MUL) {
      curExpr = {
        type: type,
        value1: curExpr,
      };
    } else if (type === BRACKET_OPEN) {
      // expr
      // ...restTokens
      const { expr, tokens: tokensRest } = convertTokensToExpressions(
        curTokens
      );
      curTokens = tokensRest;

      if (!curExpr) {
        curExpr = expr;
        continue;
      }

      if (curExpr.type === ADD || curExpr.type === MUL) {
        curExpr.value2 = expr;
      }
    } else if (token.type === BRACKET_CLOSE) {
      return { expr: curExpr, tokens: curTokens };
    }

    if (curTokens.length === 0) {
      break;
    }
  }

  return { expr: curExpr, tokens: [] };
}


type ExprResult2 = {
  
}
function replaceAddTokens(tokens: Token[]): 

function convertTokensToExpressionsV2(tokens: Token[]): ExprResult {
  // replace brackets
  // replace ADD
  // replace MUL
}

function convertTokensToExpressionsV2_old(tokens: Token[], special?: string): ExprResult {
const END_OF_ADD = 'END_OF_ADD'
  let curTokens = [...tokens];
  let curExpr = null;

  while (curTokens.length > 0) {
    const token = curTokens.shift();
    const { type } = token;

  const readable = convertToReadable(curExpr)
  console.log("evaluateExpressionV2 ~ readable", readable)

    switch (type) {
      case NUMBER: {
        if (!curExpr) {
          curExpr = token;
        } else {
          curExpr.value2 = token;
          if(special === END_OF_ADD && curExpr.type === ADD && (curTokens.length > 0 && curTokens[0].type !== ADD)){
            return {
              expr: curExpr,
              tokens: curTokens
            }
          }
        }

        break;
      }

      case ADD: {
        console.log('TOKEN', token)
        console.log('CUR_TOKEN', curTokens)
        curExpr = {
          type: type,
          value1: curExpr,
        };
        console.log("convertTokensToExpressionsV2 ~ curExpr", curExpr)

        break;
      }

      case MUL: {

        // this only needs to run up to another multiplication
        const { expr, tokens: tokensRest } = convertTokensToExpressionsV2(
          curTokens, END_OF_ADD
          );
          console.log("convertTokensToExpressionsV2 ~ expr", expr)
          console.log("convertTokensToExpressionsV2 ~ tokensRest", tokensRest)

        curExpr = {
          type,
          value1: curExpr,
          value2: expr
        }
        // expr.value2 = expr
        curTokens = tokensRest

        break;
      }

      case BRACKET_OPEN: {
        const { expr, tokens: tokensRest } = convertTokensToExpressionsV2(
          curTokens,
        );
        curTokens = tokensRest;

        if (!curExpr) {
          curExpr = expr;
          continue;
        }

        curExpr.value2 = expr;

        break;
      }

      case BRACKET_CLOSE: {
        return { expr: curExpr, tokens: curTokens };
      }
    }
  }

  return { expr: curExpr, tokens: [] };
}

function runExpressions(expression: Expression | ExpressionNumber): number {
  const { type } = expression;

  if (type === NUMBER) {
    const { value } = expression as ExpressionNumber;
    // console.log('NO', value, '\n')
    return value;
  } else if (type === ADD) {
    const { value1, value2 } = expression as Expression;
    console.log("ADD", value1, value2, "\n");
    return runExpressions(value1) + runExpressions(value2);
  } else if (type === MUL) {
    const { value1, value2 } = expression as Expression;
    console.log("MUL", value1, value2, "\n");
    return runExpressions(value1) * runExpressions(value2);
  }
}

export function evaluateExpression(input: string): number {
  // split into tokens
  const tokens = getTokens(input);

  // some sort of tree?
  const { expr } = convertTokensToExpressions(tokens);

  // process?
  const value = runExpressions(expr);

  return value;
}

function convertToReadable(expr: Expression | ExpressionNumber){ 
  if(!expr) return '.'
  if(expr.type === NUMBER) {
    const { value } = expr as ExpressionNumber
    return value
  } else if (expr.type === ADD){ 
    const { value1, value2 } = expr as Expression;
    const v1 = convertToReadable(value1)
    const v2 = convertToReadable(value2);
    return `ADD(${v1}, ${v2})`
  } else if (expr.type === MUL){ 
    const { value1, value2 } = expr as Expression;
    const v1 = convertToReadable(value1)
    const v2 = convertToReadable(value2);
    return `MUL(${v1}, ${v2})`
  }
}

export function evaluateExpressionV2(input: string): number {
  // split into tokens
  const tokens = getTokens(input);
  console.log("evaluateExpressionV2 ~ tokens", tokens);

  // some sort of tree?
  const { expr } = convertTokensToExpressionsV2(tokens);
  console.log("evaluateExpressionV2 ~ expr", JSON.stringify(expr, null, 2));

  const readable = convertToReadable(expr)
  console.log("evaluateExpressionV2 ~ readable", readable)

  console.log("\n\n====>\n");
  const value = runExpressions(expr);

  return value;
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
  const value = inputs.reduce((acc, input) => {
    return acc + evaluateExpressionV2(input);
  }, 0);
  console.log(`b = ${value}`);
}
