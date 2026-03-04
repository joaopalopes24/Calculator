// ** External Imports
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

// ** Local Imports
import { useCalculatorStore } from "@/stores/calculator";

describe("calculator store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("expression", () => {
    it("pushExpression appends characters", () => {
      const store = useCalculatorStore();

      store.pushExpression("1");
      store.pushExpression("+");
      store.pushExpression("2");

      expect(store.expression).toBe("1+2");
    });

    it("clearExpression resets expression", () => {
      const store = useCalculatorStore();

      store.pushExpression("1+2");
      store.clearExpression();

      expect(store.expression).toBe("");
    });

    it("replaceExpression sets expression", () => {
      const store = useCalculatorStore();

      store.pushExpression("1+2");
      store.replaceExpression("9");

      expect(store.expression).toBe("9");
    });

    it("removeLastCharacter removes one character", () => {
      const store = useCalculatorStore();

      store.pushExpression("123");
      store.removeLastCharacter();

      expect(store.expression).toBe("12");

      store.removeLastCharacter();

      expect(store.expression).toBe("1");
    });
  });

  describe("history", () => {
    it("addToHistory appends item", () => {
      const store = useCalculatorStore();

      expect(store.history).toHaveLength(0);

      store.addToHistory("1+2", "3");

      expect(store.history).toHaveLength(1);
      expect(store.history[0]).toEqual({ expression: "1+2", result: "3" });

      store.addToHistory("2×3", "6");

      expect(store.history).toHaveLength(2);
      expect(store.history[1]).toEqual({ expression: "2×3", result: "6" });
    });

    it("clearHistory removes all items", () => {
      const store = useCalculatorStore();

      store.addToHistory("1+2", "3");
      store.addToHistory("2×3", "6");
      store.clearHistory();

      expect(store.history).toHaveLength(0);
    });

    it("removeFromHistory removes item at index", () => {
      const store = useCalculatorStore();

      store.addToHistory("1+2", "3");
      store.addToHistory("2×3", "6");
      store.addToHistory("4+5", "9");
      store.removeFromHistory(1);

      expect(store.history).toHaveLength(2);
      expect(store.history[0]).toEqual({ expression: "1+2", result: "3" });
      expect(store.history[1]).toEqual({ expression: "4+5", result: "9" });
    });

    it("removeFromHistory(0) removes first item", () => {
      const store = useCalculatorStore();

      store.addToHistory("a", "1");
      store.addToHistory("b", "2");
      store.removeFromHistory(0);

      expect(store.history).toHaveLength(1);
      expect(store.history[0]?.expression).toBe("b");
    });

    it("removeFromHistory last index removes last item", () => {
      const store = useCalculatorStore();

      store.addToHistory("a", "1");
      store.addToHistory("b", "2");
      store.removeFromHistory(1);

      expect(store.history).toHaveLength(1);
      expect(store.history[0]?.expression).toBe("a");
    });
  });

  describe("error", () => {
    it("setError and clearError update errorMessage", () => {
      const store = useCalculatorStore();

      expect(store.errorMessage).toBeNull();

      store.setError("Something went wrong");

      expect(store.errorMessage).toBe("Something went wrong");

      store.clearError();

      expect(store.errorMessage).toBeNull();
    });
  });
});
