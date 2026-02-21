// ** External Imports
import { defineStore } from "pinia";

type HistoryItem = {
  result: string;
  expression: string;
};

interface CalculatorState {
  result: string;
  expression: string;
  history: HistoryItem[];
}

export const useCalculatorStore = defineStore("calculator", {
  state: (): CalculatorState => ({
    result: "",
    history: [],
    expression: "",
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

  persist: true,
});
