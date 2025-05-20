<script></script>

<template>
  <div class="w-full font-inter">
    <div class="h-full">
      <header
        class="w-full min-h-[65vh] sm:min-h-[70vh] flex mt-4 lg:mt-8 overflow-hidden items-center justify-start relative"
      >
        <img
          src="/bg3.webp"
          alt=""
          class="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          class="absolute h-full w-full z-1 inset-0 bg-black bg-opacity-20"
        ></div>
        <div
          class="ml-8 bg-transparent flex flex-col sm:max-w-lg md:max-w-xl lg:max-w-3xl relative z-2 gap-2 md:gap-4 lg:gap-6 items-start"
        >
          <h1
            class="text-2xl text-center md:text-4xl lg:text-6xl text-white font-medium mt-1"
          >
            Открой для себя новую коллекцию ухода
          </h1>

          <div class="w-full flex justify-center">
            <router-link to="/shop">
              <button
                class="inline-flex items-center justify-center gap-2 text-md font-medium text-gray-800 border bg-white rounded-md h-11 px-8 hover:bg-gray-200 active:bg-green-200 transition-colors"
              >
                Каталог
              </button>
            </router-link>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>
