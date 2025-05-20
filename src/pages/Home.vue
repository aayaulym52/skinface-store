<script setup>
import { onMounted } from "vue";
import { useShopStore } from "../stores/shop";
import CardList from "../components/CardList.vue";
import Hero from "../components/Hero.vue";
import DiagnosticBanner from "../components/DiagnosticBanner.vue";

const shop = useShopStore();

onMounted(() => {
  shop.fetchBestSellers();
});
</script>

<template>
  <Hero />
  <div
    v-if="shop.notification"
    class="fixed top-8 right-6 bg-green-500 text-md text-white py-2 px-5 rounded shadow-md z-50 transition-all"
  >
    {{ shop.notification }}
  </div>
  <div class="m-10">
    <h2 class="text-4xl font-bold mb-6">Бестселлеры</h2>
    <CardList :items="shop.items" columns="grid-cols-5" />
  </div>
  <DiagnosticBanner />
</template>
