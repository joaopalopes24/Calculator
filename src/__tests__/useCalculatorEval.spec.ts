// ** External Imports
import { describe, expect, it } from "vitest";

// ** Local Imports
import { CalculatorEvalError, evaluate } from "@/composables/useCalculatorEval";

describe("useCalculatorEval / evaluate", () => {
  describe("basic arithmetic", () => {
    it("adds two numbers", () => {
      expect(evaluate("1+2")).toBe(3);
      expect(evaluate("0+0")).toBe(0);
      expect(evaluate("10+20")).toBe(30);
    });

    it("subtracts two numbers", () => {
      expect(evaluate("5−3")).toBe(2);
      expect(evaluate("5-3")).toBe(2);
      expect(evaluate("0−1")).toBe(-1);
    });

    it("multiplies two numbers", () => {
      expect(evaluate("2×3")).toBe(6);
      expect(evaluate("2*3")).toBe(6);
      expect(evaluate("0×10")).toBe(0);
    });

    it("divides two numbers", () => {
      expect(evaluate("6÷2")).toBe(3);
      expect(evaluate("6÷2")).toBe(3);
      expect(evaluate("1÷2")).toBe(0.5);
    });

    it("evaluates chained operations", () => {
      expect(evaluate("1+2+3")).toBe(6);
      expect(evaluate("2×3×4")).toBe(24);
      expect(evaluate("10−2−1")).toBe(7);
    });
  });

  describe("operator precedence", () => {
    it("multiplies and divides before add and subtract", () => {
      expect(evaluate("1+2×3")).toBe(7);
      expect(evaluate("6÷2+1")).toBe(4);
      expect(evaluate("1+6÷2")).toBe(4);
      expect(evaluate("2×3+4")).toBe(10);
      expect(evaluate("10−2×3")).toBe(4);
    });

    it("evaluates × and ÷ left to right", () => {
      expect(evaluate("12÷3÷2")).toBe(2);
      expect(evaluate("2×3×4")).toBe(24);
    });

    it("evaluates + and − left to right", () => {
      expect(evaluate("10−3−2")).toBe(5);
      expect(evaluate("1+2+3")).toBe(6);
    });
  });

  describe("parentheses", () => {
    it("overrides precedence with parentheses", () => {
      expect(evaluate("(1+2)×3")).toBe(9);
      expect(evaluate("2×(3+4)")).toBe(14);
      expect(evaluate("(10−2)÷2")).toBe(4);
      expect(evaluate("(2+3)×(4+1)")).toBe(25);
    });

    it("handles nested parentheses", () => {
      expect(evaluate("((1+2)×3)")).toBe(9);
      expect(evaluate("(1+(2×3))")).toBe(7);
    });

    it("throws on unbalanced parentheses", () => {
      expect(() => evaluate(")1+2(")).toThrow();
      expect(() => evaluate("(1+2")).toThrow(CalculatorEvalError);
      expect(() => evaluate("(1+2))")).toThrow(CalculatorEvalError);
    });
  });

  describe("postfix ² and %", () => {
    it("evaluates square (²)", () => {
      expect(evaluate("3²")).toBe(9);
      expect(evaluate("0²")).toBe(0);
      expect(evaluate("2²")).toBe(4);
    });

    it("evaluates percent (%)", () => {
      expect(evaluate("0%")).toBe(0);
      expect(evaluate("100%")).toBe(1);
      expect(evaluate("50%")).toBe(0.5);
    });

    it("applies ² and % in sequence", () => {
      expect(evaluate("10²%")).toBe(1);
    });
  });

  describe("modulo (mod)", () => {
    it("evaluates mod as positive remainder", () => {
      expect(evaluate("10mod3")).toBe(1);
      expect(evaluate("5mod2")).toBe(1);
      expect(evaluate("8mod4")).toBe(0);
      expect(evaluate("7 mod 2")).toBe(1);
    });

    it("mod in expression with other operators", () => {
      expect(evaluate("10mod3+1")).toBe(2);
      expect(evaluate("2×5mod3")).toBe(1);
    });

    it("throws on mod by zero", () => {
      expect(() => evaluate("5mod0")).toThrow(CalculatorEvalError);
      expect(() => evaluate("5mod0")).toThrow("Divisor cannot be zero.");
    });
  });

  describe("unary minus", () => {
    it("evaluates unary minus", () => {
      expect(evaluate("−5")).toBe(-5);
      expect(evaluate("-5")).toBe(-5);
      expect(evaluate("−(2+3)")).toBe(-5);
    });
  });

  describe("decimals", () => {
    it("parses and evaluates decimals", () => {
      expect(evaluate("2.5×2")).toBe(5);
      expect(evaluate("1.5+0.5")).toBe(2);
      expect(evaluate("0.1+0.2")).toBe(0.3);
    });
  });

  describe("whitespace", () => {
    it("ignores spaces", () => {
      expect(evaluate("1 + 2")).toBe(3);
      expect(evaluate("  2 × 3  ")).toBe(6);
    });
  });

  describe("rounding", () => {
    it("rounds floating point for display", () => {
      expect(evaluate("1.2÷6")).toBe(0.2);
      expect(evaluate("0.1+0.2")).toBe(0.3);
    });
  });

  describe("complex parentheses", () => {
    it("evaluates deeply nested parentheses", () => {
      expect(evaluate("(((1+2)+3)+4)")).toBe(10);
      expect(evaluate("(1+(2+(3+4)))")).toBe(10);
      expect(evaluate("(((2×3)×4)×5)")).toBe(120);
    });

    it("evaluates multiple parenthesis groups in sequence", () => {
      expect(evaluate("(1+2)×(3+4)×(5+6)")).toBe(231);
      expect(evaluate("(10÷2)+(20÷4)")).toBe(10);
      expect(evaluate("(8−2)−(3−1)")).toBe(4);
    });

    it("mixes nested parentheses with different operators", () => {
      expect(evaluate("((1+2)×3)+(4×5)")).toBe(29);
      expect(evaluate("(6÷(2+1))×4")).toBe(8);
      expect(evaluate("(10−(2×3))+1")).toBe(5);
    });

    it("handles many layers of nesting", () => {
      expect(evaluate("((((1+1)+1)+1)+1)")).toBe(5);
      expect(evaluate("(2×(3×(4+1)))")).toBe(30);
      expect(evaluate("((8÷2)÷2)÷2")).toBe(1);
    });
  });

  describe("precedence: × ÷ before + − (complex sequences)", () => {
    it("mixed chain: multiplication and division computed first", () => {
      expect(evaluate("1+2×3+4")).toBe(11);
      expect(evaluate("10−2×3+1")).toBe(5);
      expect(evaluate("6÷2+3×2")).toBe(9);
    });

    it("division and multiplication same precedence, left to right", () => {
      expect(evaluate("24÷4÷2×3")).toBe(9);
      expect(evaluate("2×6÷3×2")).toBe(8);
      expect(evaluate("100÷5÷2×2")).toBe(20);
    });

    it("addition and subtraction only after all × ÷ are done", () => {
      expect(evaluate("1+2×3−4÷2")).toBe(5);
      expect(evaluate("0+10×2−15÷3")).toBe(15);
      expect(evaluate("20−4×2+6÷3")).toBe(14);
    });

    it("long sequential expression respecting precedence", () => {
      expect(evaluate("1+2×3+4×5+6÷2")).toBe(30);
      expect(evaluate("10−3×2+8÷4−1")).toBe(5);
      expect(evaluate("2×3×4+1×0+5")).toBe(29);
    });
  });

  describe("postfix ² and % with precedence", () => {
    it("² applies to number then × ÷ + − apply", () => {
      expect(evaluate("3²+4")).toBe(13);
      expect(evaluate("2×3²")).toBe(18);
      expect(evaluate("10−2²")).toBe(6);
      expect(evaluate("9²÷9")).toBe(9);
    });

    it("% then × ÷ + − in same expression", () => {
      expect(evaluate("50%×4")).toBe(2);
      expect(evaluate("100%+100%")).toBe(2);
      expect(evaluate("200%÷2")).toBe(1);
      expect(evaluate("25%×4+1")).toBe(2);
    });

    it("² and % with parentheses", () => {
      expect(evaluate("(1+2)²")).toBe(9);
      expect(evaluate("(10−2)²%")).toBe(0.64);
      expect(evaluate("2×(3²)")).toBe(18);
    });
  });

  describe("square root (√)", () => {
    it("evaluates square root of a number", () => {
      expect(evaluate("√9")).toBe(3);
      expect(evaluate("√4")).toBe(2);
      expect(evaluate("√0")).toBe(0);
      expect(evaluate("√1")).toBe(1);
    });

    it("evaluates square root of expression in parentheses", () => {
      expect(evaluate("√(9+7)")).toBe(4);
      expect(evaluate("√(2×8)")).toBe(4);
    });

    it("square root in larger expression", () => {
      expect(evaluate("√9+1")).toBe(4);
      expect(evaluate("2×√9")).toBe(6);
      expect(evaluate("√16−2")).toBe(2);
    });

    it("throws on square root of negative number", () => {
      expect(() => evaluate("√(−1)")).toThrow(CalculatorEvalError);
      expect(() => evaluate("√(−1)")).toThrow(
        "Square root of negative number.",
      );
    });
  });

  describe("power (²) in complex expressions", () => {
    it("multiple squares in one expression", () => {
      expect(evaluate("2²+3²")).toBe(13);
      expect(evaluate("4²−2²")).toBe(12);
      expect(evaluate("1²+2²+3²")).toBe(14);
    });

    it("square of expression then further operations", () => {
      expect(evaluate("(2+1)²×2")).toBe(18);
      expect(evaluate("(6÷2)²+1")).toBe(10);
      expect(evaluate("10−(3−1)²")).toBe(6);
    });
  });

  describe("errors", () => {
    it("throws on empty or whitespace-only expression", () => {
      expect(() => evaluate("")).toThrow(CalculatorEvalError);
      expect(() => evaluate("   ")).toThrow(CalculatorEvalError);
      expect(() => evaluate("")).toThrow("Incomplete expression.");
    });

    it("throws on division by zero", () => {
      expect(() => evaluate("1÷0")).toThrow(CalculatorEvalError);
      expect(() => evaluate("1÷0")).toThrow("Divisor cannot be zero.");
      expect(() => evaluate("5÷0")).toThrow("Divisor cannot be zero.");
    });

    it("throws on invalid expression", () => {
      expect(() => evaluate("1+")).toThrow();
      expect(() => evaluate("×2")).toThrow();
      expect(() => evaluate("+")).toThrow(CalculatorEvalError);
      expect(() => evaluate("(1+2")).toThrow("Unbalanced parentheses.");
    });

    it("throws on unknown character", () => {
      expect(() => evaluate("1#2")).toThrow();
      expect(() => evaluate("1a2")).toThrow("Unknown character in expression.");
    });

    it("throws CalculatorEvalError with correct name", () => {
      try {
        evaluate("1÷0");
      } catch (err) {
        expect(err).toBeInstanceOf(CalculatorEvalError);
        expect((err as CalculatorEvalError).name).toBe("CalculatorEvalError");
      }
    });
  });
});
