<script setup lang="ts">
defineProps({
  value: {
    default: "",
    type: String,
  },
});
</script>

<template>
  <div class="min-h-14 flex items-center justify-end text-neutral-100 text-2xl font-light tracking-tight shrink-0 pt-3">
    {{ value }}
  </div>
</template>
