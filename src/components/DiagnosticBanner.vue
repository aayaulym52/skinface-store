<template>
  <div
    class="bg-[#ffb2d6] w-full h-[600px] relative flex items-center justify-center overflow-hidden mt-10"
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
          <div class="flex items-center justify-center h-[400px]">
            <img
              src="/diagnost1.jpg"
              alt="Диагностика 1"
              width="492"
              height="320"
              class="object-contain"
            />
          </div>
        </swiper-slide>

        <swiper-slide>
          <div class="flex items-center justify-center h-[400px]">
            <img
              src="/diagnost2.jpg"
              alt="Диагностика 2"
              width="492"
              height="320"
              class="object-contain"
            />
          </div>
        </swiper-slide>

        <swiper-slide>
          <div class="flex items-center justify-center h-[400px]">
            <img
              src="/diagnost3.jpg"
              alt="Диагностика 3"
              width="492"
              height="320"
              class="object-contain"
            />
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <button
      class="absolute bottom-8 bg-blue-500 text-white text-lg font-semibold px-8 py-4 rounded-full shadow hover:bg-blue-700 transition"
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
