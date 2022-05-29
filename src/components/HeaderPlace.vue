<template>
  <div
    oncontextmenu="return false"
    class="bg-gradient-to-b from-gray-700 via-gray-700 to-gray-800 w-full h-full shadow-2xl flex flex-row justify-center font-montserrat"
  >
    <div class="h-full w-full flex flex-col">
      <div class="flex-1 w-full">
        <div class="flex flex-col justify-center items-center h-full w-full">
          <div class="flex-1 flex w-full"></div>
          <div
            class="flex w-full flex-col justify-center items-end mb-0 mt-0 font-light bg-gray-600 text-gray-100 tracking-wide"
          >
            <div class="w-full pr-3 pl-3 pb-2">
              <div class="flex flex-row justify-end items-center w-full mt-2">
                <p
                  class="text-2xs 2xl:text-2xs 3xl:text-sm text-center cursor-default select-none pr-5"
                >
                  poniedziałek
                </p>
                <p
                  class="text-2xs 2xl:text-2xs 3xl:text-sm text-center cursor-default select-none"
                >
                  kwiecień
                </p>
              </div>
              <div class="flex flex-row justify-end items-center w-full">
                <p
                  class="text-2xs 2xl:text-2xs 3xl:text-sm text-center cursor-default select-none pr-5"
                >
                  14:23
                </p>
                <p
                  class="text-2xs 2xl:text-2xs 3xl:text-sm text-center cursor-default select-none"
                >
                  03.03.2022
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full h-20 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-200"
      >
        <div
          class="flex justify-center items-center rounded-full w-full h-full"
        >
          <div
            class="h-32 w-32 relative bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex justify-center items-center"
          >
            <img
              src="../assets/logo_circle.svg"
              alt="WIMS"
              class="cursor-default select-none h-full font-montserrat w-24 absolute"
            />
          </div>
          <div class="pl-1 pr-2">
            <p
              class="text-xs 2xl:text-sm 3xl:text-base 3xl:tracking-widest tracking-normal font-medium"
            >
              WEBGENETICSS
            </p>
            <p class="text-xs 2xl:text-sm tracking-wider font-bold">WIMS</p>
          </div>
        </div>
      </div>
      <div
        class="w-full h-8 bg-webgencol bg-opacity-80 flex justify-end items-center pr-2"
      >
        <div class="h-full w-12 p-1.5">
          <div
            class="h-full w-full bg-gray-300 opacity-60 rounded-2xl hover:opacity-80 cursor-pointer transition"
          ></div>
        </div>
        <div class="h-full w-12 p-1.5">
          <div
            class="h-full w-full bg-gray-300 rounded-2xl transition flex justify-center items-center text-lg font-semibold"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import { ref } from "vue";
// import { supabase } from "../supabase/init.js";
import { defineComponent } from "vue";
import { dataStore } from "@/stores/data.js";

export default defineComponent({
  name: "HeaderPlace",
  setup() {
    const dat = dataStore();

    console.log(dat.dataTabs);

    return { dat };
  },
});
</script>
