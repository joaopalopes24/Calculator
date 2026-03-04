// ** External Imports
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, test } from "vitest";

// ** Local Imports
import { useCalculatorStore } from "@/stores/calculator";

describe("calculator store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("expression", () => {
    test("it should append characters when pushExpression is called", () => {
      const store = useCalculatorStore();

      store.pushExpression("1");
      store.pushExpression("+");
      store.pushExpression("2");

      expect(store.expression).toBe("1+2");
    });

    test("it should reset expression when clearExpression is called", () => {
      const store = useCalculatorStore();

      store.pushExpression("1+2");
      store.clearExpression();

      expect(store.expression).toBe("");
    });

    test("it should set expression when replaceExpression is called", () => {
      const store = useCalculatorStore();

      store.pushExpression("1+2");
      store.replaceExpression("9");

      expect(store.expression).toBe("9");
    });

    test("it should remove one character when removeLastCharacter is called", () => {
      const store = useCalculatorStore();

      store.pushExpression("123");
      store.removeLastCharacter();

      expect(store.expression).toBe("12");

      store.removeLastCharacter();

      expect(store.expression).toBe("1");
    });
  });

  describe("history", () => {
    test("it should append item when addToHistory is called", () => {
      const store = useCalculatorStore();

      expect(store.history).toHaveLength(0);

      store.addToHistory("1+2", "3");

      expect(store.history).toHaveLength(1);
      expect(store.history[0]).toEqual({ expression: "1+2", result: "3" });

      store.addToHistory("2×3", "6");

      expect(store.history).toHaveLength(2);
      expect(store.history[1]).toEqual({ expression: "2×3", result: "6" });
    });

    test("it should remove all items when clearHistory is called", () => {
      const store = useCalculatorStore();

      store.addToHistory("1+2", "3");
      store.addToHistory("2×3", "6");
      store.clearHistory();

      expect(store.history).toHaveLength(0);
    });

    test("it should remove item at index when removeFromHistory is called", () => {
      const store = useCalculatorStore();

      store.addToHistory("1+2", "3");
      store.addToHistory("2×3", "6");
      store.addToHistory("4+5", "9");
      store.removeFromHistory(1);

      expect(store.history).toHaveLength(2);
      expect(store.history[0]).toEqual({ expression: "1+2", result: "3" });
      expect(store.history[1]).toEqual({ expression: "4+5", result: "9" });
    });

    test("it should remove first item when removeFromHistory(0) is called", () => {
      const store = useCalculatorStore();

      store.addToHistory("a", "1");
      store.addToHistory("b", "2");
      store.removeFromHistory(0);

      expect(store.history).toHaveLength(1);
      expect(store.history[0]?.expression).toBe("b");
    });

    test("it should remove last item when removeFromHistory last index is called", () => {
      const store = useCalculatorStore();

      store.addToHistory("a", "1");
      store.addToHistory("b", "2");
      store.removeFromHistory(1);

      expect(store.history).toHaveLength(1);
      expect(store.history[0]?.expression).toBe("a");
    });
  });

  describe("error", () => {
    test("it should update errorMessage when setError and clearError are called", () => {
      const store = useCalculatorStore();

      expect(store.errorMessage).toBeNull();

      store.setError("Something went wrong");

      expect(store.errorMessage).toBe("Something went wrong");

      store.clearError();

      expect(store.errorMessage).toBeNull();
    });
  });
});
