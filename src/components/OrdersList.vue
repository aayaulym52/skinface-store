<template>
  <div class="sm:px-6 md:px-0">
    <h3 class="text-lg sm:text-2xl font-semibold mb-4 sm:mb-6">Мои заказы</h3>

    <div
      v-if="orders.length"
      class="flex flex-col gap-3 sm:gap-4 overflow-y-auto"
    >
      <div
        v-for="order in orders"
        :key="order.id"
        class="p-3 sm:p-4 border rounded shadow-sm hover:shadow-md transition cursor-pointer"
      >
        <div
          class="flex flex-col sm:flex-row sm:justify-between mb-2 sm:items-center gap-1 sm:gap-0"
        >
          <span class="font-semibold text-xs sm:text-base"
            >Заказ №{{ order.id }}</span
          >
          <span class="text-gray-600 text-xs sm:text-sm">
            {{ formatDate(order.createdAt) }}
          </span>
        </div>

        <ul class="list-disc list-inside text-gray-700 mb-2 space-y-2">
          <li
            v-for="item in order.items"
            :key="item.id"
            class="flex items-center gap-3 text-xs sm:text-base"
          >
            <img
              :src="item.image"
              alt="Товар"
              class="w-8 h-8 sm:w-12 sm:h-12 object-cover rounded"
            />
            <span class="flex-1">
              {{ item.name }} — {{ item.quantity }} шт.
            </span>
          </li>
        </ul>

        <div class="font-bold text-pink-600 text-xs sm:text-base">
          Итого: {{ order.total }} ₸
        </div>
      </div>
    </div>

    <p v-else class="text-center text-sm sm:text-base text-gray-500 mt-4">
      У вас пока нет заказов.
    </p>
  </div>
</template>

<script setup>
defineProps(["orders"]);
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString();
}
</script>
