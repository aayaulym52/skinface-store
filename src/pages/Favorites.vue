<template>
  <div class="mx-auto p-6 font-inter mt-10">
    <div
      v-if="shop.notification"
      class="fixed top-8 right-6 bg-green-500 text-md text-white py-2 px-5 rounded shadow-md z-50 transition-all"
    >
      {{ shop.notification }}
    </div>

    <div class="font-inter flex flex-col my-10 mx-12">
      <h1 class="text-5xl font-bold mb-6">Избранное</h1>
      <CardList :items="favoriteItems" columns="grid-cols-5" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useShopStore } from "../stores/shop";
import CardList from "../components/CardList.vue";

const shop = useShopStore();

const favoriteItems = computed(() =>
  shop.items.filter((item) => item.isFavorite)
);

onMounted(async () => {
  await shop.fetchItems();
});
</script>
