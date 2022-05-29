<template>
  <div
    oncontextmenu="return false"
    class="bg-gradient-to-b from-gray-700 via-gray-700 to-gray-800 w-full h-full shadow-2xl flex flex-row justify-center font-montserrat border-l"
  >
    <div class="h-full w-full flex flex-col">
      <div class="flex-1 w-full"></div>
      <div
        class="w-full h-8 bg-white bg-opacity-20 flex justify-end items-center border-t border-gray-300"
      >
        <div class="h-full w-12 p-1">
          <div
            class="h-full w-full bg-gray-400 rounded-2xl hover:opacity-90 cursor-pointer transition"
          ></div>
        </div>
        <div class="h-full w-12 p-1">
          <div
            class="h-full w-full bg-gray-400 rounded-2xl hover:opacity-90 cursor-pointer transition"
          ></div>
        </div>
        <div class="h-full w-12 p-1">
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
