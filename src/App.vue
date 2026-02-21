<script setup lang="ts">
import CalculatorHeader from "@/components/CalculatorHeader.vue";
import HistoryRow from "@/components/HistoryRow.vue";
import CalculatorInput from "@/components/CalculatorInput.vue";
import CalculatorButton from "@/components/CalculatorButton.vue";
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

        <CalculatorInput value="72×(9-3)" />
      </section>

      <div class="border-t border-neutral-700 p-3">
        <div class="grid grid-cols-5 grid-auto-rows-[3.5rem] gap-2">
          <CalculatorButton>C</CalculatorButton>
          <CalculatorButton>(</CalculatorButton>
          <CalculatorButton>)</CalculatorButton>
          <CalculatorButton>mod</CalculatorButton>
          <CalculatorButton>π</CalculatorButton>

          <CalculatorButton variant="num">7</CalculatorButton>
          <CalculatorButton variant="num">8</CalculatorButton>
          <CalculatorButton variant="num">9</CalculatorButton>
          <CalculatorButton>÷</CalculatorButton>
          <CalculatorButton>√</CalculatorButton>

          <CalculatorButton variant="num">4</CalculatorButton>
          <CalculatorButton variant="num">5</CalculatorButton>
          <CalculatorButton variant="num">6</CalculatorButton>
          <CalculatorButton>×</CalculatorButton>
          <CalculatorButton>x²</CalculatorButton>

          <CalculatorButton variant="num">1</CalculatorButton>
          <CalculatorButton variant="num">2</CalculatorButton>
          <CalculatorButton variant="num">3</CalculatorButton>
          <CalculatorButton>−</CalculatorButton>
          <CalculatorButton variant="equals">=</CalculatorButton>

          <CalculatorButton variant="num">0</CalculatorButton>
          <CalculatorButton>.</CalculatorButton>
          <CalculatorButton>%</CalculatorButton>
          <CalculatorButton>+</CalculatorButton>
        </div>
      </div>
    </div>
  </div>
</template>
