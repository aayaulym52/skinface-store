<template>
  <div>
    <div
      v-if="shop.notification"
      class="fixed top-8 right-6 bg-green-500 text-white py-2 px-5 rounded shadow-md z-50 transition-all"
    >
      {{ shop.notification }}
    </div>

    <div
      v-if="product"
      class="mt-10 mx-14 py-12 px-4 grid grid-cols-1 md:grid-cols-5 gap-8 font-inter"
    >
      <div class="flex flex-col gap-4 max-h-[800px] overflow-y-auto col-span-1">
        <img
          v-for="(img, i) in product.images"
          :key="i"
          :src="`/${img}`"
          alt="Миниатюра"
          class="w-40 h-40 object-cover rounded cursor-pointer border-2 transition"
          :class="
            selectedImage === img ? 'border-pink-500' : 'border-transparent'
          "
          @click="selectedImage = img"
        />
      </div>

      <div class="col-span-2">
        <img
          :src="`/${selectedImage}`"
          alt="Главное изображение"
          class="w-full h-auto object-contain rounded-lg"
        />
      </div>

      <div class="col-span-2 flex flex-col">
        <h1 class="text-4xl font-bold mb-8 text-slate-800">
          {{ product.name }}
        </h1>
        <h2 class="text-3xl font-bold mb-6 text-slate-800">
          {{ product.price }} тг
        </h2>

        <button
          class="bg-pink-400 text-white px-14 py-3 rounded-full hover:bg-pink-300 transition w-fit mb-6"
          @click="toggleCart"
        >
          {{ isInCart ? "Удалить из корзины" : "Добавить в корзину" }}
        </button>

        <h2 class="text-xl font-bold mb-2 text-slate-800">Описание</h2>
        <p class="text-gray-800 mb-6">{{ product.description }}</p>

        <h2 class="text-xl font-bold mb-2 text-slate-800">Применение:</h2>
        <p class="text-gray-800 mb-6">{{ product.application }}</p>

        <div class="flex items-center mb-6">
          <h2 class="text-md font-bold text-slate-800 mr-2">Объем:</h2>
          <p class="text-gray-800">{{ product.volume }}</p>
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
