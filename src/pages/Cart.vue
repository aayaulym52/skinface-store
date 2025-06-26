<template>
  <div>
    <div
      v-if="shop.notification"
      class="fixed top-8 right-4 sm:right-6 bg-green-500 text-xs sm:text-md text-white py-2 px-4 sm:px-5 rounded shadow-md z-50 transition-opacity duration-500"
    >
      {{ shop.notification }}
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 font-inter mt-4">
      <h1 class="text-2xl sm:text-4xl font-bold mb-8">Корзина</h1>

      <div v-if="shop.cartItems.length === 0" class="text-center mt-20">
        <h2 class="text-xl sm:text-2xl font-semibold mb-4">
          Товаров в корзине нет
        </h2>
        <p class="text-gray-600 mb-6 text-md sm:text-lg">
          Добавьте товары в корзину для оформления заказа.
        </p>
        <router-link to="/shop">
          <button
            class="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
          >
            К покупкам
          </button>
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 overflow-x-auto">
          <div class="space-y-4">
            <div
              v-for="item in shop.cartItems"
              :key="item.id"
              class="flex items-start gap-4 p-4 border rounded-xl shadow-sm bg-white flex-wrap sm:flex-nowrap"
            >
              <img
                :src="item.image"
                alt="Товар"
                class="w-16 h-16 sm:w-28 sm:h-28 object-contain rounded-xl"
              />

              <div class="flex-1 min-w-[200px]">
                <div
                  class="flex justify-between items-start flex-wrap sm:flex-nowrap gap-2"
                >
                  <div>
                    <h2 class="text-md sm:text-xl font-semibold text-slate-800">
                      {{ item.name }}
                    </h2>
                    <p class="text-gray-600 mt-1 text-xs sm:text-base">
                      {{ item.price }} тг.
                    </p>
                  </div>
                  <div class="text-md sm:text-xl font-bold text-slate-900">
                    {{ (item.price * item.quantity).toLocaleString() }} тг.
                  </div>
                </div>

                <div
                  class="flex justify-between items-center mt-4 flex-wrap gap-2"
                >
                  <div
                    class="bg-[#F7F7F7] rounded-full flex items-center px-4 py-2"
                  >
                    <button
                      @click="decreaseQuantity(item.id, item.quantity)"
                      class="text-md font-bold text-gray-700 hover:text-black"
                    >
                      –
                    </button>
                    <span class="mx-4 w-5 text-center text-md sm:text-xl">
                      {{ item.quantity }}
                    </span>
                    <button
                      @click="increaseQuantity(item.id, item.quantity)"
                      class="text-xl font-bold text-gray-700 hover:text-black"
                    >
                      +
                    </button>
                  </div>

                  <button
                    @click="removeFromCart(item.id)"
                    class="text-red-500 hover:text-red-700 ml-2"
                  >
                    <img
                      src="/trash.png"
                      alt="Удалить"
                      class="w-6 h-6 opacity-70 hover:opacity-100"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-[#F7F7F7] p-4 sm:p-6 h-fit mt-4 sm:mt-0 rounded-xl">
          <p class="text-gray-800 text-sm sm:text-base mb-4 font-medium">
            Товары ({{ totalItems }}):
            <span class="float-right">{{ totalSum.toLocaleString() }} тг.</span>
          </p>

          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-1"
          >
            <span class="text-lg sm:text-2xl font-semibold text-gray-900"
              >Итого:</span
            >
            <span class="font-semibold text-xl sm:text-3xl">
              {{ totalSum.toLocaleString() }} тг.
            </span>
          </div>

          <router-link to="/checkout">
            <button
              :class="[mainButtonClass, 'w-full text-sm sm:text-lg py-3 mt-4']"
              :disabled="!shop.cartItems.length"
            >
              Оформить заказ
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useShopStore } from "../stores/shop";

const shop = useShopStore();

const mainButtonClass =
  "bg-pink-400 text-white w-full py-4 text-lg rounded-lg hover:bg-pink-500 transition";

const totalSum = computed(() =>
  shop.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
);

const totalItems = computed(() =>
  shop.cartItems.reduce((acc, item) => acc + item.quantity, 0)
);

function removeFromCart(id) {
  shop.removeFromCart(id);
}

function increaseQuantity(id, currentQuantity) {
  shop.updateQuantity(id, currentQuantity + 1);
}

function decreaseQuantity(id, currentQuantity) {
  if (currentQuantity > 1) {
    shop.updateQuantity(id, currentQuantity - 1);
  } else {
    shop.removeFromCart(id);
  }
}
</script>
