<script setup>
import { useShopStore } from "../stores/shop";
import { computed } from "vue";

const shop = useShopStore();

const props = defineProps({
  item: Object,
});

const { id } = props.item;

const isInCart = computed(() =>
  shop.cartItems.some((cartItem) => cartItem.id === id)
);

const isFavorite = computed(() => props.item.isFavorite);

async function toggleFavorite() {
  await shop.toggleFavorite(props.item);
}

function toggleCart() {
  if (isInCart.value) {
    shop.removeFromCart(id);
  } else {
    shop.addToCart({ ...props.item, quantity: 1 });
  }
}
</script>

<template>
  <div
    class="group relative flex flex-col justify-between bg-white border border-slate-100 rounded-3xl p-4 sm:p-6 cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
  >
    <img
      :src="isFavorite ? '/like-pink.png' : '/heart.png'"
      alt="Избранное"
      class="absolute top-2 right-2 w-6 h-6 cursor-pointer z-10"
      @click.stop="toggleFavorite"
    />

    <router-link :to="`/product/${id}`" class="flex flex-col items-center">
      <img
        :src="item.image"
        alt=""
        class="w-full max-h-[160px] sm:max-h-[200px] md:max-h-[250px] lg:max-h-[270px] object-contain"
      />
      <p
        class="mt-3 text-center text-sm sm:text-base lg:text-lg font-medium min-h-[48px] leading-tight transition group-hover:text-pink-500"
      >
        {{ item.name }}
      </p>
    </router-link>

    <div class="mt-4 flex justify-between items-center">
      <b class="text-sm sm:text-base lg:text-lg">{{ item.price }} тг.</b>
      <button
        class="p-2 rounded-xl hover:bg-pink-300 transition"
        @click="toggleCart"
      >
        <img
          :src="isInCart ? '/check-mark.png' : '/shopping-cart.svg'"
          alt="Добавить в корзину"
          class="w-6 h-6"
        />
      </button>
    </div>
  </div>
</template>
