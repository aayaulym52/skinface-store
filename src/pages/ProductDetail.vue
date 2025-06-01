<template>
  <div>
    <div
      v-if="shop.notification"
      class="fixed top-8 right-4 sm:right-6 bg-green-500 text-xs sm:text-md text-white py-2 px-4 sm:px-5 rounded shadow-md z-50 transition-opacity duration-500"
    >
      {{ shop.notification }}
    </div>

    <div
      v-if="product"
      class="mt-10 mx-4 sm:mx-14 py-8 sm:py-12 px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-8 font-inter"
    >
      <div
        class="flex flex-row sm:flex-col gap-3 max-h-[600px] overflow-y-auto col-span-1"
      >
        <img
          v-for="(img, i) in product.images"
          :key="i"
          :src="`/${img}`"
          alt="Миниатюра"
          class="w-16 h-16 sm:w-40 sm:h-40 object-cover rounded cursor-pointer border-2 transition"
          :class="
            selectedImage === img ? 'border-pink-500' : 'border-transparent'
          "
          @click="selectedImage = img"
        />
      </div>

      <div class="col-span-1 sm:col-span-2">
        <img
          :src="`/${selectedImage}`"
          alt="Главное изображение"
          class="w-full h-auto object-contain rounded-lg"
        />
      </div>

      <div class="col-span-1 sm:col-span-2 flex flex-col">
        <h1 class="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8 text-slate-800">
          {{ product.name }}
        </h1>
        <h2 class="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-slate-800">
          {{ product.price }} тг
        </h2>

        <button
          class="bg-pink-400 text-white px-14 py-3 rounded-full hover:bg-pink-300 transition w-full md:w-fit mb-6"
          @click="toggleCart"
        >
          {{ isInCart ? "Удалить из корзины" : "Добавить в корзину" }}
        </button>

        <h2 class="text-lg sm:text-xl font-bold mb-2 text-slate-800">
          Описание
        </h2>
        <p class="text-gray-800 mb-6 text-sm sm:text-base">
          {{ product.description }}
        </p>

        <h2 class="text-lg sm:text-xl font-bold mb-2 text-slate-800">
          Применение:
        </h2>
        <p class="text-gray-800 mb-6 text-sm sm:text-base">
          {{ product.application }}
        </p>

        <div class="flex items-center mb-6">
          <h2 class="text-md font-bold text-slate-800 mr-2">Объем:</h2>
          <p class="text-gray-800 text-sm sm:text-base">{{ product.volume }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useShopStore } from "../stores/shop";

const route = useRoute();
const shop = useShopStore();

const product = ref(null);
const selectedImage = ref("");

onMounted(async () => {
  const id = route.params.id;
  product.value = await shop.fetchItemById(id);
  if (product.value?.images.length) {
    selectedImage.value = product.value.images[0];
  }
});

const isInCart = computed(() =>
  shop.cartItems.some((item) => item.id === product.value?.id)
);

function toggleCart() {
  if (!product.value) return;
  if (isInCart.value) {
    shop.removeFromCart(product.value.id);
  } else {
    shop.addToCart(product.value);
  }
}
</script>
