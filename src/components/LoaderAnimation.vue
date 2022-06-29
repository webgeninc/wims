<template>
  <div class="flex justify-center items-center w-full h-full">
    <div class="w-full h-full flex justify-around items-center p-4 opacity-50">
      <div
        class="animate-load [animation-timing-function: cubic-bezier(0.1, 0, 0.8, 1)]"
      >
        <div class="w-1.5 h-1.5 bg-gray-700 opacity-80 rounded-full"></div>
      </div>
      <div
        class="animate-load [animation-delay:0.1s] [animation-timing-function: cubic-bezier(0.1, 0, 0.8, 1)]"
      >
        <div class="w-1.5 h-1.5 bg-gray-700 opacity-80 rounded-full"></div>
      </div>
      <div
        class="animate-load [animation-delay:0.2s] [animation-timing-function: cubic-bezier(0.1, 0, 0.8, 1)]"
      >
        <div class="w-1.5 h-1.5 bg-gray-700 opacity-80 rounded-full"></div>
      </div>
      <div
        class="animate-load [animation-delay:0.3s] [animation-timing-function: cubic-bezier(0.1, 0, 0.8, 1)]"
      >
        <div class="w-1.5 h-1.5 bg-gray-700 opacity-80 rounded-full"></div>
      </div>
      <div
        class="animate-load [animation-delay:0.4s] [animation-timing-function: cubic-bezier(0.1, 0, 0.8, 1)]"
      >
        <div class="w-1.5 h-1.5 bg-gray-700 opacity-80 rounded-full"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingAnimation",
});
</script>
