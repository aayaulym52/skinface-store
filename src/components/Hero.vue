<script></script>

<template>
  <div class="w-full font-inter">
    <div class="h-full">
      <header
        class="relative w-full min-h-[40vh] sm:min-h-[65vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden mt-4 lg:mt-8"
      >
        <img
          src="/bg.jpg"
          alt=""
          class="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-black bg-opacity-20 z-10"></div>

        <div
          class="relative z-20 px-4 sm:px-8 flex flex-col items-center justify-center text-center gap-4 w-full max-w-[1000px]"
        >
          <h1 class="text-2xl sm:text-4xl lg:text-5xl text-white font-medium">
            Открой для себя новую <br />коллекцию ухода
          </h1>

          <router-link to="/shop">
            <button
              class="text-md font-medium text-gray-800 border bg-white rounded-md h-11 px-8 hover:bg-gray-200 active:bg-green-200 transition-colors"
            >
              Каталог
            </button>
          </router-link>
        </div>
      </header>
    </div>
  </div>
</template>
