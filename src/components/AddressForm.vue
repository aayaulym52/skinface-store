<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Адрес доставки</h2>

    <input v-model="form.city" placeholder="г.Астана" :class="inputClass" />
    <input v-model="form.street" placeholder="Улица" :class="inputClass" />

    <div class="flex items-center gap-2">
      <input v-model="form.house" placeholder="Дом" :class="inputClass" />
      <input
        v-model="form.apartment"
        placeholder="Квартира"
        :class="inputClass"
      />
    </div>

    <button v-if="showButton" @click="$emit('save')" :class="buttonClass">
      Сохранить адрес
    </button>

    <p v-if="saveSuccess" class="text-green-500 mt-2">Адрес сохранён</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  form: Object,
  showButton: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:form", "save"]);

const saveSuccess = ref(false);

const submitAddress = () => {
  emit("save");
  saveSuccess.value = true;
  setTimeout(() => (saveSuccess.value = false), 2000);
};

const inputClass = "w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg";
const buttonClass =
  "bg-pink-500 hover:bg-pink-600 text-white w-full mt-4 py-3 rounded-lg transition";
</script>
