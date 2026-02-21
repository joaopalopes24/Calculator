<script setup lang="ts">
import { storeToRefs } from "pinia";
import CalculatorHeader from "@/components/CalculatorHeader.vue";
import HistoryRow from "@/components/HistoryRow.vue";
import CalculatorInput from "@/components/CalculatorInput.vue";
import CalculatorButton from "@/components/CalculatorButton.vue";
import { useCalculatorStore } from "@/stores/calculator";

const store = useCalculatorStore();

const { expression } = storeToRefs(store);

function handlePress(char: string) {
  if (char === "C") {
    store.expression = "";
    return;
  }

  if (char === "=" || char === "%") return;

  store.expression += char;
}
</script>

<template>
  <div class="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-sm rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-800 shadow-lg">
      <CalculatorHeader />

      <section class="px-5 py-5 flex flex-col min-h-52">
        <div class="flex-1 flex flex-col justify-end min-h-0">
          <div class="grid grid-cols-[1fr_auto_1fr] gap-x-4 w-full items-center">
            <HistoryRow expression="8×9" result="72" />

            <HistoryRow expression="72×(9-3)" result="432" />

            <HistoryRow expression="8×9" result="72" />

            <HistoryRow expression="72×(9-3)" result="432" />
          </div>
        </div>

        <CalculatorInput v-model="expression" />
      </section>

      <div class="border-t border-neutral-700 p-3">
        <div class="grid grid-cols-5 grid-auto-rows-[3.5rem] gap-2">
          <CalculatorButton char="C" v-on:press="handlePress">C</CalculatorButton>
          <CalculatorButton char="(" v-on:press="handlePress">(</CalculatorButton>
          <CalculatorButton char=")" v-on:press="handlePress">)</CalculatorButton>
          <CalculatorButton char="mod" v-on:press="handlePress">mod</CalculatorButton>
          <CalculatorButton char="π" v-on:press="handlePress">π</CalculatorButton>

          <CalculatorButton variant="num" char="7" v-on:press="handlePress">7</CalculatorButton>
          <CalculatorButton variant="num" char="8" v-on:press="handlePress">8</CalculatorButton>
          <CalculatorButton variant="num" char="9" v-on:press="handlePress">9</CalculatorButton>
          <CalculatorButton char="÷" v-on:press="handlePress">÷</CalculatorButton>
          <CalculatorButton char="√" v-on:press="handlePress">√</CalculatorButton>

          <CalculatorButton variant="num" char="4" v-on:press="handlePress">4</CalculatorButton>
          <CalculatorButton variant="num" char="5" v-on:press="handlePress">5</CalculatorButton>
          <CalculatorButton variant="num" char="6" v-on:press="handlePress">6</CalculatorButton>
          <CalculatorButton char="×" v-on:press="handlePress">×</CalculatorButton>
          <CalculatorButton char="x²" v-on:press="handlePress">x²</CalculatorButton>

          <CalculatorButton variant="num" char="1" v-on:press="handlePress">1</CalculatorButton>
          <CalculatorButton variant="num" char="2" v-on:press="handlePress">2</CalculatorButton>
          <CalculatorButton variant="num" char="3" v-on:press="handlePress">3</CalculatorButton>
          <CalculatorButton char="−" v-on:press="handlePress">−</CalculatorButton>
          <CalculatorButton variant="equals" char="=" v-on:press="handlePress">=</CalculatorButton>

          <CalculatorButton variant="num" char="0" v-on:press="handlePress">0</CalculatorButton>
          <CalculatorButton char="." v-on:press="handlePress">.</CalculatorButton>
          <CalculatorButton char="%" v-on:press="handlePress">%</CalculatorButton>
          <CalculatorButton char="+" v-on:press="handlePress">+</CalculatorButton>
        </div>
      </div>
    </div>
  </div>
</template>
