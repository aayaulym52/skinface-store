<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white rounded-xl p-6 w-96 relative">
      <div class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-3xl font-bold">
            {{ showLogin ? "Вход" : "Регистрация" }}
          </h2>
          <button @click="close">
            <img src="/close.png" alt="Закрыть" class="w-6 h-6" />
          </button>
        </div>
        <div class="mt-4 border-b border-gray-300"></div>
      </div>
      <RegisterForm
        v-if="!showLogin"
        @switch="toggleForm"
        @success="handleSuccess"
      />
      <Authorization v-else @switch="toggleForm" @success="handleSuccess" />
    </div>
  </div>
</template>

<script setup>
import Authorization from "./Authorization.vue";
import RegisterForm from "./RegisterForm.vue";

const props = defineProps({
  mode: String,
  showLogin: Boolean,
  toggleForm: Function,
});

const emit = defineEmits(["close", "success"]);

function close() {
  emit("close");
}

function handleSuccess() {
  emit("success");
}
</script>
