<template>
  <AuthModal v-if="showModal" @close="showModal = false" />

  <div class="mt-4 mx-auto w-full max-w-sm px-3 sm:px-6">
    <form @submit.prevent="register" class="space-y-3 sm:space-y-4">
      <input v-model="name" type="text" placeholder="ФИО" :class="inputClass" />
      <input
        v-model="phone"
        type="phone"
        placeholder="Телефон"
        :class="inputClass"
      />
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        :class="inputClass"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Пароль"
        :class="inputClass"
      />

      <button
        type="submit"
        class="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-full text-sm sm:text-base transition"
      >
        Зарегистрироваться
      </button>
    </form>

    <p class="text-center mt-5 text-xs sm:text-sm">
      У меня есть аккаунт.
      <button @click="emit('switch')" class="text-blue-500 hover:text-blue-700 font-medium">
        Войти
      </button>
    </p>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineEmits } from "vue";
import AuthModal from "./AuthModal.vue";

const inputClass =
  "w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-full border border-slate-300 outline-none hover:border-pink-400 text-sm sm:text-base transition";

const name = ref("");
const email = ref("");
const password = ref("");
const phone = ref("");
const showModal = ref(false);
const router = useRouter();

const emit = defineEmits(["switch", "success"]);

const register = async () => {
  if (!name.value || !email.value || !password.value || !phone.value) {
    alert("Пожалуйста, заполните все поля!");
    return;
  }

  try {
    const res = await fetch("https://61491fe95a8721ce.mokky.dev/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: name.value,
        phone: phone.value,
        email: email.value,
        password: password.value,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("email", email.value);
      alert("Регистрация прошла успешно!");
      emit("success");
      router.push("/");
    } else {
      alert("Ошибка: " + (result.message || "Не удалось зарегистрироваться"));
    }
  } catch (err) {
    alert("Ошибка регистрации: " + err.message);
  }
};
</script>
