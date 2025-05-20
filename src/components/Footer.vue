<template>
  <footer class="border-t border-gray-300 bg-[#4C6EF5] py-10 px-20">
    <div class="flex flex-wrap justify-between font-inter mx-10 items-start">
      <!-- Бренд -->
      <div class="flex-1 min-w-[170px]">
        <h5 class="text-white text-2xl font-bold pb-2">Skinface</h5>
      </div>

      <!-- Навигация -->
      <div class="flex-1 min-w-[170px]">
        <ul class="list-none p-0 space-y-2">
          <li>
            <router-link
              to="/shop"
              class="block text-white text-lg uppercase hover:text-slate-300"
              >Каталог</router-link
            >
          </li>
          <li>
            <router-link
              to="/about-us"
              class="block text-white text-lg uppercase hover:text-slate-300"
              >О нас</router-link
            >
          </li>
          <li>
            <router-link
              to="/delivery"
              class="block text-white text-lg uppercase hover:text-slate-300"
              >Доставка</router-link
            >
          </li>
          <li>
            <router-link
              to="/contact"
              class="block text-white text-lg uppercase hover:text-slate-300"
              >Контакты</router-link
            >
          </li>
        </ul>
      </div>

      <!-- Инфо -->
      <div class="flex-1 min-w-[170px] space-y-3">
        <div>
          <p class="uppercase text-lg text-white">Время доставки</p>
          <p class="uppercase text-sm text-white font-light -mt-1">
            с 10:00 до 20:00
          </p>
        </div>
        <div>
          <p class="uppercase text-lg text-white">Консультируем</p>
          <p class="uppercase text-sm text-white -mt-1">с 10:00 до 24:00</p>
        </div>
        <div>
          <p class="uppercase text-lg text-white">Адрес в Алматы</p>
          <p class="text-sm text-white -mt-1">ул Желтоксан 34/3</p>
        </div>
        <div>
          <p class="uppercase text-lg text-white">Адрес в Астане</p>
          <p class="text-sm text-white -mt-1">Анет Баба 14</p>
        </div>
      </div>

      <!-- 4. Соцсети -->
      <div class="flex-1 min-w-[170px]">
        <div class="flex gap-4">
          <img src="/instagram.png" alt="Instagram" width="34" height="34" />
          <img src="/whatssapp.png" alt="WhatsApp" width="30" height="30" />
          <img src="/telegram.png" alt="Telegram" width="30" height="30" />
        </div>
      </div>
    </div>
  </footer>
</template>
