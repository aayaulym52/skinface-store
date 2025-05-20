<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Адрес доставки</h2>

    <input v-model="address.city" placeholder="г.Астана" :class="inputClass" />
    <input v-model="address.street" placeholder="Улица" :class="inputClass" />

    <div class="flex items-center gap-2">
      <input v-model="address.house" placeholder="Дом" :class="inputClass" />
      <input
        v-model="address.apartment"
        placeholder="Квартира"
        :class="inputClass"
      />
    </div>

    <button v-if="showButton" @click="submitAddress" :class="buttonClass">
      Сохранить адрес
    </button>

    <p v-if="saveSuccess" class="text-green-500 mt-2">Адрес сохранён</p>
  </div>
</template>

<script setup>
import { ref, watch, toRefs } from "vue";

const props = defineProps({
  form: Object,
  showButton: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:form", "save"]);

const { form } = toRefs(props);

const address = ref({
  city: "",
  street: "",
  house: "",
  apartment: "",
});

watch(
  form,
  (val) => {
    if (val) {
      address.value = { ...val };
    }
  },
  { immediate: true }
);

watch(
  address,
  (val) => {
    emit("update:form", { ...val });
  },
  { deep: true }
);

const saveSuccess = ref(false);

const submitAddress = () => {
  emit("save", { ...address.value });
  saveSuccess.value = true;
  setTimeout(() => (saveSuccess.value = false), 2000);
};

const inputClass = "w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg";
const buttonClass =
  "bg-pink-500 hover:bg-pink-600 text-white w-full mt-4 py-3 rounded-lg transition";
</script>
