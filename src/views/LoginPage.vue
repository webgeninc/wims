<template>
  <div
    class="flex w-screen h-screen bg-white flex-grow xl:p-32 font-montserrat overflow-hidden select-none"
  >
    <div
      class="flex flex-col flex-grow h-full items-center justify-center xl:justify-center"
    >
      <div
        class="bg-white w-full xl:w-1/2 2xl:w-1/2 3xl:w-2/5 flex flex-col h-full xl:h-auto"
      >
        <div
          class="xl:rounded-t-3xl xl:shadow-lg flex flex-col xl:border border-gray-100"
        >
          <div
            class="bg-gradient-to-tl from-gray-50 via-gray-50 to-gray-200 mb-7 xl:mb-2 rounded-none xl:rounded-t-3xl h-2/5 xl:h-36 2xl:h-40"
          >
            <div
              class="flex flex-col xl:flex-row justify-between h-full items-start xl:items-center"
            >
              <img
                src="../assets/systems.svg"
                draggable="false"
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
                  class="text-right text-2xs xl:text-3xs 2xl:text-2xs 3xl:text-xs font-medium tracking-wide leading-4 mt-0.5"
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
            class="flex flex-col justify-center items-center p-3 pt-5 xl:pr-10 xl:pl-10 3xl:pr-14 3xl:pl-14"
          >
            <input
              required
              id="email"
              type="text"
              ref="emailInput"
              placeholder="email / login"
              v-model="email"
              class="mr-2 ml-2 mt-3 p-3 border text-gray-900 border-gray-400 rounded-xl focus:border-webgencol focus:outline-none w-full"
            />
            <input
              required
              id="password"
              type="password"
              placeholder="hasło / password"
              v-model="password"
              class="mr-2 ml-2 mt-5 xl:mt-5 p-3 mb-3 border-gray-400 border rounded-xl focus:border-webgencol focus:outline-none w-full"
            />
            <button
              type="submit"
              class="self-center overflow-hidden mt-3 mb-0 p-2.5 pr-12 pl-12 xl:p-2 xl:pr-3xl:pl-3 xl:w-32 xl:h-10 bg-gray-100 rounded-xl transition hover:bg-gray-200"
            >
              <!-- <span
                v-if="loadingAnim"
                class="w-full h-full flex justify-center items-centerxl:h-10"
              >
                <div
                  class="w-0.5 h-0.5 rounded-full p-3 bg-gradient-to-t from-gr ay-400 via-gray-50 to-gray-50 flex justify-center items-center animate-spin"
                >
                  <div class="w-0.5 h-0.5 rounded-full p-2 bg-gray-100"></div>
                </div>
              </span> -->
              <span
                v-if="!loadingAnim"
                class="font-medium text-gray-800 text-sm tracking-wider"
              >
                <span>Zaloguj się</span>
              </span>
              <span v-else>
                <LoaderAnimation />
              </span>
            </button>
          </form>
          <div class="flex justify-end items-center p-1 pt-0">
            <div class="flex justify-center items-center">
              <p class="text-xs">powered by</p>
              <img
                src="../assets/webgeneticss_logo.png"
                draggable="false"
                class="h-9 w-9 overflow-hidden"
              />
            </div>
          </div>
          <!-- <div class="h-px xl:h-1 w-full overflow-hidden">
            <div class="h-full w-full flex justify-end items-center">
              <img
                draggable="false"
                src="../assets/stress.jpg"
                class="h-full w-full overflow-hidden opacity-40 xl:opacity-50 object-fill grayscale invert"
              />
            </div>
          </div> -->
        </div>
        <div class="flex flex-col justify-around items-center mt-5 mb-5">
          <div
            v-if="niceMsg"
            class="flex justify-center items-center text-justify font-medium tracking-wider text-green-700 text-sm xl:text-xs mb-1"
          >
            <p>{{ niceMsg }}</p>
          </div>
          <div
            v-if="niceMsgEng"
            class="flex justify-center items-center text-justify font-medium tracking-wider text-green-700 text-xs xl:text-2xs"
          >
            <p>{{ niceMsgEng }}</p>
          </div>
          <div
            v-if="errorMsg"
            class="flex justify-center items-center text-justify font-medium tracking-wider text-red-700 text-xs mb-1"
          >
            <p>{{ errorMsg }}</p>
          </div>
          <div
            v-if="errorMsgEng"
            class="flex justify-center items-center text-justify font-medium tracking-wider text-red-700 text-2xs"
          >
            <p>{{ errorMsgEng }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { supabase } from "../supabase/init.js";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import LoaderAnimation from "../components/LoaderAnimation.vue";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const email = ref<string>("");
    const password = ref<string>("");
    const errorMsg = ref<string>("");
    const errorMsgEng = ref<string>("");
    const niceMsg = ref<string>("Miłego dnia :)");
    const niceMsgEng = ref<string>("Have a nice day :)");
    const router = useRouter();
    const loadingAnim = ref<boolean>(false);

    interface Error {
      status?: number;
      message?: string;
    }

    const login = async () => {
      loadingAnim.value = true;
      try {
        const { error } = await supabase.auth.signIn({
          email: email.value as string,
          password: password.value as string,
        });
        if (error) throw error;
        setTimeout(() => {
          loadingAnim.value = false;
          router.push({ name: "HomeView" });
        }, 500);
      } catch (error_description) {
        if (error_description != Error) {
          niceMsg.value = "";
          niceMsgEng.value = "";
          if (
            (error_description as Error).message === "Invalid login credentials"
          ) {
            errorMsg.value = "Zły login lub hasło. Spróbuj ponownie.";
            errorMsgEng.value = "Bad login credentials. Try again.";
          } else {
            errorMsg.value = "Ups...";
            errorMsgEng.value = `${(error_description as Error).message}`;
          }
          email.value = "";
          password.value = "";
        }

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
      loadingAnim,
    };
  },
  components: { LoaderAnimation },
});
</script>
