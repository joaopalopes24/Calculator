<script setup lang="ts">
// ** External Imports
import { computed, nextTick, useTemplateRef } from "vue";
import { get } from "es-toolkit/compat";

// ** Local Imports
import {
  KEY_TO_CHAR,
  useCalculatorInput,
} from "@/composables/useCalculatorInput";
import { useCalculatorStore } from "@/stores/calculator";

const props = defineProps({
  handlePress: {
    type: Function,
    required: true,
  },
});

const store = useCalculatorStore();

const model = defineModel({
  default: "",
  type: String,
});

const inputEl = useTemplateRef<HTMLInputElement>("inputEl");

function mappedChar(c: string): string {
  return get(KEY_TO_CHAR, c) ?? c;
}

function syncInputValue() {
  nextTick(() => {
    if (inputEl.value) {
      inputEl.value.value = model.value;
    }
  });
}

const inputModel = computed({
  get: () => model.value,
  set: (value: string) => {
    const oldVal = model.value;
    const newVal = value;

    if (newVal === oldVal) {
      syncInputValue();
      return;
    }

    store.clearError();

    if (newVal.length === 0) {
      model.value = "";
    } else if (
      newVal.length < oldVal.length &&
      (oldVal.startsWith(newVal) || oldVal.endsWith(newVal))
    ) {
      model.value = newVal.split("").map(mappedChar).join("");
    } else if (newVal.startsWith(oldVal) && newVal.length > oldVal.length) {
      const appended = newVal.slice(oldVal.length);

      appended.split("").forEach((c) => props.handlePress(mappedChar(c)));
    } else {
      model.value = "";

      newVal.split("").forEach((c) => props.handlePress(mappedChar(c)));
    }

    syncInputValue();
  },
});
</script>

<template>
  <input
    type="text"
    ref="inputEl"
    placeholder="0"
    inputmode="none"
    autocorrect="off"
    autocomplete="off"
    spellcheck="false"
    v-model="inputModel"
    autocapitalize="off"
    class="min-h-14 w-full flex items-center justify-end text-neutral-100 text-2xl font-light tracking-tight shrink-0 pt-3 bg-transparent border-none outline-none text-right placeholder-neutral-500"
  />
</template>
