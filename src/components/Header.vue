<script setup>
import { defineEmits } from "vue";
import { useRouter } from "vue-router";

const emit = defineEmits(["open-auth"]);
const router = useRouter();

function handleUserClick() {
  const token = localStorage.getItem("token");
  if (token) {
    router.push("/profile");
  } else {
    emit("open-auth");
  }
}
</script>

<template>
  <div class="flex flex-col relative h-full font-inter">
    <nav class="sticky top-0 z-30 bg-white py-4 border-b border-b-[#eeeeec]">
      <div
        class="max-w-[1680px] px-4 md:px-6 lg:px-8 mx-auto flex items-center justify-between"
      >
        <h2 class="text-2xl font-bold text-primary relative z-30">Skinface</h2>

        <ul class="flex items-center gap-14 cursor-pointer">
          <router-link to="/">
            <li class="text-lg text-slate-500 hover:text-black">Главная</li>
          </router-link>
          <router-link to="/shop">
            <li class="text-lg text-slate-500 hover:text-black">Магазин</li>
          </router-link>
          <router-link to="/delivery">
            <li class="text-lg text-slate-500 hover:text-black">Доставка</li>
          </router-link>
          <router-link to="/contact">
            <li class="text-lg text-slate-500 hover:text-black">Контакты</li>
          </router-link>
        </ul>

        <div class="flex items-center gap-8">
          <button
            @click="handleUserClick"
            class="focus:outline-none"
            aria-label="Профиль пользователя"
          >
            <img src="/person.png" alt="Профиль" />
          </button>
          <router-link to="/favorites">
            <img src="/like-1.png" alt="" />
          </router-link>
          <router-link to="/cart">
            <img src="/shopping-cart.png" alt="" />
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>
