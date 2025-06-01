<script setup>
import { useShopStore } from "../stores/shop";
import { reactive, ref, watch, onMounted } from "vue";
import debounce from "lodash.debounce";
import CardList from "../components/CardList.vue";

const shop = useShopStore();

const filters = reactive({
  sortBy: "title",
  searchQuery: "",
  category: "",
});

const showCategoriesModal = ref(false);

const onChangeSearchInput = debounce((e) => {
  filters.searchQuery = e.target.value;
}, 300);

const onChangeSelect = (e) => (filters.sortBy = e.target.value);

watch(
  filters,
  () => {
    shop.fetchItems(filters.sortBy, filters.searchQuery, filters.category);
  },
  { deep: true }
);

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
      class="fixed top-8 right-4 sm:right-6 bg-green-500 text-xs sm:text-md text-white py-2 px-4 sm:px-5 rounded shadow-md z-50 transition-opacity duration-500"
    >
      {{ shop.notification }}
    </div>

    <div
      v-if="showCategoriesModal"
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white w-4/5 max-w-sm p-6 rounded-md relative">
        <button
          @click="showCategoriesModal = false"
          class="absolute top-2 right-3"
        >
          <img
            src="/close2.png"
            alt="Закрыть"
            class="w-4 h-4 opacity-60 hover:opacity-100"
          />
        </button>

        <h2 class="text-xl font-bold mb-4">Категории</h2>
        <ul class="space-y-2 text-md font-bold text-gray-800">
          <li
            v-for="cat in categories"
            :key="cat.id"
            @click="
              () => {
                filters.category = cat.id;
                showCategoriesModal = false;
              }
            "
            :class="[
              filters.category === cat.id ? 'text-pink-300' : '',
              'cursor-pointer hover:text-pink-500',
            ]"
          >
            {{ cat.name }}
          </li>
        </ul>
      </div>
    </div>

    <div class="mx-auto my-6 max-w-7xl px-4 flex gap-6">
      <div class="w-1/6 font-inter hidden md:block">
        <h2 class="text-3xl font-bold mb-6">Каталог</h2>
        <ul class="space-y-2 text-md font-bold text-gray-800">
          <li
            v-for="cat in categories"
            :key="cat.id"
            @click="filters.category = cat.id"
            :class="[
              filters.category === cat.id ? 'text-pink-300' : '',
              'cursor-pointer hover:text-pink-500',
            ]"
          >
            {{ cat.name }}
          </li>
        </ul>
      </div>

      <div class="w-full md:w-5/6 flex flex-col gap-6">
        <div class="flex justify-between gap-4 items-center flex-wrap">
          <button
            @click="showCategoriesModal = true"
            class="md:hidden py-2 px-4 border bg-white rounded-md border-slate-200 hover:bg-pink-400"
          >
            Категории
          </button>

          <select
            @change="onChangeSelect"
            class="py-2 px-3 border rounded-md outline-none bg-white focus:border-pink-400"
            :value="filters.sortBy"
          >
            <option value="title">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>

          <div class="relative w-full sm:w-auto">
            <img class="absolute left-4 top-3 w-4 h-4" src="/search.svg" />
            <input
              @input="onChangeSearchInput"
              class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-pink-400 w-full sm:w-auto"
              placeholder="Поиск..."
            />
          </div>
        </div>

        <CardList :items="shop.items" />
      </div>
    </div>
  </div>
</template>
