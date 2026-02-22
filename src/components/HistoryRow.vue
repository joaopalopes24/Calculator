<script setup lang="ts">
// External Imports
import { ref } from "vue";
import { Trash2 } from "lucide-vue-next";

// Local Imports
import { useCalculatorStore } from "@/stores/calculator";

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  expression: {
    type: String,
    required: true,
  },
});

const isRowHovered = ref(false);

const store = useCalculatorStore();

function setIsRowHovered(value: boolean) {
  isRowHovered.value = value;
}

function onRowClick() {
  store.replaceExpression(props.expression);
}

function onDeleteClick(e: MouseEvent) {
  e.stopPropagation();

  store.removeFromHistory(props.index);
}
</script>

<template>
  <div class="col-span-full">
    <div
      v-on:click="onRowClick"
      v-on:mouseenter="setIsRowHovered(true)"
      v-on:mouseleave="setIsRowHovered(false)"
      class="flex items-center gap-x-2 px-3 py-1.5 text-sm cursor-pointer select-none hover:bg-neutral-700/30 active:bg-neutral-700/50 rounded-lg"
    >
      <div
        class="flex-1 min-w-0 grid grid-cols-[1fr_auto_1fr] gap-x-4 items-center"
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

      <div
        :class="{
          'w-0 ml-0 opacity-0 pointer-events-none': !isRowHovered,
          'w-6 ml-2 opacity-100 pointer-events-auto': isRowHovered,
          'flex shrink-0 overflow-hidden transition-[width,opacity,margin] duration-200': true,
        }"
      >
        <button
          type="button"
          aria-label="Delete"
          v-on:click="onDeleteClick"
          class="flex items-center justify-center w-6 h-6 rounded-sm text-red-500 hover:bg-red-500/20 hover:text-red-400 focus:outline-none cursor-pointer"
        >
          <Trash2 class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <div class="mx-1 border-b border-neutral-700" aria-hidden="true"></div>
  </div>
</template>
