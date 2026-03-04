<script setup lang="ts">
// ** External Imports
import { Moon, Sun } from "lucide-vue-next";

// ** Local Imports
import { useTheme } from "@/composables/useTheme";
import { useCalculatorStore } from "@/stores/calculator";

const store = useCalculatorStore();
const { isDark, toggle } = useTheme();
</script>

<template>
  <header
    class="flex items-center gap-2 px-4 py-3 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700"
  >
    <button
      type="button"
      v-on:click="toggle"
      aria-label="Alternar tema"
      class="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 active:bg-neutral-400 dark:active:bg-neutral-500 transition-colors"
    >
      <Sun v-if="isDark" class="w-4 h-4" />

      <Moon v-else class="w-4 h-4" />
    </button>

    <button
      type="button"
      aria-label="Clear All"
      v-on:click="store.clearHistory"
      class="px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-sm font-medium hover:bg-neutral-300 dark:hover:bg-neutral-600 active:bg-neutral-400 dark:active:bg-neutral-500 transition-colors"
    >
      Clear All
    </button>
  </header>
</template>
