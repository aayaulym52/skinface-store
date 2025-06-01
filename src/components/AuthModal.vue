<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-3"
  >
    <div
      class="bg-white rounded-lg p-3 sm:p-4 w-full max-w-sm relative overflow-y-auto max-h-[90vh]"
    >
      <div class="mb-3">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-xl sm:text-2xl font-semibold">
            {{ showLogin ? "Вход" : "Регистрация" }}
          </h2>
          <button @click="close">
            <img src="/close.png" alt="Закрыть" class="w-5 h-5" />
          </button>
        </div>
        <div class="mt-3 border-b border-gray-200"></div>
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
