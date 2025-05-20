<script setup>
import Card from "./Card.vue";
import { defineProps } from "vue";

const props = defineProps({
  items: Array,
  columns: {
    type: String,
    default: "grid-cols-4",
  },
});
</script>

<template>
  <div :class="`grid gap-5 ${columns}`" v-auto-animate>
    <Card v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>
