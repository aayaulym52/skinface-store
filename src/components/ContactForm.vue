<template>
  <div>
    <h2 class="text-lg sm:text-2xl font-bold mb-6">Контактные данные</h2>

    <div v-for="(val, key) in fields" :key="key">
      <input
        v-model="model[key]"
        :type="val.type"
        :placeholder="val.label"
        :class="inputClass"
      />
    </div>

    <button v-if="showButton" @click="onSave" :class="buttonClass">
      Сохранить
    </button>

    <p v-if="saveSuccess" class="text-green-500 mt-2">
      Контактные данные сохранены
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  modelValue: Object,
  showButton: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue", "save"]);

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const saveSuccess = ref(false);

const onSave = () => {
  emit("save");
  saveSuccess.value = true;
  setTimeout(() => (saveSuccess.value = false), 2000);
};

const fields = {
  fullName: { label: "ФИО", type: "text" },
  email: { label: "Email", type: "email" },
  phone: { label: "Телефон", type: "text" },
};

const inputClass =
  "w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg text-sm sm:mb-4 sm:px-4 sm:py-3 sm:text-base";

const buttonClass =
  "w-full bg-pink-500 hover:bg-pink-600 text-white mt-2 py-2 rounded-lg transition text-sm sm:mt-4 sm:py-3 sm:text-base";
</script>
