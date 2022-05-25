<template>
  <div
    class="flex w-screen h-screen bg-white flex-grow xl:p-32 font-montserrat overflow-hidden"
  >
    <div
      class="flex flex-col flex-grow h-full items-center justify-start xl:justify-center"
    >
      <div
        class="bg-white w-full xl:w-1/2 2xl:w-1/2 3xl:w-2/5 xl:rounded-3xl xl:shadow-lg flex flex-col xl:border border-gray-100 h-full xl:h-auto"
      >
        <div
          class="bg-gradient-to-tl from-gray-50 via-gray-50 to-gray-100 mb-7 xl:mb-2 rounded-none xl:rounded-t-3xl h-2/5 xl:h-36 2xl:h-40"
        >
          <div
            class="flex flex-col xl:flex-row justify-between h-full items-start xl:items-center"
          >
            <img
              src="../assets/systems.svg"
              class="h-1/2 xl:h-full xl:w-auto overflow-hidden"
            />
            <div
              class="self-center h-1/2 w-full xl:h-full xl:w-1/3 flex-shrink-0 p-2.5 xl:pr-3 xl:p-0 flex flex-col justify-center items-end overflow-hidden"
            >
              <h2
                class="text-right font-medium tracking-wider leading-5 text-sm xl:text-xs 2xl:text-sm 3xl:text-base"
              >
                <span
                  class="tracking-wider font-semibold text-base xl:text-sm 2xl:text-base 3xl:text-lg"
                  >WEBGENETICSS</span
                >
                Interpolate
              </h2>
              <h2
                class="text-right font-medium tracking-wider leading-5 text-sm xl:text-xs 2xl:text-sm 3xl:text-base"
              >
                Management System
              </h2>
              <h2
                class="text-right text-2xs xl:text-3xs 2xl:text-2xs 3xl:text-xs font-medium tracking-wide leading-4"
              >
                1.0.00
              </h2>
              <p
                class="text-gray-600 font-normal text-xs text-right tracking-wide"
              >
                ♻ CO2-FREE
                <span
                  class="font-medium tracking-widest text-2xs xl:text-3xs 2xl:text-2xs 3xl:text-xs"
                  >for our planet</span
                >
              </p>
            </div>
          </div>
        </div>
        <form
          @submit.prevent="login"
          class="flex flex-col justify-center items-center p-5 xl:pr-10 xl:pl-10 3xl:pr-14 3xl:pl-14"
        >
          <input
            required
            id="email"
            type="text"
            placeholder="email lub login"
            v-model="email"
            class="mr-2 ml-2 mt-3 p-3 border text-gray-900 border-gray-400 rounded-xl focus:border-webgencol focus:outline-none w-full"
          />
          <input
            required
            id="password"
            type="password"
            placeholder="hasło"
            v-model="password"
            class="mr-2 ml-2 mt-5 xl:mt-5 p-3 mb-3 border-gray-400 border rounded-xl focus:border-webgencol focus:outline-none w-full"
          />
          <button
            type="submit"
            class="self-center mt-3 mb-5 p-2.5 pr-12 pl-12 xl:p-2 xl:pr-8 xl:pl-8 bg-gray-200 rounded-xl transition hover:bg-webgencol hover:text-white"
          >
            Zaloguj się
          </button>
          <div
            v-if="errorMsg"
            class="flex justify-center items-center text-justify font-medium tracking-wider text-red-600 text-xs pr-14 pl-14 mb-2"
          >
            <p>{{ errorMsg }}</p>
          </div>
          <div
            v-if="errorMsgEng"
            class="flex justify-center items-center text-justify font-medium tracking-wider text-red-600 text-2xs pr-14 pl-14 mb-5"
          >
            <p>{{ errorMsgEng }}</p>
          </div>
          <div
            v-if="niceMsg"
            class="flex justify-center items-center text-justify font-medium tracking-wider text-webgencol text-sm xl:text-xs pr-14 pl-14 mb-2"
          >
            <p>{{ niceMsg }}</p>
          </div>
          <div
            v-if="niceMsgEng"
            class="flex justify-center items-center text-justify font-medium tracking-wider text-webgencol text-xs xl:text-2xs pr-14 pl-14 mb-5"
          >
            <p>{{ niceMsgEng }}</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { supabase } from "../supabase/init.js";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const email = ref<string>("");
    const password = ref<string>("");
    const errorMsg = ref<string>("");
    const errorMsgEng = ref<string>("");
    let niceMsg = ref<string>("Miłego dnia :)");
    let niceMsgEng = ref<string>("Have a nice day :)");
    const router = useRouter();

    interface Error {
      status?: number;
      message?: string;
    }

    const login = async () => {
      try {
        const { error } = await supabase.auth.signIn({
          email: email.value as string,
          password: password.value as string,
        });
        if (error) throw error;

        setTimeout(() => {
          router.push({ name: "HomeView" });
        }, 500);
      } catch (error_description) {
        if (error_description != Error) {
          if (
            (error_description as Error).message === "Invalid login credentials"
          ) {
            errorMsg.value = "Zły login lub hasło. Spróbuj ponownie.";
            errorMsgEng.value = "Bad login credentials. Try again.";
          } else {
            errorMsg.value = "Ups...";
            errorMsgEng.value = `${(error_description as Error).message}`;
          }
        }

        niceMsg.value = "";
        niceMsgEng.value = "";
        setTimeout(() => {
          errorMsg.value = "";
          errorMsgEng.value = "";
          niceMsg.value = "Miłego dnia :)";
          niceMsgEng.value = "Have a nice day :)";
        }, 5000);
      }
    };

    return {
      email,
      password,
      errorMsg,
      login,
      niceMsg,
      niceMsgEng,
      errorMsgEng,
    };
  },
});
</script>
