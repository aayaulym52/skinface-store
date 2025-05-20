<template>
  <div>
    <div
      v-if="shop.notification"
      class="fixed top-8 right-6 bg-green-500 text-md text-white py-2 px-5 rounded shadow-md z-50 transition-opacity duration-500"
    >
      {{ shop.notification }}
    </div>

    <div class="max-w-7xl mx-auto px-2 py-6 font-inter mt-4">
      <h1 class="text-5xl font-bold mb-8">Корзина</h1>

      <div v-if="shop.cartItems.length === 0" class="text-center mt-20">
        <h2 class="text-3xl font-semibold mb-4">Товаров в корзине нет</h2>
        <p class="text-gray-600 mb-6">Добавьте товары в корзину для оформления заказа.</p>
        <router-link to="/shop">
          <button
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            К покупкам
          </button>
        </router-link>
    </div>

      <!-- Если товары есть -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div class="md:col-span-2">
          <table class="w-full border-collapse text-left">
            <tbody v-auto-animate>
              <tr
                v-for="item in shop.cartItems"
                :key="item.id"
                class="border-b border-gray-300"
              >
                <td class="py-5">
                  <img
                    :src="item.image"
                    alt=""
                    class="w-28 h-28 object-contain rounded-xl"
                  />
                </td>
                <td class="py-5 pl-4">
                  <div class="flex flex-col text-lg">
                    <span class="font-semibold text-slate-800">{{
                      item.name
                    }}</span>
                    <span class="text-gray-600 mt-1 text-base"
                      >{{ item.price }} тг.</span
                    >
                  </div>
                </td>
                <td class="py-5">
                  <div
                    class="bg-[#F7F7F7] rounded-full flex items-center px-4 py-2 w-fit"
                  >
                    <button
                      @click="decreaseQuantity(item.id, item.quantity)"
                      class="text-xl font-bold text-gray-700 hover:text-black"
                    >
                      –
                    </button>
                    <span class="mx-4 w-5 text-center text-lg">{{
                      item.quantity
                    }}</span>
                    <button
                      @click="increaseQuantity(item.id, item.quantity)"
                      class="text-xl font-bold text-gray-700 hover:text-black"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td class="py-5 font-bold text-lg">
                  {{ (item.price * item.quantity).toLocaleString() }} тг.
                </td>
                <td class="py-5">
                  <button
                    @click="removeFromCart(item.id)"
                    class="text-red-500 hover:text-red-700"
                  >
                    <img
                      src="/trash.png"
                      alt="Удалить"
                      class="w-6 h-6 opacity-70 hover:opacity-100"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Итоги -->
        <div class="bg-[#F7F7F7] p-6 h-fit mt-4">
          <p class="text-gray-800 text-base mb-4 font-medium">
            Товары ({{ totalItems }}):
            <span class="float-right">{{ totalSum.toLocaleString() }} тг.</span>
          </p>

          <div class="flex justify-between mb-3 text-lg">
            <span class="text-2xl font-semibold text-gray-900">Итого:</span>
            <span class="font-semibold text-3xl"
              >{{ totalSum.toLocaleString() }} тг.</span
            >
          </div>

          <router-link to="/checkout">
            <button
              :class="mainButtonClass"
              :disabled="!shop.cartItems.length"
              class="mt-6"
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
