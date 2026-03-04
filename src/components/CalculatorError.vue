<script setup lang="ts">
// ** External Imports
import { storeToRefs } from "pinia";

// ** Local Imports
import { useCalculatorStore } from "@/stores/calculator";

const store = useCalculatorStore();

const { errorMessage } = storeToRefs(store);
</script>

<template>
  <p
    role="alert"
    v-if="errorMessage"
    class="absolute bottom-1 left-5 right-5 text-sm text-red-600 dark:text-red-400 text-right pointer-events-none"
  >
    {{ errorMessage }}
  </p>
</template>
