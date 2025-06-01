<template>
  <div class="pb-10">
    <div
      class="max-w-6xl mx-auto py-2 font-inter flex flex-col md:flex-row gap-8 mt-12 px-4"
    >
      <div class="flex-1 min-w-0 max-w-full md:max-w-lg">
        <h2 class="text-3xl md:text-4xl font-semibold mb-6">
          Свяжитесь с нами
        </h2>
        <div class="text-base md:text-lg space-y-1">
          <p><strong>Мы работаем</strong> с 10:00 до 20:00, без выходных</p>
          <p><strong>Адрес в Алматы:</strong> Желтоксан 34/3</p>
          <p><strong>Адрес в Астане:</strong> Анет Баба 14</p>
          <p><strong>Телефон:</strong> +77022323385</p>
          <p><strong>Почта:</strong> skinface@gmail.com</p>

          <p><strong>Наши реквизиты:</strong></p>
          <p>ИП «Skinface», Болатова Медина Жарасбаева</p>
          <p>БИН: 910415450018</p>
          <p>Юр. адрес: г. Алматы, ул. Желтоксан, д. 78/86</p>
          <p>ИИК: KZ61722S000016472308 (АО "KASPI BANK")</p>
          <p>БИК: CASPKZKA</p>
        </div>

        <div class="flex items-center gap-4 mt-3">
          <button>
            <img src="/instagram.png" alt="Instagram" width="30" height="30" />
          </button>
          <button>
            <img src="/whatssapp.png" alt="WhatsApp" width="26" height="26" />
          </button>
          <button>
            <img src="/telegram.png" alt="Telegram" width="26" height="26" />
          </button>
        </div>
      </div>

      <div
        class="bg-[#E9ECEE] rounded-xl p-4 md:p-6 flex-1 w-full max-w-full md:max-w-md min-w-0"
      >
        <h2 class="text-2xl md:text-3xl font-semibold text-center mb-6">
          Форма обратной связи
        </h2>
        <input
          type="text"
          placeholder="Ваше имя"
          class="w-full py-4 px-4 rounded-full outline-sky-500 mb-4 text-sm md:text-base"
        />
        <input
          type="email"
          placeholder="Ваша почта"
          class="w-full py-4 px-4 rounded-full outline-sky-500 mb-4 text-sm md:text-base"
        />
        <input
          type="tel"
          placeholder="Ваш телефон"
          class="w-full py-4 px-4 rounded-full outline-sky-500 mb-4 text-sm md:text-base"
        />
        <textarea
          placeholder="Сообщение"
          class="w-full py-6 px-4 rounded-xl outline-sky-500 mb-4 resize-none text-sm md:text-base"
        ></textarea>
        <button
          class="w-full h-12 md:h-14 text-white bg-[#4C6EF5] rounded-full hover:bg-blue-400 transition text-sm md:text-base"
        >
          Отправить
        </button>
      </div>
    </div>
  </div>
</template>
