<template>
  <div
    class="h-full w-full bg-gray-50 shadow-2xl border border-gray-300 rounded-xl overflow-hidden"
  >
    <div class="flex justify-center items-center">
      <div class="w-full flex justify-center items-center bg-webgencol h-10">
        <h1
          class="m-2 text-gray-100 text-base text-center flex-1 overflow-hidden"
        >
          Wprowadzenie do WIMS 1.0.00
        </h1>
        <div
          class="w-8 absolute right-0 top-0 h-10 bg-gray-300 flex justify-center items-center cursor-pointer hover:opacity-80"
        >
          <span class="">✖</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderPlace",
  setup() {
    return {};
  },
});
</script>
