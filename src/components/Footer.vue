<template>
  <footer
    class="border-t border-gray-300 bg-[#4C6EF5] py-10 px-4 sm:px-10 lg:px-20"
  >
    <div
      class="flex flex-col lg:flex-row flex-wrap justify-between gap-y-8 items-start font-inter"
    >
      <div class="flex-1 min-w-[150px]">
        <h5 class="text-white text-2xl sm:text-2xl font-bold">Skinface</h5>
      </div>

      <div class="flex-1 min-w-[150px]">
        <ul class="space-y-2">
          <li>
            <router-link
              to="/shop"
              class="block text-white text-md sm:text-base uppercase hover:text-slate-300"
              >Каталог</router-link
            >
          </li>
          <li>
            <router-link
              to="/about-us"
              class="block text-white text-md sm:text-base uppercase hover:text-slate-300"
              >О нас</router-link
            >
          </li>
          <li>
            <router-link
              to="/delivery"
              class="block text-white text-md sm:text-base uppercase hover:text-slate-300"
              >Доставка</router-link
            >
          </li>
          <li>
            <router-link
              to="/contact"
              class="block text-white text-md sm:text-base uppercase hover:text-slate-300"
              >Контакты</router-link
            >
          </li>
        </ul>
      </div>

      <div class="flex-1 min-w-[150px] space-y-3">
        <div>
          <p class="uppercase text-white text-md sm:text-base font-semibold">
            Время доставки
          </p>
          <p class="uppercase text-white text-sm sm:text-sm font-light -mt-1">
            с 10:00 до 20:00
          </p>
        </div>
        <div>
          <p class="uppercase text-white text-md sm:text-base font-semibold">
            Консультируем
          </p>
          <p class="uppercase text-white text-sm sm:text-sm -mt-1">
            с 10:00 до 24:00
          </p>
        </div>
        <div>
          <p class="uppercase text-white text-md sm:text-base font-semibold">
            Адрес в Алматы
          </p>
          <p class="text-white text-sm sm:text-sm -mt-1">ул Желтоксан 34/3</p>
        </div>
        <div>
          <p class="uppercase text-white text-md sm:text-base font-semibold">
            Адрес в Астане
          </p>
          <p class="text-white text-sm sm:text-sm -mt-1">Анет Баба 14</p>
        </div>
      </div>

      <div class="flex-1 min-w-[150px]">
        <div class="flex gap-4">
          <img src="/instagram.png" alt="Instagram" width="30" height="30" />
          <img src="/whatssapp.png" alt="WhatsApp" width="28" height="28" />
          <img src="/telegram.png" alt="Telegram" width="28" height="28" />
        </div>
      </div>
    </div>
  </footer>
</template>
