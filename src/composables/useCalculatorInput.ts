// ** External Imports
import { get, trim } from "es-toolkit/compat";
import { onMounted, onUnmounted } from "vue";

// ** Local Imports
import { useCalculatorEval } from "@/composables/useCalculatorEval";
import { useCalculatorStore } from "@/stores/calculator";

export const KEY_TO_CHAR: Record<string, string> = {
  x: "×",
  X: "×",
  m: "m",
  o: "o",
  d: "d",
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷",
  "(": "(",
  ")": ")",
  ".": ".",
  "%": "%",
  "=": "=",
  "^": "²",
  Enter: "=",
  Escape: "C",
};

function isInputTarget(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false;

  const tagName = target.tagName.toLowerCase();

  return (
    tagName === "input" || tagName === "textarea" || target.isContentEditable
  );
}

export function useCalculatorInput() {
  const store = useCalculatorStore();

  const { evaluate } = useCalculatorEval();

  function handleEquals() {
    const expr = trim(store.expression);

    if (!expr) return;

    try {
      const result = evaluate(expr);

      store.addToHistory(expr, String(result));
      store.replaceExpression(`${result}`);
      store.clearError();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Calculation error.";

      store.setError(message);
    }
  }

  function handlePress(char: string) {
    if (char === "C") {
      store.clearError();
      store.clearExpression();
      return;
    }

    if (char === "=") {
      handleEquals();
      return;
    }

    if (char === "×") {
      if (store.expression.slice(-1) === "×") {
        store.removeLastCharacter();
        store.pushExpression("²");
        store.clearError();
        return;
      }
    }

    store.clearError();
    store.pushExpression(char);
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.repeat) return;

    const isInput = isInputTarget(e.target);

    const isEnterOrEquals = e.key === "Enter" || e.key === "=";

    if (isEnterOrEquals) {
      e.preventDefault();
      handleEquals();
      return;
    }

    if (isInput) return;

    if (e.key === "Backspace") {
      e.preventDefault();
      store.clearError();
      store.removeLastCharacter();
      return;
    }

    const char = get(KEY_TO_CHAR, e.key);

    if (char) {
      e.preventDefault();
      handlePress(char);
    }
  }

  onMounted(() => {
    window.addEventListener("keydown", onKeydown);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", onKeydown);
  });

  return { handlePress };
}
