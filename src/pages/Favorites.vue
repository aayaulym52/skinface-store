<template>
  <div class="p-2 font-inter mt-4">
    <div
      v-if="shop.notification"
      class="fixed top-8 right-4 sm:right-6 bg-green-500 text-xs sm:text-md text-white py-2 px-4 sm:px-5 rounded shadow-md z-50 transition-opacity duration-500"
    >
      {{ shop.notification }}
    </div>

    <div class="font-inter flex flex-col my-2 mx-4">
      <h1 class="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">Избранное</h1>

      <CardList
        :items="favoriteItems"
        columns="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      />
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
