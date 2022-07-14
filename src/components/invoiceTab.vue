<template>
  <div class="w-full bg-gray-50 flex justify-start items-center">
    <div class="w-full h-full flex flex-col justify-center items-center">
      <div class="text-2sm bg-gray-100 bg-opacity-50 p-4 w-full">
        <h3 class="text-2base mb-1 tracking-wide">
          Sprzedawca<span class="text-xs tracking-wide">
            (wystawiający fakturę)</span
          >
        </h3>
        <div class="pt-1 pb-1 flex justify-center items-center">
          <label class="p-1 pr-4 pl-0 w-1/5">Firma</label>
          <input
            class="p-1 flex-1 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
            type="text"
          />
        </div>
        <div class="pt-1 pb-1 flex justify-center items-center">
          <label class="p-1 pr-4 pl-0 w-1/5">Ulica</label>
          <input
            class="p-1 flex-1 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
            type="text"
          />
        </div>
        <div class="pt-1 pb-1 flex justify-center items-center">
          <label class="p-1 pr-4 pl-0 w-1/5">Adres</label>
          <input
            class="p-1 flex-1 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
            type="text"
          />
        </div>
        <div class="pt-1 pb-1 flex justify-center items-center">
          <label class="p-1 pr-4 pl-0 w-1/5">NIP</label>
          <input
            class="p-1 flex-1 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
            type="text"
          />
        </div>
      </div>
      <div class="text-2sm bg-gray-200 bg-opacity-70 p-4 w-full">
        <h3 class="text-2base mb-1 tracking-wide">
          Nabywca
          <span class="text-xs tracking-wide"> (otrzymujący fakturę)</span>
        </h3>
        <div class="pt-1 pb-1 flex justify-center items-center">
          <label class="p-1 pr-4 pl-0 w-1/5">Firma</label>
          <input
            class="p-1 flex-1 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
            type="text"
          />
        </div>
        <div class="pt-1 pb-1 flex justify-center items-center">
          <label class="p-1 pr-4 pl-0 w-1/5">Ulica</label>
          <input
            class="p-1 flex-1 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
            type="text"
          />
        </div>
        <div class="pt-1 pb-1 flex justify-center items-center">
          <label class="p-1 pr-4 pl-0 w-1/5">Adres</label>
          <input
            class="p-1 flex-1 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
            type="text"
          />
        </div>
        <div class="pt-1 pb-1 flex justify-center items-center">
          <label class="p-1 pr-4 pl-0 w-1/5">NIP</label>
          <input
            class="p-1 flex-1 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
            type="text"
          />
        </div>
      </div>
      <div class="text-2sm bg-gray-100 bg-opacity-50 p-4 w-full">
        <h3 class="text-2base mb-1 tracking-wide">Szczegóły faktury</h3>
        <div
          class="pt-0.5 pb-1 w-full flex flex-col justify-center items-start"
        >
          <label class="p-1 pl-0">Miejsce i data wystawienia faktury</label>
          <div class="flex justify-between items-center w-full">
            <input
              class="p-1 flex-1 w-full pr-2 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
            />
            <input
              class="ml-1 p-0.75 pl-1.5 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="date"
            />
          </div>
        </div>
        <div
          class="pt-0.5 pb-1 w-full flex flex-col justify-center items-start"
        >
          <label class="p-1 pl-0">Termin i forma płatności</label>
          <div class="flex justify-between items-center w-full">
            <input
              class="p-0.75 pl-1.5 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="date"
            />
            <select
              class="ml-1 p-1 flex-1 w-full pr-2 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
            >
              <option value="">Przelew</option>
              <option value="">Gotówka</option>
            </select>
          </div>
        </div>
        <div
          class="pt-0.5 pb-1 w-full flex flex-col justify-center items-start"
        >
          <label class="p-1 pl-0"
            >Numer faktury i data zakończenia usługi</label
          >
          <div class="flex justify-between items-center w-full">
            <input
              class="p-0.75 pl-1.5 mr-2 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
            />
            <input
              class="p-0.75 pl-1.5 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="date"
            />
          </div>
        </div>
      </div>
      <div class="text-2sm bg-gray-200 bg-opacity-70 p-4 w-full">
        <h3 class="text-2base mb-1 tracking-wide">Usługi</h3>
        <div
          class="pt-0.5 pb-1 w-full flex flex-col justify-center items-start"
        >
          <div class="flex justify-between items-center w-full pt-0.5 pb-1">
            <label class="p-1 pl-0 pr-4 text-sm">{{ quantity }}. </label>
            <input
              class="p-1 pl-1.5 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
              placeholder="Nazwa usługi"
            />
          </div>
          <div class="flex justify-between items-center w-full pt-0.5 pb-1">
            <input
              class="p-1 pl-1.5 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
              placeholder="j.m."
            />
            <input
              class="ml-1 pl-1.5 p-1 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
              placeholder="Ilość"
            />
            <input
              class="ml-1 pl-1.5 p-1 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
              placeholder="Cena netto"
            />
          </div>
          <div class="flex justify-between items-center w-full pt-0.5 pb-1">
            <input
              class="p-1 pl-1.5 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
              placeholder="VAT"
            />
            <input
              class="ml-1 pl-1.5 p-1 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
              placeholder="Cena brutto"
            />
          </div>
          <div class="flex justify-between items-center w-full pt-0.5 pb-1">
            <input
              class="p-1 pl-1.5 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
              placeholder="Wartość netto"
            />
            <input
              class="ml-1 pl-1.5 p-1 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
              placeholder="Wartość brutto"
            />
          </div>
          <div class="flex justify-end items-center w-full mt-1 mb-1 pt-1 pb-1">
            <button
              @click="addService"
              class="bg-gray-400 p-1 pr-3 pl-3 rounded-xl text-gray-50 cursor-pointer hover:opacity-80 transition-all"
            >
              Dodaj następną
            </button>
          </div>
        </div>
      </div>
      <div class="text-2sm bg-gray-100 bg-opacity-50 p-4 w-full">
        <div class="flex justify-between items-center">
          <h3 class="text-2base tracking-wide">Suma</h3>
          <span class="text-2base"> 320<span> PLN</span></span>
        </div>
        <div
          class="flex flex-col justify-center items-start w-full mt-1 mb-1 pt-1 pb-1"
        >
          <div class="flex mt-1 justify-center items-center w-full">
            <p class="pr-4 text-sm tracking-wide">Wpłata na konto</p>
            <input
              class="p-1 flex-1 pl-1.5 w-full 2 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
              placeholder="Nazwa banku"
            />
          </div>
          <input
            class="p-1 mt-2 pl-1.5 flex-1 w-full 2 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
            type="number"
            placeholder="Numer konta"
          />
        </div>
        <div class="flex justify-end items-center w-full mt-2 pt-1 pb-1">
          <button
            class="bg-webgencol p-1 pr-3 pl-3 rounded-xl text-gray-50 cursor-pointer hover:opacity-80 transition-all"
          >
            Generuj fakturę
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";
import { dataStore } from "@/stores/data.js";

export default defineComponent({
  name: "InvoiceTab",
  setup() {
    const dateStor: any = dataStore();

    const Services = ref<any[]>([]);

    const Service = ref<Object>({
      number: 1,
      name: "",
      jm: "",
      amount: 0,
      netPrice: 0,
      vat: 0,
      grossPrice: 0,
      netValue: 0,
      grossValue: 0,
    });

    const quantity = ref<number>(1);

    const addService = () => {
      quantity.value++;
    };

    return { quantity, addService, Service, Services };
  },
});
</script>
