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

function convertTokensToExpressionsV2(tokens: Token[]): ExprResult {
  let curTokens = [...tokens];
  let curExpr = null;

  while (curTokens.length > 0) {
    const token = curTokens.shift();
    const { type } = token;

    switch (type) {
      case NUMBER: {
        if (!curExpr) {
          curExpr = token;
        } else {
          curExpr.value2 = token;
        }

        break;
      }

      case ADD: {
        curExpr = {
          type: type,
          value1: curExpr,
        };

        break;
      }
    }

    // if (type === NUMBER) {
    //   if (!curExpr) {
    //     curExpr = token;
    //   } else {
    //     curExpr.value2 = token;
    //   }
    // } else
    // if (type === ADD) {
    //   curExpr = {
    //     type: type,
    //     value1: curExpr,
    //   };
    // } else
    if (type === MUL) {
      const { expr, tokens: tokensRest } = convertTokensToExpressionsV2(
        curTokens
      );

      curExpr = {
        type,
        value1: curExpr,
        value2: expr,
      };
      curTokens = tokensRest;
    } else if (type === BRACKET_OPEN) {
      const { expr, tokens: tokensRest } = convertTokensToExpressionsV2(
        curTokens
      );
      curTokens = tokensRest;

      // console.log("convertTokensToExpressionsV2 ~ curExpr", curExpr)
      if (!curExpr) {
        curExpr = expr;
        continue;
      }

      if (curExpr.type === ADD) {
        curExpr.value2 = expr;
      } else if (curExpr.type === MUL) {
        curExpr.value2 = expr;
      }
    } else if (token.type === BRACKET_CLOSE) {
      console.log("convertTokensToExpressionsV2 ~ curTokens", curTokens);
      // const { expr, tokens: tokensRest } = convertTokensToExpressionsV2(
      //   curTokens
      // );

      // if(!)

      return { expr: curExpr, tokens: curTokens };
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

export function evaluateExpressionV2(input: string): number {
  // split into tokens
  const tokens = getTokens(input);
  console.log("evaluateExpressionV2 ~ tokens", tokens);

  // some sort of tree?
  const { expr } = convertTokensToExpressionsV2(tokens);
  console.log("evaluateExpressionV2 ~ expr", JSON.stringify(expr, null, 2));

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
  console.log(`b = ${"?"}`);
}
