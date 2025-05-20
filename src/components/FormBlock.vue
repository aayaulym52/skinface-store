<template>
  <div>
    <h2 class="text-3xl font-bold mb-6">Контактные данные</h2>

    <input
      v-model="form.name"
      placeholder="ФИО"
      :class="inputClass"
      :readonly="readonly"
    />
    <input
      v-model="form.phone"
      placeholder="Телефон"
      :class="inputClass"
      :readonly="readonly"
    />
    <input
      v-model="form.email"
      placeholder="Email"
      :class="inputClass"
      :readonly="readonly"
    />

    <h2 class="text-3xl font-bold mb-6">Доставка</h2>
    <AddressForm v-model:form="form.address" :showButton="false" />

    <slot></slot>

    <button @click="$emit('submit')" :class="submitButtonClass">
      Подтвердить заказ
    </button>
  </div>
</template>

<script setup>
import AddressForm from "./AddressForm.vue";

const props = defineProps({
  form: Object,
  readonly: {
    type: Boolean,
    default: false,
  },
});

const inputClass = "w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg";
const submitButtonClass =
  "bg-pink-500 hover:bg-pink-600 text-white w-full mt-6 py-3 rounded-lg transition";
</script>
