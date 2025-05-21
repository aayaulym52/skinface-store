<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Контактные данные</h2>

    <div v-for="(val, key) in fields" :key="key">
      <input
        v-model="model[key]"
        :type="val.type"
        :placeholder="val.label"
        :class="inputClass"
      />
    </div>

    <button v-if="showButton" @click="$emit('save')" :class="buttonClass">
      Сохранить изменения
    </button>

    <p v-if="saveSuccess" class="text-green-500 mt-2">
      Контактные данные сохранены
    </p>
  </div>
</template>

<script setup>
import { reactive, watch, ref } from "vue";

const props = defineProps({
  modelValue: Object,
  showButton: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue", "save"]);

const model = reactive({ ...props.modelValue });

watch(
  () => props.modelValue,
  (newVal) => {
    Object.assign(model, newVal);
  }
);

watch(
  model,
  (newVal) => {
    emit("update:modelValue", newVal);
  },
  { deep: true }
);

const saveSuccess = ref(false);

watch(
  () => props.showButton,
  () => (saveSuccess.value = false)
);

const fields = {
  fullName: { label: "ФИО", type: "text" },
  email: { label: "Email", type: "email" },
  phone: { label: "Телефон", type: "text" },
};

const inputClass = "w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg";
const buttonClass =
  "bg-pink-500 hover:bg-pink-600 text-white w-full mt-4 py-3 rounded-lg transition";
</script>
