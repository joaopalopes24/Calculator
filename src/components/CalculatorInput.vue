<script setup lang="ts">
// ** External Imports
import { computed, nextTick, useTemplateRef } from "vue";
import { get } from "es-toolkit/compat";

// ** Local Imports
import {
  KEY_TO_CHAR,
  useCalculatorInput,
} from "@/composables/useCalculatorInput";

const { handlePress } = useCalculatorInput();

const model = defineModel({
  default: "",
  type: String,
});

const inputEl = useTemplateRef<HTMLInputElement>("inputEl");

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
    const newVal = value.replace(/\s/g, "");

    if (newVal === oldVal) {
      syncInputValue();
      return;
    }

    if (newVal.length === oldVal.length + 1) {
      for (let i = 0; i < newVal.length; i++) {
        if (newVal.slice(0, i) + newVal.slice(i + 1) === oldVal) {
          const char = get(KEY_TO_CHAR, newVal.charAt(i));

          if (char) handlePress(char);

          break;
        }
      }
    } else if (
      newVal.length === oldVal.length - 1 &&
      (oldVal.startsWith(newVal) || oldVal.endsWith(newVal))
    ) {
      model.value = newVal;
    } else if (newVal.length === 0) {
      model.value = "";
    } else {
      model.value = "";

      newVal.split("").forEach((c) => {
        const char = get(KEY_TO_CHAR, c);

        if (char) handlePress(char);
      });
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
