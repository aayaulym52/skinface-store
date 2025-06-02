<template>
  <div>
    <div
      v-if="shop.notification"
      class="fixed top-8 right-4 sm:right-6 bg-green-500 text-xs sm:text-md text-white py-2 px-4 sm:px-5 rounded shadow-md z-50 transition-opacity duration-500"
    >
      {{ shop.notification }}
    </div>

    <div class="px-4 sm:px-6 py-6 font-inter mt-4">
      <h1 class="text-2xl sm:text-5xl font-bold mb-8">Избранное</h1>
      <div v-if="shop.favoriteItems.length === 0" class="text-center mt-20">
        <div class="flex justify-center items-center gap-2 mb-4">
          <h2 class="text-xl sm:text-2xl font-semibold">Пока тут пусто</h2>
          <img src="/heart3.png" alt="" class="w-5 h-5" />
        </div>
        <p class="text-gray-600 mb-6 text-md sm:text-lg">
          Добавьте товары в избранное, чтобы не потерять их.
        </p>
        <router-link to="/shop">
          <button
            class="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Каталог
          </button>
        </router-link>
      </div>
      <div v-else class="mt-4 mx-2">
        <CardList
          :items="favoriteItems"
          columns="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        />
      </div>
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
