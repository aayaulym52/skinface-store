<template>
  <label class="block text-lg sm:text-2xl font-bold mb-6"
    >Способ доставки</label
  >

  <div class="flex flex-col gap-3">
    <label
      v-for="option in options"
      :key="option.value"
      :class="[
        radioLabelClass,
        { 'border-pink-400 bg-pink-50': selected === option.value },
      ]"
    >
      <input
        type="radio"
        :value="option.value"
        v-model="selected"
        class="appearance-none w-4 h-4 rounded-full border-2 border-pink-400 checked:bg-pink-400"
      />

      {{ option.label }}
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  modelValue: String,
});
const emits = defineEmits(["update:modelValue"]);

const selected = computed({
  get: () => props.modelValue,
  set: (val) => emits("update:modelValue", val),
});

const options = [
  { value: "taxi", label: "Яндекс или Индрайвер (по городу)" },
  { value: "kazpost", label: "KAZPOST (неделя)" },
  { value: "cdek", label: "CDEK (3 дня)" },
];

const radioLabelClass =
  "border rounded-lg px-3 py-2 cursor-pointer hover:border-pink-400 transition flex items-center gap-2 text-sm sm:px-4 sm:py-3 sm:gap-3 sm:text-base";
</script>
