<template>
  <div>
    <AuthModal v-if="!isLoggedIn && showAuthModal" @close="handleClose" />

    <div v-else-if="isLoggedIn" class="p-10 max-w-5xl mx-auto font-inter">
      <p class="mb-10 text-xl">
        Привет, <strong>{{ currentUser.fullName }}</strong
        >!
      </p>

      <div class="flex gap-10">
        <!-- Левое меню -->
        <nav class="w-1/4 border-r pr-6">
          <ul class="flex flex-col gap-4 text-lg">
            <li
              @click="selectedTab = 'orders'"
              :class="{
                'text-pink-500 font-semibold cursor-pointer':
                  selectedTab === 'orders',
                'cursor-pointer hover:text-pink-400': selectedTab !== 'orders',
              }"
            >
              История заказов
            </li>
            <li
              @click="selectedTab = 'address'"
              :class="{
                'text-pink-500 font-semibold cursor-pointer':
                  selectedTab === 'address',
                'cursor-pointer hover:text-pink-400': selectedTab !== 'address',
              }"
            >
              Адрес доставки
            </li>
            <li
              @click="selectedTab = 'contacts'"
              :class="{
                'text-pink-500 font-semibold cursor-pointer':
                  selectedTab === 'contacts',
                'cursor-pointer hover:text-pink-400':
                  selectedTab !== 'contacts',
              }"
            >
              Контактные данные
            </li>
            <li
              @click="logout"
              class="cursor-pointer text-red-500 hover:text-red-600 font-semibold mt-10"
            >
              Выйти
            </li>
          </ul>
        </nav>

        <!-- Правая часть - контент -->
        <section class="flex-1">
          <!-- Заказы -->
          <div v-if="selectedTab === 'orders'">
            <h3 class="text-2xl font-semibold mb-6">Мои заказы</h3>
            <div
              v-if="orders.length"
              class="flex flex-col gap-4 max-h-[400px] overflow-y-auto"
            >
              <div
                v-for="order in orders"
                :key="order.id"
                class="p-4 border rounded shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <div class="flex justify-between mb-2">
                  <span class="font-semibold">Заказ №{{ order.id }}</span>
                  <span class="text-gray-600 text-sm">{{
                    formatDate(order.createdAt)
                  }}</span>
                </div>
                <div class="mb-2">
                  <ul class="list-disc list-inside text-gray-700">
                    <li
                      v-for="item in order.items"
                      :key="item.id"
                      class="flex items-center gap-3"
                    >
                      <img
                        :src="item.image"
                        alt="Изображение товара"
                        class="w-12 h-12 object-cover rounded"
                      />
                      <span>{{ item.name }} — {{ item.quantity }} шт.</span>
                    </li>
                  </ul>
                </div>
                <div class="font-bold text-pink-600">
                  Итого: {{ order.total }} ₸
                </div>
              </div>
            </div>
            <p v-else>У вас пока нет заказов.</p>
          </div>

          <!-- Адрес доставки -->
          <div v-if="selectedTab === 'address'">
            <AddressForm v-model:form="address" @save="handleSaveAddress" />
          </div>

          <!-- Контактные данные -->
          <div v-if="selectedTab === 'contacts'">
            <h3 class="text-2xl font-semibold mb-6">Контактные данные</h3>

            <div class="mb-4">
              <label class="block text-gray-700 mb-1">ФИО:</label>
              <input
                v-model="editedUser.fullName"
                class="w-full border px-4 py-2 rounded"
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 mb-1">Email:</label>
              <input
                v-model="editedUser.email"
                class="w-full border px-4 py-2 rounded"
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 mb-1">Телефон:</label>
              <input
                v-model="editedUser.phone"
                class="w-full border px-4 py-2 rounded"
              />
            </div>

            <button
              @click="saveChanges"
              class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition"
            >
              Сохранить изменения
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import AuthModal from "../components/AuthModal.vue";
import AddressForm from "../components/AddressForm.vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const currentUser = computed(
  () => userStore.currentUser || { fullName: "Гость" }
);

const isLoggedIn = ref(false);
const showAuthModal = ref(true);
const selectedTab = ref("orders");
const orders = ref([]);

const address = ref({
  city: "",
  street: "",
  house: "",
  apartment: "",
});

const editedUser = reactive({
  fullName: "",
  email: "",
  phone: "",
});

function handleClose() {
  showAuthModal.value = false;
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  userStore.currentUser = null;
  isLoggedIn.value = false;
  showAuthModal.value = true;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString();
}

async function handleSaveAddress(newAddress) {
  if (!userStore.currentUser) return;

  const updatedUser = {
    ...userStore.currentUser,
    address: newAddress,
  };

  await fetch(`https://61491fe95a8721ce.mokky.dev/users/${updatedUser.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: newAddress }),
  });

  userStore.currentUser = updatedUser;
}

async function saveChanges() {
  if (!currentUser.value.id) return;

  try {
    const response = await fetch(
      `https://61491fe95a8721ce.mokky.dev/users/${currentUser.value.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedUser),
      }
    );

    const updated = await response.json();
    userStore.currentUser = updated;
    alert("Данные успешно обновлены!");
  } catch (error) {
    console.error(error);
    alert("Ошибка при сохранении");
  }
}

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  isLoggedIn.value = true;
  showAuthModal.value = false;

  await userStore.fetchCurrentUser();

  if (userStore.currentUser) {
    editedUser.fullName = userStore.currentUser.fullName || "";
    editedUser.email = userStore.currentUser.email || "";
    editedUser.phone = userStore.currentUser.phone || "";

    if (userStore.currentUser.address) {
      address.value = { ...userStore.currentUser.address };
    }

    const res = await fetch("https://61491fe95a8721ce.mokky.dev/orders");
    const data = await res.json();

    orders.value = data
      .filter((order) => order.userId === userStore.currentUser.id)
      .map((order) => ({ ...order, items: order.items || [] }));
  }
});
</script>
