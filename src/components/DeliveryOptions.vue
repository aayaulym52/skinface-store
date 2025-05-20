<template>
  <label class="block text-3xl font-bold mb-6">Способ доставки</label>

  <div class="flex flex-col gap-3">
    <label
      v-for="option in options"
      :key="option.value"
      :class="[
        radioLabelClass,
        { 'border-pink-400 bg-pink-50': modelValue === option.value },
      ]"
    >
      <input
        type="radio"
        :value="option.value"
        :checked="modelValue === option.value"
        @change="$emit('update:modelValue', option.value)"
        class="appearance-none accent-pink-400"
      />
      {{ option.label }}
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: String,
});

const emits = defineEmits(["update:modelValue"]);

const options = [
  { value: "taxi", label: "Яндекс или Индрайвер (по городу)" },
  { value: "kazpost", label: "KAZPOST (неделя)" },
  { value: "cdek", label: "CDEK (3 дня)" },
];

const radioLabelClass =
  "border rounded-lg px-4 py-3 cursor-pointer hover:border-pink-400 transition flex items-center gap-3";
</script>
