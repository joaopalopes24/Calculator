/**
 * Expression evaluator for the calculator.
 * Inspired by expression parsing and error handling in
 * https://github.com/prianyu/calculator
 */

// ** External Imports
import { get, isNil, trim } from "es-toolkit/compat";

const UNEXPECTED_END = "Incomplete expression.";
const INVALID_EXPRESSION = "Invalid expression.";
const DIVISION_BY_ZERO = "Divisor cannot be zero.";
const UNBALANCED_PARENS = "Unbalanced parentheses.";
const UNKNOWN_CHAR = "Unknown character in expression.";

// prettier-ignore
type Token = { type: "+" } | { type: "-" } | { type: "*" } | { type: "/" } | { type: "²" } | { type: "%" } | { type: "(" } | { type: ")" } | { type: "eof" } | { type: "number"; value: number };

function tokenize(expr: string): Token[] {
  let i = 0;

  const tokens: Token[] = [];

  const s = expr.replace(/\s/g, "");

  while (i < s.length) {
    const c = get(s, i);

    if (isNil(c)) break;

    if (c >= "0" && c <= "9") {
      let num = "";

      while (i < s.length) {
        const ch = get(s, i);
        if (isNil(ch) || !/[0-9.]/.test(ch)) break;

        if (ch === "." && num.includes("."))
          throw new Error(INVALID_EXPRESSION);

        num += ch;
        i++;
      }

      const value = parseFloat(num);

      if (Number.isNaN(value)) throw new Error(INVALID_EXPRESSION);

      tokens.push({ type: "number", value });
      continue;
    }

    switch (c) {
      case "+":
        tokens.push({ type: "+" });
        i++;
        break;
      case "-":
      case "−":
        tokens.push({ type: "-" });
        i++;
        break;
      case "*":
      case "×":
        tokens.push({ type: "*" });
        i++;
        break;
      case "/":
      case "÷":
        tokens.push({ type: "/" });
        i++;
        break;
      case "²":
        tokens.push({ type: "²" });
        i++;
        break;
      case "%":
        tokens.push({ type: "%" });
        i++;
        break;
      case "(":
        tokens.push({ type: "(" });
        i++;
        break;
      case ")":
        tokens.push({ type: ")" });
        i++;
        break;
      default:
        throw new Error(UNKNOWN_CHAR);
    }
  }

  tokens.push({ type: "eof" });
  return tokens;
}

export class CalculatorEvalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CalculatorEvalError";
  }
}

export function evaluate(expression: string): number {
  const expr = trim(expression);

  if (!expr) throw new CalculatorEvalError(UNEXPECTED_END);

  let pos = 0;

  const tokens = tokenize(expr);

  function current(): Token {
    return tokens[pos] ?? { type: "eof" };
  }

  function consume(): Token {
    const t = current();

    if (t.type !== "eof") pos++;

    return t;
  }

  function expectNumber(): number {
    const t = consume();

    if (t.type !== "number") throw new CalculatorEvalError(INVALID_EXPRESSION);

    return t.value;
  }

  function parsePrimary(): number {
    const t = current();

    if (t.type === "-") {
      consume();
      return -parsePrimary();
    }

    if (t.type === "(") {
      consume();
      const value = parseExpr();

      if (current().type !== ")")
        throw new CalculatorEvalError(UNBALANCED_PARENS);

      consume();
      return value;
    }

    if (t.type === "number") {
      return expectNumber();
    }

    throw new CalculatorEvalError(INVALID_EXPRESSION);
  }

  function parsePostfix(left: number): number {
    const t = current();

    if (t.type === "²") {
      consume();
      return parsePostfix(left * left);
    }

    if (t.type === "%") {
      consume();
      return parsePostfix(left / 100);
    }

    return left;
  }

  function parseFactor(): number {
    const left = parsePrimary();

    return parsePostfix(left);
  }

  function parseTerm(): number {
    let left = parseFactor();

    for (;;) {
      const t = current();

      if (t.type === "*") {
        consume();
        left *= parseFactor();
      } else if (t.type === "/") {
        consume();
        const right = parseFactor();

        if (right === 0) throw new CalculatorEvalError(DIVISION_BY_ZERO);

        left /= right;
      } else {
        break;
      }
    }
    return left;
  }

  function parseExpr(): number {
    let left = parseTerm();

    for (;;) {
      const t = current();

      if (t.type === "+") {
        consume();
        left += parseTerm();
      } else if (t.type === "-") {
        consume();
        left -= parseTerm();
      } else {
        break;
      }
    }

    return left;
  }

  const result = parseExpr();
  if (current().type !== "eof")
    throw new CalculatorEvalError(INVALID_EXPRESSION);

  const rounded = Math.round(result * 1e10) / 1e10;

  return rounded;
}

export function useCalculatorEval() {
  return { evaluate };
}
