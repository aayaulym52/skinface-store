<template>
  <div class="bg-gray-100 p-6 rounded-xl">
    <h2 class="text-xl font-semibold mb-4">Ваш заказ</h2>
    <ul class="mb-4 space-y-4">
      <li v-for="item in items" :key="item.id" class="flex items-center gap-4">
        <img
          :src="item.image"
          alt="Изображение товара"
          class="w-16 h-16 sm:w-24 sm:h-24 object-contain rounded-2xl"
        />
        <div class="flex flex-col">
          <p class="text-sm sm:text-xl font-medium">{{ item.name }}</p>
          <p class="text-sm text-slate-600">({{ item.quantity }} шт.)</p>
          <p class="font-semibold">
            {{ (item.price * item.quantity).toLocaleString() }} тг.
          </p>
        </div>
      </li>
    </ul>

    <div
      class="text-xl sm:text-2xl font-bold flex justify-between mt-6 border-t border-gray-300 pt-4"
    >
      <span>Итого:</span>
      <span>{{ total.toLocaleString() }} тг.</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: Array,
  total: Number,
});
</script>
