// ** External Imports
import { defineStore } from "pinia";

type HistoryItem = {
  result: string;
  expression: string;
};

interface CalculatorState {
  expression: string;
  history: HistoryItem[];
  errorMessage: string | null;
}

export const useCalculatorStore = defineStore("calculator", {
  state: (): CalculatorState => ({
    history: [],
    expression: "",
    errorMessage: null,
  }),

  actions: {
    clearHistory() {
      this.history = [];
    },

    clearExpression() {
      this.expression = "";
    },

    pushExpression(char: string) {
      this.expression += char;
    },

    clearError() {
      this.errorMessage = null;
    },

    setError(message: string) {
      this.errorMessage = message;
    },

    removeFromHistory(index: number) {
      this.history.splice(index, 1);
    },

    replaceExpression(expression: string) {
      this.expression = expression;
    },

    removeLastCharacter() {
      this.expression = this.expression.slice(0, -1);
    },

    addToHistory(expression: string, result: string) {
      this.history.push({ expression, result });
    },
  },

  persist: {
    pick: ["history"],
  },
});
