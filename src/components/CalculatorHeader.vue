<script setup lang="ts">
// ** Local Imports
import { useCalculatorStore } from "@/stores/calculator";

const store = useCalculatorStore();
</script>

<template>
  <header
    class="flex items-center px-4 py-3 bg-neutral-800 border-b border-neutral-700"
  >
    <button
      type="button"
      aria-label="Clear All"
      v-on:click="store.clearHistory"
      class="px-4 py-2 rounded-lg bg-neutral-700 text-neutral-200 text-sm font-medium hover:bg-neutral-600 active:bg-neutral-500 transition-colors"
    >
      Clear All
    </button>
  </header>
</template>
