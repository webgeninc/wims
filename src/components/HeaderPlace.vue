<template>
  <div
    oncontextmenu="return false"
    class="bg-gradient-to-b from-gray-700 via-gray-700 to-gray-800 w-full h-full shadow-2xl flex flex-row justify-center font-montserrat border-l">
    <p class="text-white">Headerplace</p>
  </div>
</template>

<script lang="ts">
// import { ref } from "vue";
// import { supabase } from "../supabase/init.js";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderPlace",
});
</script>
