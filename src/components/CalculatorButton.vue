<script setup lang="ts">
defineProps({
  char: {
    required: true,
    type: String,
  },
  variant: {
    default: "default",
    type: String as () => "num" | "equals" | "default",
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
      'rounded-xl text-lg font-medium flex items-center justify-center transition-colors min-h-14': true,
      'bg-neutral-500 text-neutral-50 hover:bg-neutral-400 active:bg-neutral-300': variant === 'num',
      'bg-neutral-700 text-neutral-200 hover:bg-neutral-600 active:bg-neutral-500': variant === 'default',
      'row-span-2 bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700': variant === 'equals',
    }"
  >
    <slot />
  </button>
</template>
