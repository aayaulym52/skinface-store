<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import AuthModal from "./components/AuthModal.vue";

const showModal = ref(false);
const showLogin = ref(false);

function openAuthModal() {
  showModal.value = true;
  showLogin.value = false;
}

function closeAuthModal() {
  showModal.value = false;
}

function toggleForm() {
  showLogin.value = !showLogin.value;
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header @open-auth="openAuthModal" />

    <main class="flex-1">
      <router-view />
    </main>

    <Footer />

    <AuthModal
      v-if="showModal"
      :showLogin="showLogin"
      :toggleForm="toggleForm"
      @close="closeAuthModal"
      @success="closeAuthModal"
    />
  </div>
</template>
