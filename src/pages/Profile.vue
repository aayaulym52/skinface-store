<template>
  <div>
    <AuthModal v-if="!isLoggedIn && showAuthModal" @close="handleClose" />

    <div
      v-else-if="isLoggedIn"
      class="px-4 py-6 sm:p-10 max-w-md mx-auto font-inter"
    >
      <div class="flex items-center justify-center gap-2 mb-6 sm:mb-10">
        <img src="/user.png" alt="" class="w-6 h-6" />
        <p class="text-md sm:text-lg font-semibold text-slate-500">
          {{ currentUser.email }}
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <ProfileTabs
          v-if="!selectedTab"
          class="text-lg sm:text-base"
          :selectedTab="selectedTab"
          @update:selectedTab="selectedTab = $event"
          @logout="logout"
        />

        <section v-else class="mt-2">
          <button @click="selectedTab = null" class="mb-4">
            <img
              src="/arrow.png"
              alt=""
              class="w-4 h-4 opacity-70 hover:opacity-100"
            />
          </button>

          <OrdersList v-if="selectedTab === 'orders'" :orders="orders" />
          <AddressForm
            v-if="selectedTab === 'address'"
            v-model:form="address"
            @save="handleSaveAddress"
            :showButton="true"
          />
          <ContactForm
            v-if="selectedTab === 'contacts'"
            v-model="editedUser"
            @save="saveChanges"
            :showButton="true"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import AuthModal from "../components/AuthModal.vue";
import AddressForm from "../components/AddressForm.vue";
import OrdersList from "../components/OrdersList.vue";
import ContactForm from "../components/ContactForm.vue";
import ProfileTabs from "../components/ProfileTabs.vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const currentUser = computed(
  () => userStore.currentUser || { fullName: "Гость" }
);
const isLoggedIn = ref(false);
const showAuthModal = ref(true);
const selectedTab = ref(null);
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

async function handleSaveAddress() {
  const updatedUser = {
    ...userStore.currentUser,
    address: address.value,
  };

  await fetch(`https://61491fe95a8721ce.mokky.dev/users/${updatedUser.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: address.value }),
  });

  userStore.currentUser = updatedUser;
}

async function saveChanges() {
  if (!userStore.currentUser?.id) return;

  try {
    const response = await fetch(
      `https://61491fe95a8721ce.mokky.dev/users/${userStore.currentUser.id}`,
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
