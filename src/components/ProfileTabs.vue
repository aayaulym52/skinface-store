<template>
  <div class="w-full max-w-md mx-auto p-4">
    <nav v-if="!selectedTab" class="w-full flex justify-center border-b pb-4">
      <ul class="flex flex-col gap-4 text-md sm:text-lg w-full max-w-xs">
        <li
          v-for="tab in tabs"
          :key="tab.name"
          @click="selectTab(tab.name)"
          class="cursor-pointer hover:text-pink-400 text-center"
        >
          {{ tab.label }}
        </li>
        <li
          @click="$emit('logout')"
          class="cursor-pointer text-red-500 hover:text-red-600 font-semibold mt-10 text-center"
        >
          Выйти
        </li>
      </ul>
    </nav>

    <section v-else class="w-full">
      <button
        @click="goBack"
        class="mb-4 px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600"
      >
        ← Назад
      </button>

      <article>
        <h2 class="text-xl font-semibold mb-2">
          {{ getTabLabel(selectedTab) }}
        </h2>
        <p>Здесь содержимое вкладки "{{ selectedTab }}"</p>
      </article>
    </section>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:selectedTab", "logout"]);
const props = defineProps({
  selectedTab: String,
});

const tabs = [
  { name: "orders", label: "История заказов" },
  { name: "address", label: "Адрес доставки" },
  { name: "contacts", label: "Контактные данные" },
];

function selectTab(tab) {
  emit("update:selectedTab", tab);
}

function goBack() {
  emit("update:selectedTab", null);
}

function getTabLabel(name) {
  const tab = tabs.find((t) => t.name === name);
  return tab ? tab.label : "";
}
</script>
