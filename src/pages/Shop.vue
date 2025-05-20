<script setup>
import { useShopStore } from "../stores/shop";
import { reactive, watch, onMounted } from "vue";
import debounce from "lodash.debounce";
import CardList from "../components/CardList.vue";

const shop = useShopStore();

const filters = reactive({
  sortBy: "title",
  searchQuery: "",
  category: "",
});

// Дебаунс для поискового инпута
const onChangeSearchInput = debounce(e => {
  filters.searchQuery = e.target.value;
}, 300);

const onChangeSelect = e => filters.sortBy = e.target.value;

watch(filters, () => {
  shop.fetchItems(filters.sortBy, filters.searchQuery, filters.category);
}, { deep: true });

onMounted(() => {
  shop.fetchItems(filters.sortBy, filters.searchQuery, filters.category);
});

const categories = [
  { id: "", name: "Все" },
  { id: "makeup-removal", name: "Очищающие средства" },
  { id: "cleanser", name: "Пенки и гели" },
  { id: "toner", name: "Тонеры" },
  { id: "toner-pad", name: "Тонер пэды" },
  { id: "serum", name: "Сыворотки и ампулы" },
  { id: "cream", name: "Кремы" },
  { id: "eye-cream", name: "Крем для вокруг глаз" },
  { id: "sunscreen", name: "Солнцезащитный крем" },
];
</script>

<template>
  <div>
    <div
      v-if="shop.notification"
      class="fixed top-8 right-6 bg-green-500 text-white py-2 px-5 rounded shadow-md z-50 transition-all"
    >
      {{ shop.notification }}
    </div>
    <div class="mx-auto my-6 max-w-7xl px-4 flex gap-6">
      <!-- Категории -->
      <div class="w-1/6 font-inter">
        <h2 class="text-3xl font-bold mb-6">Каталог</h2>
        <ul class="space-y-2 text-md font-bold text-gray-800">
          <li
            v-for="cat in categories"
            :key="cat.id"
            @click="filters.category = cat.id"
            :class="[
              'cursor-pointer hover:text-pink-500',
              filters.category === cat.id ? 'text-pink-300' : ''
            ]"
          >
            {{ cat.name }}
          </li>
        </ul>
      </div>

      <!-- Контент -->
      <div class="w-5/6 flex flex-col gap-6">
        <!-- Фильтры -->
        <div class="flex justify-end gap-4 items-center">
          <select
            @change="onChangeSelect"
            class="py-2 px-3 border rounded-md outline-none"
            :value="filters.sortBy"
          >
            <option value="title">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>

          <div class="relative">
            <img class="absolute left-4 top-3 w-4 h-4" src="/search.svg" />
            <input
              @input="onChangeSearchInput"
              class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
              placeholder="Поиск..."
            />
          </div>
        </div>

        <CardList :items="shop.items" />
      </div>
    </div>
  </div>
</template>
