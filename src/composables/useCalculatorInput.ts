// ** External Imports
import { onMounted, onUnmounted } from "vue";
import { get, trim } from "es-toolkit/compat";

// ** Local Imports
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

  function handleEquals() {
    const expr = trim(store.expression);

    if (!expr) return;

    store.addToHistory(expr, "0");

    store.clearExpression();
  }

  function handlePress(char: string) {
    if (char === "C") {
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
        return;
      }
    }

    store.pushExpression(char);
  }

  function onKeydown(e: KeyboardEvent) {
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
