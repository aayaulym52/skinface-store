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
    class="fixed top-8 right-4 sm:right-6 bg-green-500 text-xs sm:text-md text-white py-2 px-4 sm:px-5 rounded shadow-md z-50 transition-opacity duration-500"
  >
    {{ shop.notification }}
  </div>
  <div class="mx-6 mt-6">
    <h2
      class="text-2xl font-bold sm:text-2xl md:text-3xl mb-4 sm:mb-6 lg:text-4xl"
    >
      Бестселлеры
    </h2>

    <CardList
      :items="shop.items"
      columns="grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
    />
  </div>
  <DiagnosticBanner />
</template>
