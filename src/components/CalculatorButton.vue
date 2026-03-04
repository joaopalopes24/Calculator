<script setup lang="ts">
defineProps({
  char: {
    required: true,
    type: String,
  },
  variant: {
    default: "default",
    type: String as () => "num" | "clear" | "equals" | "default",
  },
});

const emit = defineEmits(["press"]);
</script>

<template>
  <!-- prettier-ignore -->
  <button
    type="button"
    v-on:click="emit('press', char)"
    :class="{
      'bg-red-500 text-white hover:bg-red-600 active:bg-red-700': variant === 'clear',
      'rounded-xl text-lg font-medium flex items-center justify-center transition-colors min-h-14': true,
      'row-span-2 bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700': variant === 'equals',
      'bg-neutral-400 dark:bg-neutral-500 text-neutral-900 dark:text-neutral-50 hover:bg-neutral-500 dark:hover:bg-neutral-400 active:bg-neutral-600 dark:active:bg-neutral-300': variant === 'num',
      'bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-400 dark:hover:bg-neutral-600 active:bg-neutral-500 dark:active:bg-neutral-500': variant === 'default',
    }"
  >
    <slot />
  </button>
</template>
