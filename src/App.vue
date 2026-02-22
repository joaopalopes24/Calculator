<script setup lang="ts">
// ** External Imports
import { storeToRefs } from "pinia";

// ** Local Imports
import CalculatorHeader from "@/components/CalculatorHeader.vue";
import HistoryRow from "@/components/HistoryRow.vue";
import CalculatorInput from "@/components/CalculatorInput.vue";
import CalculatorButton from "@/components/CalculatorButton.vue";
import { useCalculatorStore } from "@/stores/calculator";
import { useCalculatorInput } from "@/composables/useCalculatorInput";

const store = useCalculatorStore();

const { expression } = storeToRefs(store);

const { handlePress } = useCalculatorInput();
</script>

<template>
  <div
    class="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-4"
  >
    <div
      class="w-full max-w-sm rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-800 shadow-lg"
    >
      <CalculatorHeader />

      <section class="px-5 py-5 flex flex-col min-h-52">
        <div class="flex-1 flex flex-col justify-end min-h-0">
          <div
            class="grid grid-cols-[1fr_auto_1fr] gap-x-4 w-full items-center"
          >
            <HistoryRow
              :key="index"
              :index="index"
              :result="item.result"
              :expression="item.expression"
              v-for="(item, index) in store.history"
            />
          </div>
        </div>

        <CalculatorInput v-model="expression" />
      </section>

      <div class="border-t border-neutral-700 p-3">
        <div class="grid grid-cols-5 grid-auto-rows-[3.5rem] gap-2">
          <!-- Row 1 -->
          <CalculatorButton char="C" v-on:press="handlePress">
            C
          </CalculatorButton>
          <CalculatorButton char="(" v-on:press="handlePress">
            (
          </CalculatorButton>
          <CalculatorButton char=")" v-on:press="handlePress">
            )
          </CalculatorButton>
          <CalculatorButton char="mod" v-on:press="handlePress">
            mod
          </CalculatorButton>
          <CalculatorButton char="π" v-on:press="handlePress">
            π
          </CalculatorButton>

          <!-- Row 2 -->
          <CalculatorButton char="7" variant="num" v-on:press="handlePress">
            7
          </CalculatorButton>
          <CalculatorButton char="8" variant="num" v-on:press="handlePress">
            8
          </CalculatorButton>
          <CalculatorButton char="9" variant="num" v-on:press="handlePress">
            9
          </CalculatorButton>
          <CalculatorButton char="÷" v-on:press="handlePress">
            ÷
          </CalculatorButton>
          <CalculatorButton char="√" v-on:press="handlePress">
            √
          </CalculatorButton>

          <!-- Row 3 -->
          <CalculatorButton char="4" variant="num" v-on:press="handlePress">
            4
          </CalculatorButton>
          <CalculatorButton char="5" variant="num" v-on:press="handlePress">
            5
          </CalculatorButton>
          <CalculatorButton char="6" variant="num" v-on:press="handlePress">
            6
          </CalculatorButton>
          <CalculatorButton char="×" v-on:press="handlePress">
            ×
          </CalculatorButton>
          <CalculatorButton char="²" v-on:press="handlePress">
            x²
          </CalculatorButton>

          <!-- Row 4 -->
          <CalculatorButton char="1" variant="num" v-on:press="handlePress">
            1
          </CalculatorButton>
          <CalculatorButton char="2" variant="num" v-on:press="handlePress">
            2
          </CalculatorButton>
          <CalculatorButton char="3" variant="num" v-on:press="handlePress">
            3
          </CalculatorButton>
          <CalculatorButton char="−" v-on:press="handlePress">
            −
          </CalculatorButton>
          <CalculatorButton char="=" variant="equals" v-on:press="handlePress">
            =
          </CalculatorButton>

          <!-- Row 5 -->
          <CalculatorButton char="0" variant="num" v-on:press="handlePress">
            0
          </CalculatorButton>
          <CalculatorButton char="." v-on:press="handlePress">
            .
          </CalculatorButton>
          <CalculatorButton char="%" v-on:press="handlePress">
            %
          </CalculatorButton>
          <CalculatorButton char="+" v-on:press="handlePress">
            +
          </CalculatorButton>
        </div>
      </div>
    </div>
  </div>
</template>
