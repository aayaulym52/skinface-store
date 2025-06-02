<template>
  <div
    class="banner-container bg-[#ffb2d6] w-full relative flex items-center justify-center overflow-hidden h-[340px] sm:h-[500px] md:h-[600px] transition-height duration-300 ease-in-out"
  >
    <div class="w-full max-w-7xl px-4 mx-auto">
      <div class="relative flex items-center justify-center">
        <div
          :class="[
            'swiper-button bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer',
            'swiper-button-prev left-4',
          ]"
          role="button"
          aria-label="Предыдущий слайд"
          tabindex="0"
          v-html="arrowIcon('prev')"
        />
        <div
          :class="[
            'swiper-button bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer',
            'swiper-button-next right-4',
          ]"
          role="button"
          aria-label="Следующий слайд"
          tabindex="0"
          v-html="arrowIcon('next')"
        />

        <swiper
          :modules="modules"
          :slides-per-view="1"
          :allow-touch-move="false"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }"
          ref="mySwiper"
        >
          <swiper-slide v-for="(slide, index) in slides" :key="index">
            <div class="flex items-center justify-center w-full h-full">
              <img
                :src="slide.src"
                :alt="slide.alt"
                class="object-contain max-w-full max-h-full"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <button
      type="button"
      class="absolute left-1/2 -translate-x-1/2 bg-blue-500 text-white font-medium rounded-full shadow-md hover:bg-blue-600 transition duration-300 text-center bottom-2 sm:bottom-6 md:bottom-6 text-xs px-4 py-1.5 sm:text-sm sm:px-6 sm:py-2 md:text-lg md:px-8 md:py-4"
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
const slides = [
  { src: "/diagnost1.jpg", alt: "Диагностика 1" },
  { src: "/diagnost2.jpg", alt: "Диагностика 2" },
  { src: "/diagnost3.jpg", alt: "Диагностика 3" },
];

const arrowIcon = (direction) => `
  <svg xmlns="http://www.w3.org/2000/svg" class="text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" aria-hidden="true" focusable="false">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${
      direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"
    }"/>
  </svg>`;
</script>

<style scoped>
.swiper-button-prev::after,
.swiper-button-next::after {
  display: none;
}
.swiper-button-prev,
.swiper-button-next {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

@media (max-width: 640px) {
  .swiper-button-prev,
  .swiper-button-next {
    width: 28px;
    height: 28px;
  }
  .swiper-button-prev svg,
  .swiper-button-next svg {
    width: 14px;
    height: 14px;
  }
}

.swiper-slide {
  height: 220px;
  transition: height 0.3s ease-in-out;
}

@media (min-width: 640px) {
  .swiper-slide {
    height: 320px;
  }
}

@media (min-width: 768px) {
  .swiper-slide {
    height: 400px;
  }
}

@media (min-width: 1024px) {
  .swiper-slide {
    height: 420px;
  }
}
</style>
