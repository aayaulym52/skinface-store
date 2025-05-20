<template>
  <AuthModal
    v-if="!isLoggedIn && showAuthModal"
    :showLogin="showLogin"
    :toggleForm="toggleForm"
    @close="handleClose"
  />

  <div v-if="showSuccess" :class="successClass">Спасибо за заказ!</div>
  <div v-if="showError" :class="errorClass">Пожалуйста, заполните все поля</div>

  <div class="max-w-7xl mx-auto px-4 py-10 font-inter">
    <h1 class="text-5xl font-bold mb-8">Оформление заказа</h1>

    <div class="grid md:grid-cols-2 gap-8 items-start">
      <div>
        <div>
          <h2 class="text-3xl font-bold">Авторизация</h2>

          <button
            v-if="!isLoggedIn"
            @click="showAuthModal = true"
            class="bg-pink-500 hover:bg-pink-600 text-white w-full mt-4 py-2 rounded-lg transition mb-4"
          >
            Войти или Зарегистрироваться
          </button>

          <div v-else class="mb-4 text-lg font-semibold text-slate-500">
            Вошли как: {{ user.currentUser.email }}
          </div>
        </div>

        <FormBlock :form="form" :readonly="isLoggedIn" @submit="submitOrder">
          <DeliveryOptions v-model="form.delivery" />
        </FormBlock>
      </div>

      <CartSummary :items="shop.cartItems" :total="totalSum" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useShopStore } from "../stores/shop";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

import AuthModal from "../components/AuthModal.vue";
import FormBlock from "../components/FormBlock.vue";
import CartSummary from "../components/CartSummary.vue";
import DeliveryOptions from "../components/DeliveryOptions.vue";

const shop = useShopStore();
const user = useUserStore();
const router = useRouter();

const isLoggedIn = computed(() => !!user.currentUser);
const showAuthModal = ref(false);
const showLogin = ref(true);

function toggleForm() {
  showLogin.value = !showLogin.value;
}
function handleClose() {
  showAuthModal.value = false;
}

const form = reactive({
  name: "",
  phone: "",
  email: "",
  address: {
    city: "",
    street: "",
    house: "",
    apartment: "",
  },
  delivery: "",
});

const showSuccess = ref(false);
const showError = ref(false);

const totalSum = computed(() =>
  shop.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
);

const successClass =
  "fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300";
const errorClass =
  "fixed top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300";

async function submitOrder() {
  const requiredFields = ["name", "phone", "email", "delivery"];
  const requiredAddressFields = ["city", "street", "house", "apartment"];

  const hasEmptyFields =
    requiredFields.some((field) => !form[field]) ||
    requiredAddressFields.some((field) => !form.address[field]);

  if (hasEmptyFields) {
    showError.value = true;
    setTimeout(() => (showError.value = false), 2500);
    return;
  }

  const userId = user.currentUser?.id || null;

  const order = {
    name: form.name,
    phone: form.phone,
    email: form.email,
    address: form.address,
    delivery: form.delivery,
    items: shop.cartItems,
    total: totalSum.value,
    createdAt: new Date().toISOString(),
    userId,
  };

  try {
    await fetch("https://61491fe95a8721ce.mokky.dev/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
      shop.clearCart();
      router.push("/");
    }, 2500);
  } catch (err) {
    console.error(err);
    showError.value = true;
    setTimeout(() => (showError.value = false), 2500);
  }
}

watch(
  () => user.currentUser,
  (newUser) => {
    if (newUser) {
      form.name = newUser.fullName || "";
      form.phone = newUser.phone || "";
      form.email = newUser.email || "";
      form.address = newUser.address
        ? { ...newUser.address }
        : {
            city: "",
            street: "",
            house: "",
            apartment: "",
          };
    } else {
      form.name = "";
      form.phone = "";
      form.email = "";
      form.address = {
        city: "",
        street: "",
        house: "",
        apartment: "",
      };
    }
  },
  { immediate: true }
);
</script>
