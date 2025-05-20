<template>
  <div class="mt-6 mx-auto max-w-md">
    <form @submit.prevent="login" class="space-y-4">
      <input
        v-model="email"
        type="email"
        placeholder="Электронная почта"
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
        class="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-full transition"
      >
        Войти
      </button>
    </form>

    <p class="text-center mt-6">
      Нет аккаунта?
      <button
        @click="emit('switch')"
        class="text-blue-500 hover:text-blue-700 ml-1"
      >
        Зарегистрируйтесь
      </button>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineEmits } from "vue";
import AuthModal from "./AuthModal.vue";

const email = ref("");
const password = ref("");
const showModal = ref(false);
const router = useRouter();
const emit = defineEmits(["switch", "success"]);

const inputClass =
  "w-full py-4 px-4 rounded-full border border-slate-300 outline-none hover:border-pink-400 transition";

const login = async () => {
  try {
    const res = await fetch("https://61491fe95a8721ce.mokky.dev/auth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("email", email.value); 
      alert("Вход выполнен!");
      emit("success");
      router.push("/");
    } else {
      alert("Ошибка: " + (result.message || "Неверный email или пароль"));
    }
  } catch (err) {
    alert("Ошибка входа: " + err.message);
  }
};
</script>
