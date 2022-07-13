<template>
  <div
    class="h-full w-full bg-gray-50 shadow-2xl border border-gray-300 rounded-xl overflow-hidden"
  >
    <div class="flex flex-col justify-center items-center w-full h-full">
      <div class="w-full flex justify-center items-center bg-webgencol h-10">
        <h1
          class="m-2 text-gray-100 text-base text-center flex-1 overflow-hidden"
        >
          Wprowadzenie do WIMS 1.0.00
        </h1>
        <div
          @click="closeIntro"
          class="w-10 absolute right-0 top-0 h-10 bg-gray-500 flex justify-center items-center cursor-pointer hover:brightness-125 transition-all"
        >
          <span class="brightness-150">✖</span>
        </div>
      </div>
      <div class="w-full h-full bg-gray-50"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";
import { dataStore } from "@/stores/data.js";

export default defineComponent({
  name: "HeaderPlace",
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
