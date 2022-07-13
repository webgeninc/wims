<template>
  <div class="h-full w-full bg-gray-50">
    <div class="text-2sm bg-gray-100 bg-opacity-50 p-4">
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
    <div class="text-2sm bg-gray-200 bg-opacity-70 p-4">
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

    const pageNumber = ref<number>(0);

    const localStorageIntroSet = (val: boolean) => {
      localStorage.setItem("intro", "" + val);
      dateStor.introRefresh();
    };

    const closeIntro = () => {
      localStorageIntroSet(false);
    };

    return { closeIntro, pageNumber };
  },
});
</script>
