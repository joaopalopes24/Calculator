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
    addToHistory(expression: string, result: string) {
      //
    },
  },

  persist: true,
});
