<script setup>
import Card from "./Card.vue";
import { defineProps } from "vue";

const props = defineProps({
  items: Array,
  columns: {
    type: String,
    default: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3",
  },
});
</script>

<template>
  <div :class="`grid gap-5 ${columns}`" v-auto-animate>
    <Card v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>
