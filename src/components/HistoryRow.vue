<script setup lang="ts">
defineProps({
  result: {
    type: String,
    required: true,
  },
  expression: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="grid grid-cols-subgrid col-span-full items-center py-1.5 text-sm border-b border-neutral-700"
  >
    <span
      class="text-left text-neutral-400 overflow-hidden text-ellipsis whitespace-nowrap"
    >
      {{ expression }}
    </span>

    <span class="text-center text-neutral-500">=</span>

    <span
      class="text-right font-semibold text-neutral-300 overflow-hidden text-ellipsis whitespace-nowrap"
    >
      {{ result }}
    </span>
  </div>
</template>
