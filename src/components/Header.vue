<script setup>
import { defineEmits } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const isOpen = ref(false);
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

        <ul class="hidden lg:flex items-center gap-14 cursor-pointer">
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

        <div class="flex items-center gap-4 sm:gap-6 md:gap-8">
          <button
            @click="handleUserClick"
            class="focus:outline-none"
            aria-label="Профиль пользователя"
          >
            <img
              src="/person.png"
              alt="Профиль"
              class="w-6 h-6 sm:w-7 sm:h-7"
            />
          </button>
          <router-link to="/favorites">
            <img src="/like-1.png" alt="" class="w-6 h-6 sm:w-7 sm:h-7" />
          </router-link>
          <router-link to="/cart">
            <img
              src="/shopping-cart.png"
              alt=""
              class="w-6 h-6 sm:w-7 sm:h-7"
            />
          </router-link>

          <button
            class="lg:hidden"
            @click="isOpen = !isOpen"
            aria-label="Открыть меню"
          >
            <img
              :src="isOpen ? '/close2.png' : '/menu.png'"
              alt="Меню"
              class="w-5 h-5 sm:w-7 sm:h-7"
            />
          </button>
        </div>
      </div>

      <ul
        v-if="isOpen"
        class="lg:hidden flex items-center justify-between gap-4 cursor-pointer px-4 pt-4 pb-2 bg-white border-t border-gray-200"
      >
        <router-link to="/" @click="isOpen = false">
          <li class="text-base text-slate-500 hover:text-black">Главная</li>
        </router-link>
        <router-link to="/shop" @click="isOpen = false">
          <li class="text-base text-slate-500 hover:text-black">Магазин</li>
        </router-link>
        <router-link to="/delivery" @click="isOpen = false">
          <li class="text-base text-slate-500 hover:text-black">Доставка</li>
        </router-link>
        <router-link to="/contact" @click="isOpen = false">
          <li class="text-base text-slate-500 hover:text-black">Контакты</li>
        </router-link>
      </ul>
    </nav>
  </div>
</template>
