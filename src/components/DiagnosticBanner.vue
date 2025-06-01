<template>
  <div
    class="bg-[#ffb2d6] w-full relative flex items-center justify-center overflow-hidden h-[500px] sm:h-[500px] md:h-[600px]"
  >
    <div class="w-full max-w-7xl px-4 mx-auto relative">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :allow-touch-move="false"
        navigation
        ref="mySwiper"
      >
        <swiper-slide>
          <div
            class="flex items-center justify-center h-[220px] sm:h-[320px] md:h-[400px] lg:h-[420px]"
          >
            <img
              src="/diagnost1.jpg"
              alt="Диагностика 1"
              class="object-contain max-w-full max-h-full"
            />
          </div>
        </swiper-slide>

        <swiper-slide>
          <div
            class="flex items-center justify-center h-[220px] sm:h-[320px] md:h-[400px] lg:h-[420px]"
          >
            <img
              src="/diagnost2.jpg"
              alt="Диагностика 2"
              class="object-contain max-w-full max-h-full"
            />
          </div>
        </swiper-slide>

        <swiper-slide>
          <div
            class="flex items-center justify-center h-[220px] sm:h-[320px] md:h-[400px] lg:h-[420px]"
          >
            <img
              src="/diagnost3.jpg"
              alt="Диагностика 3"
              class="object-contain max-w-full max-h-full"
            />
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <button
      class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-sm sm:text-base md:text-lg font-medium px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-md hover:bg-blue-600 transition duration-300 text-center"
    >
      ЗАПИСАТЬСЯ НА ДИАГНОСТИКУ
    </button>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const modules = [Navigation];
</script>
