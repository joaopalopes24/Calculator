<script setup lang="ts">
const model = defineModel({
  default: "",
  type: String,
});
</script>

<template>
  <input
    type="text"
    v-model="model"
    placeholder="0"
    inputmode="none"
    autocorrect="off"
    autocomplete="off"
    spellcheck="false"
    autocapitalize="off"
    class="min-h-14 w-full flex items-center justify-end text-neutral-100 text-2xl font-light tracking-tight shrink-0 pt-3 bg-transparent border-none outline-none text-right placeholder-neutral-500"
  />
</template>
