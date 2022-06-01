<template>
  <div
    oncontextmenu="return false"
    class="bg-gradient-to-b from-gray-700 via-gray-700 to-gray-800 w-full h-full shadow-2xl flex flex-row justify-center font-montserrat"
  >
    <div class="h-full w-full flex flex-col justify-end">
      <div v-if="tab === 0" class="flex-1 w-full">
        <div class="flex flex-col justify-start items-center h-full w-full">
          <div
            class="flex flex-col justify-start items-center bg-gray-100 w-full 2xl:h-full h-auto pt-0 pb-0 mt-5"
          >
            <div class="w-full relative pt-3 pb-3 bg-gray-200">
              <div class="flex w-full flex-row justify-around items-center">
                <button
                  @click="callPrevMonth"
                  class="h-7 w-7 cursor-pointer opacity-90 hover:opacity-70 transition select-none text-lg font-medium flex-1 grayscale inv"
                >
                  ◀️
                </button>
                <p
                  class="text-xs 2xl:text-sm font-medium mt-1 w-3/5 text-center tracking-wider cursor-default select-none uppercase"
                >
                  {{ calTitle }}
                </p>
                <button
                  @click="callNextMonth"
                  class="h-7 w-7 cursor-pointer opacity-90 hover:opacity-70 transition select-none text-lg flex-1 font-medium grayscale"
                >
                  ▶️
                </button>
              </div>
            </div>
            <div
              class="flex p-2 mt-0 pb-3 pt-4 w-full text-2xs font-semibold 2xl:text-xs"
            >
              <div class="w-1/7 flex justify-center items-center">PON</div>
              <div class="w-1/7 flex justify-center items-center">WT</div>
              <div class="w-1/7 flex justify-center items-center">ŚR</div>
              <div class="w-1/7 flex justify-center items-center">CZW</div>
              <div class="w-1/7 flex justify-center items-center">PT</div>
              <div class="w-1/7 flex justify-center items-center">SOB</div>
              <div class="text-red-700 w-1/7 flex justify-center items-center">
                NDZ
              </div>
            </div>
            <div class="flex">
              <div class="flex flex-wrap p-2 w-full text-xs 2xl:text-sm">
                <div
                  v-for="(day, index) in calPrevDaysInMonth"
                  :key="index"
                  class="opacity-50 font-light w-1/7 2xl:h-12 h-8 flex justify-center items-center"
                >
                  <div
                    class="flex flex-col justify-center items-center cursor-pointer transition rounded-sm hover:bg-gray-300 w-98/100 h-9/10"
                  >
                    <span class="mb-3">
                      {{ day }}
                    </span>
                  </div>
                </div>
                <div
                  v-for="(day, index) in calDaysInMonth"
                  :key="index"
                  class="w-1/7 2xl:h-12 h-8 flex justify-center items-center"
                >
                  <div
                    v-if="
                      yearWithMonth === reallyNow &&
                      day.charAt(8) + day.charAt(9) == reallyNowDay
                    "
                    class="flex justify-center items-center cursor-pointer transition flex-col rounded-sm w-98/100 h-9/10 hover:text-gray-100 hover:bg-gray-300"
                  >
                    <div class="text-webgencol text-xl font-bold">
                    {{ infoTerm! < 10 ? "0" + infoTerm : infoTerm}}
                    </div>
                    <div
                      class="flex flex-row flex-wrap m-1.5 mb-1 mt-0 justify-start items-end overflow-hidden"
                    >
                      <div
                        v-for="(taskd, inde) in dateStor.dataTasks"
                        :key="inde"
                        class="flex flex-row h-2"
                      >
                        <div
                          v-if="
                            taskd.task_date === day && taskd.task_color === 1
                          "
                          class="h-0.75 w-2.5 rounded-full bg-gray-400 m-px text-2xs"
                        ></div>
                        <div
                          v-else-if="
                            taskd.task_date === day && taskd.task_color === 2
                          "
                          class="h-0.75 w-2.5 rounded-full bg-red-600 m-px text-2xs"
                        ></div>
                        <div
                          v-else-if="
                            taskd.task_date === day && taskd.task_color === 3
                          "
                          class="h-0.75 w-2.5 rounded-full bg-yellow-600 m-px text-2xs"
                        ></div>
                        <div
                          v-else-if="
                            taskd.task_date === day && taskd.task_color === 4
                          "
                          class="h-0.75 w-2.5 rounded-full bg-purple-600 m-px text-2xs"
                        ></div>
                        <div
                          v-else-if="
                            taskd.task_date === day && taskd.task_color === 5
                          "
                          class="h-0.75 w-2.5 rounded-full bg-blue-600 m-px text-2xs"
                        ></div>
                        <div
                          v-else-if="
                            taskd.task_date === day && taskd.task_color === 6
                          "
                          class="h-0.75 w-2.5 rounded-full bg-green-400 m-px text-2xs"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else
                    class="flex justify-center items-center flex-col cursor-pointer transition rounded-sm hover:bg-gray-300 w-98/100 h-9/10"
                  >
                    <div class>{{ day.charAt(8) + day.charAt(9) }}</div>
                    <div
                      class="flex flex-row flex-wrap m-0.5 mb-1 mt-0 justify-start items-end overflow-hidden"
                    >
                      <div
                        v-for="(taskd, inde) in dateStor.dataTasks"
                        :key="inde"
                        class="flex flex-row overflow-hidden h-2"
                      >
                        <div
                          v-if="
                            taskd.task_date === day && taskd.task_color === 1
                          "
                          class="h-0.75 w-2.5 rounded-full bg-gray-400 m-px text-2xs"
                        ></div>
                        <div
                          v-else-if="
                            taskd.task_date === day && taskd.task_color === 2
                          "
                          class="h-0.75 w-2.5 rounded-full bg-red-600 m-px text-2xs"
                        ></div>
                        <div
                          v-else-if="
                            taskd.task_date === day && taskd.task_color === 3
                          "
                          class="h-0.75 w-2.5 rounded-full bg-yellow-600 m-px text-2xs"
                        ></div>
                        <div
                          v-else-if="
                            taskd.task_date === day && taskd.task_color === 4
                          "
                          class="h-0.75 w-2.5 rounded-full bg-purple-600 m-px text-2xs"
                        ></div>
                        <div
                          v-else-if="
                            taskd.task_date === day && taskd.task_color === 5
                          "
                          class="h-0.75 w-2.5 rounded-full bg-blue-600 m-px text-2xs"
                        ></div>
                        <div
                          v-else-if="
                            taskd.task_date === day && taskd.task_color === 6
                          "
                          class="h-0.75 w-2.5 rounded-full bg-green-400 m-px text-2xs"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-for="(day, index) in calNextDaysInMonth"
                  :key="index"
                  class="opacity-50 font-light w-1/7 2xl:h-12 h-8 flex justify-center items-center"
                >
                  <div
                    class="flex justify-center flex-col items-center cursor-pointer transition rounded-sm hover:bg-gray-300 w-98/100 h-9/10"
                  >
                    <span class="mb-3">
                      {{ day }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="h-px w-full bg-gray-300"></div> -->
            <!-- <div class="flex justify-between items-center w-full">
              <div class="h-3/4 w-2 bg-red-400 m-2 mr-0 rounded-xl"></div>
              <div class="w-full p-4 pr-1 pl-2">
                <p class="text-start text-sm flex-1">
                  Jest <span class="underline underline-offset-2 pl-0.5 pr-0.5"> {{ infoTerm }}</span
                  > . {{ noti }}
                </p>
              </div>
              <div class="h-full flex justify-center items-start pt-1 pr-2 invert hue-rotate-180 text-lg">📌</div>
            </div> -->
            <div class="h-px w-full bg-gray-400 bg-opacity-60"></div>
            <div class="w-full text-sm ">
              <div class="w-full p-1 flex justify-center items-center bg-gray-200 mb-1">
                  <p class="font-medium p-2 tracking-wider">ZADANIA NA DZISIAJ</p>
              </div>
              <p v-if="infoToday!.length == 0" class="p-3 pt-2">Nie ma żadnych zadań</p>
              <div v-else v-for="(task, ij) in infoToday" class="w-full mb-3 p-2 pr-3 pl-3"> 
                <div class="w-full bg-gray-200 border border-gray-400">
                  <div class="flex flex-col w-full">
                    <div class="flex flex-row w-full">
                        <div v-if="(task.task_color === 3)"
                            class="bg-yellow-600 w-3/4 text-3xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2 font-medium">
                            DO WERYFIKACJI</div>
                        <div v-else-if="(task.task_color === 5)"
                            class="bg-blue-600 w-3/4 text-3xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">W TRAKCIE
                            REALIZACJI</div>
                        <div v-else-if="(task.task_color === 2)"
                            class="bg-red-600 w-3/4 text-3xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">ZADANIE
                            ZATRZYMANE</div>
                        <div v-else-if="(task.task_color === 1)"
                            class="bg-gray-400 w-3/4 text-3xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">ZWYKŁE
                            ZADANIE</div>
                        <div v-else-if="(task.task_color === 6)"
                            class="bg-green-600 w-3/4 text-3xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">ZROBIONE
                            ZADANIE</div>
                        <div v-else-if="(task.task_color === 4)"
                            class="bg-purple-600 w-3/4 text-3xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">
                            AKTUALIZACJA DLA GRUPY</div>
                        <div
                            class="bg-gray-600 text-3xs 2xl:text-2xs 3xl:text-xs flex-1 text-white p-0.5 pl-2 pr-2 font-medium flex justify-center items-center">
                            <p class="font-normal tracking-wider flex flex-wrap overflow-x-hidden uppercase">{{
                                    task.task_worker
                            }}</p>
                        </div>
                    </div>
                        <div class="flex flex-col justify-start items-start w-full pr-2 pl-2 2xl:pr-2 2xl:pl-2 pt-1 pb-1">
                            <div class="flex justify-start items-center">
                                <p
                                    class="text-2xs 2xl:text-xs 3xl:text-sm mt-0.5 2xl:m-0.5 font-medium flex flex-wrap overflow-x-hidden">
                                    {{ task.task_name }}</p>
                            </div>
                            <div class="">
                                <p
                                    class="text-3xs 2xl:text-xs 3xl:text-xs mt-0 2xl:m-0.5 font-normal flex flex-wrap overflow-hidden max-h-10">
                                    {{ task.task_desc }}</p>
                            </div>
                          </div>
                </div>
              </div>
              <!-- <div class="flex flex-col w-full m-0.5 border">
                    <div class="flex flex-row w-full">
                        <div v-if="(task.task_color === 3)"
                            class="bg-yellow-600 w-3/4 text-3xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2 font-medium">
                            DO WERYFIKACJI</div>
                        <div v-else-if="(task.task_color === 5)"
                            class="bg-blue-600 w-3/4 text-3xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">W TRAKCIE
                            REALIZACJI</div>
                        <div v-else-if="(task.task_color === 2)"
                            class="bg-red-600 w-3/4 text-3xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">ZADANIE
                            ZATRZYMANE</div>
                        <div v-else-if="(task.task_color === 1)"
                            class="bg-gray-400 w-3/4 text-3xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">ZWYKŁE
                            ZADANIE</div>
                        <div v-else-if="(task.task_color === 6)"
                            class="bg-green-600 w-3/4 text-3xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">ZROBIONE
                            ZADANIE</div>
                        <div v-else-if="(task.task_color === 4)"
                            class="bg-purple-600 w-3/4 text-3xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">
                            AKTUALIZACJA DLA GRUPY</div>
                        <div
                            class="bg-gray-600 text-3xs 2xl:text-2xs 3xl:text-xs flex-1 text-white p-0.5 pl-2 pr-2 font-medium flex justify-center items-center">
                            <p class="font-normal tracking-wider flex flex-wrap overflow-x-hidden uppercase">{{
                                    task.task_worker
                            }}</p>
                        </div>
                    </div>
                    <div class="flex flex-row">
                        <div class="flex flex-row justify-between items-end w-full">
                            <div class="flex justify-start items-center mt-2">
                                <p
                                    class="text-2xs 2xl:text-xs 3xl:text-sm m-1 font-semibold flex flex-wrap overflow-x-hidden">
                                    {{ task.task_name }}</p>
                            </div>
                            <div class="flex justify-end items-end">
                                <p v-if="Math.ceil((new Date(task.task_date.replace(/\./g, '/')).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24) < 0"
                                    class="text-2xs 2xl:text-xs 3xl:text-xs m-1 mr-1 ml-1 font-medium flex flex-wrap justify-end items-end uppercase text-right">
                                    minęło
                                    {{
                                            Math.ceil(Math.abs(new Date(task.task_date.replace(/\./g, '/')).getTime() - new Date().getTime())
                                                / 1000 / 60 / 60 / 24) - 1
                                    }} dni temu
                                </p>
                                <p v-else-if="Math.ceil((new Date(task.task_date.replace(/\./g, '/')).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24) == 0"
                                    class="text-2xs 2xl:text-xs 3xl:text-xs m-1 mr-1 ml-1 font-medium flex flex-wrap justify-end items-end uppercase text-right">
                                    do dzisiaj</p>
                                <p v-else-if="Math.ceil((new Date(task.task_date.replace(/\./g, '/')).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24) <= 7"
                                    class="text-2xs 2xl:text-xs 3xl:text-xs m-1 mr-1 ml-1 font-medium flex flex-wrap justify-end items-end uppercase text-right">
                                    {{
                                            Math.ceil((new Date(task.task_date.replace(/\./g, '/')).getTime() - new Date().getTime()) / 1000 /
                                                60 / 60 / 24)
                                    }} dni</p>
                                <p v-else-if="Math.ceil((new Date(task.task_date.replace(/\./g, '/')).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24) > 7"
                                    class="text-2xs 2xl:text-xs 3xl:text-xs m-1 mr-1 ml-1 font-medium flex flex-wrap justify-end items-end uppercase text-right">
                                    jeszcze
                                    {{
                                            Math.ceil((new Date(task.task_date.replace(/\./g, '/')).getTime() - new Date().getTime()) / 1000 /
                                                60 / 60 / 24)
                                    }} dni
                                </p>
                            </div>
                          </div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="tab === 1"
        class="transition flex flex-col justify-start items-end flex-grow w-full p-2 pt-0 cursor-default select-none mt-5"
      >
        <div class="w-full">
          <div
            class="h-full w-full font-normal text-xs flex flex-col justify-start items-end text-gray-100 tracking-wider mb-2"
          >
            <p class="text-gray-300 p-1 pt-px pb-px tracking-widest">
              {{ userStor.user.email }}
            </p>
            <p
              class="underline tracking-widest cursor-pointer text-red-300 hover:text-red-200 transition p-1 pt-px pb-px"
            >
              log out
            </p>
          </div>
        </div>
        <div
          class="text-gray-300 font-light text-2xs 2xl:text-xs 3xl:text-sm text-center tracking-wide mb-1"
        >
          <div
            class="flex flex-col justify-evenly items-start flex-wrap m-0.5 mb-2"
          >
            <div class="flex m-0.5 2xl:m-1">
              <div
                class="p-1 bg-gray-400 rounded-full ml-0.5 mr-0.5 hover:opacity-70"
              ></div>
              <p
                class="text-justify ml-2 text-2xs 2xl:text-xs 3xl:text-xs tracking-normal"
              >
                <span class="font-medium tracking-wider">ZADANIE</span> Tą
                etykiete posiadają zwykłe zadania, nie posiadające cech
                unikalnych.
              </p>
            </div>
            <div class="flex m-0.5 2xl:m-1">
              <div
                class="p-1 bg-red-600 rounded-full ml-0.5 mr-0.5 hover:opacity-70"
              ></div>
              <p
                class="text-justify ml-2 text-2xs 2xl:text-xs 3xl:text-xs tracking-normal"
              >
                <span class="font-medium tracking-wider">STOP</span> Dodajemy tą
                etykiete do zadania, które posiada błąd, lub problem, którego
                nie możemy rozwiązać.
              </p>
            </div>
            <div class="flex m-0.5 2xl:m-1">
              <div
                class="p-1 bg-yellow-600 rounded-full ml-0.5 mr-0.5 hover:opacity-70"
              ></div>
              <p
                class="text-justify ml-2 text-2xs 2xl:text-xs 3xl:text-xs tracking-normal"
              >
                <span class="font-medium tracking-wider">WERYFIKACJA</span>
                Dodajemy tą etykiete, kiedy prosimy o sprawdzenie błędów, czy
                zgody w decyzyjności wspólnej.
              </p>
            </div>
            <div class="flex m-0.5 2xl:m-1">
              <div
                class="p-1 bg-purple-500 rounded-full ml-0.5 mr-0.5 hover:opacity-70"
              ></div>
              <p
                class="text-justify ml-2 text-2xs 2xl:text-xs 3xl:text-xs tracking-normal"
              >
                <span class="font-medium tracking-wider">AKTUALIZACJA</span>
                Dodajemy tą etykiete, gdy chcemy, by reszta grupy zapoznała się
                z tą zmianą.
              </p>
            </div>
            <div class="flex m-0.5 2xl:m-1">
              <div
                class="p-1 bg-blue-500 rounded-full ml-0.5 mr-0.5 hover:opacity-70"
              ></div>
              <p
                class="text-justify ml-2 text-2xs 2xl:text-xs 3xl:text-xs tracking-normal"
              >
                <span class="font-medium tracking-wider">ROZPOCZĘTO</span> Tą
                etykietą oznaczamy zadania, które mają status aktywny.
              </p>
            </div>
            <div class="flex m-0.5 2xl:m-1">
              <div
                class="p-1 bg-green-500 rounded-full ml-0.5 mr-0.5 hover:opacity-70"
              ></div>
              <p
                class="text-justify ml-2 text-2xs 2xl:text-xs 3xl:text-xs tracking-normal"
              >
                <span class="font-medium tracking-wider">ZROBIONE</span>
                Tą etykiete dodajemy na koniec, by oznaczyć zadanie jako
                zrobione lub zrobione i sprawdzone.
              </p>
            </div>
          </div>
          <p class="p-1 pb-0 text-3xs 2xl:text-xs 3xl:text-sm">
            <span class="border-gray-200 font-semibold p-1 text-2xs"
              >shift + scroll myszką</span
            >
            lub
            <span class="border-gray-200 font-semibold p-1 text-2xs"
              >drag nagłówka karty</span
            >
            scrollowanie okna pracy
          </p>
        </div>
      </div>
      <div class="h-px w-full bg-gray-300"></div>
      <div
            class="flex flex-col w-full justify-center items-end mb-0 mt-0 font-normal bg-gray-600 text-gray-50 tracking-wide"
          >
          <div class="flex justify-between items-center w-full bg-gray-100 text-gray-900">
              <div class="h-3/4 w-2 bg-red-400 m-2 mr-0 rounded-xl"></div>
              <div class="w-full p-4 pr-1 pl-2">
                <p class="text-start text-sm flex-1">
                  Jest <span class="underline underline-offset-2 pl-0.5 pr-0.5"> {{ infoTerm }}</span
                  > . {{ noti }}
                </p>
              </div>
              <div class="h-full flex justify-center items-start pt-1 pr-2 invert hue-rotate-180 text-lg">📌</div>
            </div>
            <div class="w-full pr-5 pl-7 2xl:pl-5 pb-2">
              <div
                class="flex flex-col justify-start items-center w-full mt-2 text-2xs 2xl:text-2sm tracking-wider"
              >
                <div
                  class="flex justify-end items-center w-full h-full pl-6"
                >
                  <p class="cursor-default select-none">{{ infoTerm }}</p>
                  <p class="cursor-default select-none ml-1">{{ infoMonth }}</p>
                  <p class="cursor-default select-none ml-1">{{ infoYear }}</p>
                </div>
                <div class="flex justify-end items-center w-full h-full">
                  <p class="cursor-default select-none mr-2">{{ infoDay }}</p>
                  <p class="cursor-default select-none w-13">
                    {{ infoTime }}
                  </p>
                </div>
              </div>
            </div>
          </div>
      <div
        class="w-full h-20 bg-gray-100"
      >
        <div
          class="flex justify-center items-center rounded-full w-full h-full"
        >
          <div
            class="h-32 w-32 relative bg-gray-100 rounded-full flex justify-center items-center animate-spin-slow"
          >
            <img
              src="../assets/logo_circle.svg"
              draggable="false"
              alt="WIMS"
              class="cursor-default select-none h-full font-montserrat w-24 absolute"
            />
          </div>
          <div class="pl-3 3xl:pl-2 pr-5 3xl:pr-2">
            <p
              class="text-xs 2xl:text-sm 3xl:text-base 3xl:tracking-widest tracking-normal font-medium"
            >
              WEBGENETICSS
            </p>
            <p class="text-xs 2xl:text-sm tracking-wider font-bold">
              IM System <span class="text-2xs"></span>
              <span class="text-2xs"> {{ dateStor.version }}</span>
            </p>
          </div>
        </div>
      </div>
      <div
        class="w-full h-8 bg-webgencol bg-opacity-90 flex justify-end items-center pr-2"
      >
        <div class="h-full w-12 p-1">
          <div
            v-if="tab === 1"
            @click="tabHandler(1)"
            class="h-full w-full bg-gray-200 rounded-2xl flex justify-center items-center transition text-sm opacity-80"
          >
            🔍
          </div>
          <div
            v-else
            @click="tabHandler(1)"
            class="h-full w-full bg-gray-300 opacity-60 rounded-2xl hover:opacity-80 cursor-pointer flex justify-center items-center transition text-sm"
          >
            🔍
          </div>
        </div>
        <div class="h-full w-12 p-1">
          <div
            v-if="tab === 0"
            @click="tabHandler(0)"
            class="h-full w-full bg-gray-200 rounded-2xl transition flex justify-center items-center font-semibold text-sm opacity-80"
          >
            📆
          </div>
          <div
            v-else
            @click="tabHandler(0)"
            class="h-full w-full bg-gray-300 opacity-60 rounded-2xl transition hover:opacity-80 flex justify-center items-center font-semibold cursor-pointer text-sm"
          >
            📆
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
// import { supabase } from "../supabase/init.js";
import { defineComponent } from "vue";
import { dataStore } from "@/stores/data.js";
import { userStore } from "@/stores/user.js";

export default defineComponent({
  name: "HeaderPlace",
  setup() {
    const dateStor: any = dataStore();
    const userStor: any = userStore();
    const tab = ref<number>(0);
    const infoToday = ref<any[]>();
    const infoTime = ref<string>();
    const infoDate = ref<string>();
    const infoDateUS = ref<string>();
    const infoYear = ref<number>();
    const infoDay = ref<string>();
    const infoMonth = ref<string>();
    const infoTerm = ref<number>();
    const noti = ref<string>();
    const calTitle = ref<string>();
    const now = ref<any>(new Date());
    const lastDayofMonth = <any>(
      ref(
        new Date(
          now.value.getUTCFullYear(),
          now.value.getMonth() + 1,
          0
        ).getDate()
      )
    );
    const calTodaysMonth = ref([]);
    const calPrevMonth = ref([]);
    const calNextMonth = ref([]);

    const months = [
      "styczeń",
      "luty",
      "marzec",
      "kwiecień",
      "maj",
      "czerwiec",
      "lipiec",
      "sierpień",
      "wrzesień",
      "październik",
      "listopad",
      "grudzień",
    ];

    const tabHandler = (num: number) => {
      tab.value = num;
    };

    const MonthOfYear = ref(null);
    const reallyNow = ref(now.value.getFullYear() + "" + now.value.getMonth());
    const reallyNowDay = ref(now.value.getDate());
    const dayOfDate = ref(now.value.getDate());
    const monthOfDate = ref(now.value.getMonth());
    const yearNow = ref(now.value.getFullYear());

    const prevLastDayofMonth = ref(
      <any>(
        new Date(now.value.getUTCFullYear(), now.value.getMonth(), 0).getDate()
      )
    );
    const calMonth = ref(months[monthOfDate.value]);
    const calDaysInMonth = ref(<any>[]);
    const calPrevDaysInMonth = ref(<any>[]);
    const calLastDayOfWeek = ref(
      new Date(now.value.getUTCFullYear(), now.value.getMonth() + 1, 0).getDay()
    );

    now.value.setDate(1);

    const caldayOfWeek = ref(now.value.getUTCDay());
    const calNextDaysInMonth = ref(<any>[]);
    const yearWithMonth = ref(yearNow.value + "" + monthOfDate.value);

    const callPrevMonth = () => {
      now.value.setUTCMonth(now.value.getMonth() - 1);
      monthOfDate.value = now.value.getUTCMonth();
      lastDayofMonth.value = new Date(
        now.value.getUTCFullYear(),
        now.value.getMonth() + 1,
        0
      ).getDate();
      yearNow.value = now.value.getUTCFullYear();
      calTitle.value = months[now.value.getUTCMonth()] + " " + yearNow.value;
      caldayOfWeek.value = now.value.getUTCDay();
      prevLastDayofMonth.value = new Date(
        now.value.getUTCFullYear(),
        now.value.getMonth(),
        0
      ).getDate();
      calLastDayOfWeek.value = new Date(
        now.value.getUTCFullYear(),
        now.value.getMonth() + 1,
        0
      ).getDay();
      calDaysInMonth.value = [];
      calPrevDaysInMonth.value = [];
      yearWithMonth.value = yearNow.value + "" + monthOfDate.value;

      caldayOfWeek.value == 0 ? (caldayOfWeek.value = 7) : caldayOfWeek.value;

      for (let j: any = caldayOfWeek.value - 2; j > -1; j--) {
        calPrevDaysInMonth.value.push(prevLastDayofMonth.value - j);
      }

      if (caldayOfWeek.value == 1) {
        for (let j = 8; j > 1; j--) {
          calPrevDaysInMonth.value.push(prevLastDayofMonth.value - j);
        }
      }

      for (let i: any = 1; i <= lastDayofMonth.value; i++) {
        if (i < 10) {
          i = "0" + i;
        }
        calDaysInMonth.value.push(
          now.value.getFullYear() +
            "-" +
            (now.value.getMonth() < 9
              ? "0" + (now.value.getMonth() + 1)
              : now.value.getMonth() + 1) +
            "-" +
            i
        );
      }
      calNextDaysInMonth.value = [];

      if (calPrevDaysInMonth.value.length + calDaysInMonth.value.length < 35) {
        for (let x: any = 1; x <= 14 - calLastDayOfWeek.value; x++) {
          calNextDaysInMonth.value.push(x);
        }
      } else {
        for (let x: any = 1; x <= 7 - calLastDayOfWeek.value; x++) {
          calNextDaysInMonth.value.push(x);
        }
      }
    };
    const callNextMonth = () => {
      now.value.setUTCMonth(now.value.getMonth() + 1);
      monthOfDate.value = now.value.getUTCMonth();
      lastDayofMonth.value = new Date(
        now.value.getUTCFullYear(),
        now.value.getMonth() + 1,
        0
      ).getDate();
      yearNow.value = now.value.getUTCFullYear();
      caldayOfWeek.value = now.value.getUTCDay();
      calTitle.value = months[now.value.getUTCMonth()] + " " + yearNow.value;
      prevLastDayofMonth.value = new Date(
        now.value.getUTCFullYear(),
        now.value.getMonth(),
        0
      ).getDate();
      calLastDayOfWeek.value = new Date(
        now.value.getUTCFullYear(),
        now.value.getMonth() + 1,
        0
      ).getDay();
      calDaysInMonth.value = [];
      calPrevDaysInMonth.value = [];

      yearWithMonth.value = yearNow.value + "" + monthOfDate.value;

      if (caldayOfWeek.value == 0) {
        caldayOfWeek.value = 7;
      }

      for (let j: any = caldayOfWeek.value - 2; j > -1; j--) {
        calPrevDaysInMonth.value.push(prevLastDayofMonth.value - j);
      }

      if (caldayOfWeek.value == 1) {
        for (let j: any = 8; j > 1; j--) {
          calPrevDaysInMonth.value.push(prevLastDayofMonth.value - j);
        }
      }

      for (let i: any = 1; i <= lastDayofMonth.value; i++) {
        if (i < 10) {
          i = "0" + i;
        }
        calDaysInMonth.value.push(
          now.value.getFullYear() +
            "-" +
            (now.value.getMonth() < 9
              ? "0" + (now.value.getMonth() + 1)
              : now.value.getMonth() + 1) +
            "-" +
            i
        );
      }

      calNextDaysInMonth.value = [];

      if (calPrevDaysInMonth.value.length + calDaysInMonth.value.length < 35) {
        for (let x: any = 1; x <= 14 - calLastDayOfWeek.value; x++) {
          calNextDaysInMonth.value.push(x);
        }
      } else {
        for (let x: any = 1; x <= 7 - calLastDayOfWeek.value; x++) {
          calNextDaysInMonth.value.push(x);
        }
      }
    };

    const monthAtStart = () => {
      calDaysInMonth.value = [];
      calPrevDaysInMonth.value = [];
      calNextDaysInMonth.value = [];
      lastDayofMonth.value = new Date(
        now.value.getUTCFullYear(),
        now.value.getMonth() + 1,
        0
      ).getDate();
      prevLastDayofMonth.value = new Date(
        now.value.getUTCFullYear(),
        now.value.getMonth(),
        0
      ).getDate();
      calTitle.value = months[now.value.getUTCMonth()] + " " + yearNow.value;
      calLastDayOfWeek.value = new Date(
        now.value.getUTCFullYear(),
        now.value.getMonth() + 1,
        0
      ).getDay();
      caldayOfWeek.value = now.value.getUTCDay();

      yearWithMonth.value = yearNow.value + "" + monthOfDate.value;

      if (caldayOfWeek.value == 0) {
        caldayOfWeek.value = 7;
      }

      for (let j: any = caldayOfWeek.value - 2; j > -1; j--) {
        calPrevDaysInMonth.value.push(prevLastDayofMonth.value - j);
      }

      if (caldayOfWeek.value == 1) {
        for (let j: any = 8; j > 1; j--) {
          calPrevDaysInMonth.value.push(prevLastDayofMonth.value - j);
        }
      }

      for (let i: any = 1; i <= lastDayofMonth.value; i++) {
        if (i < 10) {
          i = "0" + i;
        }

        calDaysInMonth.value.push(
          now.value.getFullYear() +
            "-" +
            (now.value.getMonth() < 9
              ? "0" + (now.value.getMonth() + 1)
              : now.value.getMonth() + 1) +
            "-" +
            i
        );
      }

      if (calPrevDaysInMonth.value.length + calDaysInMonth.value.length < 35) {
        for (let x: any = 1; x <= 14 - calLastDayOfWeek.value; x++) {
          calNextDaysInMonth.value.push(x);
        }
      } else {
        for (let x: any = 1; x <= 7 - calLastDayOfWeek.value; x++) {
          calNextDaysInMonth.value.push(x);
        }
      }

      if((monthOfDate.value < 2) && (dayOfDate.value > 0) && (dayOfDate.value < 20)){
        noti.value = "Przypomnienie o ZUS i podatkach do 20-ego. Jest jeszcze PIT-28 do końca lutego.";
      } else if ((monthOfDate.value == 2) && (dayOfDate.value > 0) && (dayOfDate.value < 20)){
        noti.value = "Przypomnienie o ZUS i podatkach do 20-ego. Zwrot podatku?";
      } else if ((monthOfDate.value < 2) && (dayOfDate.value > 20)) {
        noti.value = "Przypomnienie o fakturkach. Jest jeszcze PIT-28 do końca lutego.";
      } else if ((monthOfDate.value == 2) && (dayOfDate.value > 20)) {
        noti.value = "Przypomnienie o fakturkach. Zwrot podatku?";
      } else if ((dayOfDate.value > 0) && (dayOfDate.value < 20)) {
        noti.value = "Przypomnienie o ZUS i podatkach do 20-ego.";
      } else if ((dayOfDate.value > 20)) {
        noti.value = "Przypomnienie o fakturkach.";
      }

      infoToday.value = [];

      setTimeout(() => {
      infoToday.value = dateStor.dataTasks.filter((item: any) => item.task_date === infoDateUS.value);
      console.log(infoToday.value)
      }, 1000); 
      

    };


    const timeCalculator = () => {
      let now = new Date();
      let timeNow =
        (now.getHours() < 10 ? "0" + now.getHours() : now.getHours()) +
        ":" +
        (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) +
        ":" +
        (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds());
      let dateNow =
        (now.getDate() < 10 ? "0" + now.getDate() : now.getDate()) +
        "." +
        (now.getMonth() + 1 < 10
          ? "0" + (now.getMonth() + 1)
          : now.getMonth() + 1) +
        "." +
        now.getFullYear();
    let dateNowUS =
        now.getFullYear() +
        "-" + (now.getMonth() + 1 < 10
          ? "0" + (now.getMonth() + 1)
          : now.getMonth() + 1) +
        "-" + (now.getDate() < 10 ? "0" + now.getDate() : now.getDate())

      infoTime.value = timeNow;
      infoDate.value = dateNow;
      infoDateUS.value = dateNowUS;
      const weekDays = [
        "niedziela",
        "poniedziałek",
        "wtorek",
        "środa",
        "czwartek",
        "piątek",
        "sobota",
      ];
      infoDay.value = weekDays[now.getDay()];
      infoYear.value = now.getFullYear();
      infoMonth.value = months[now.getMonth()];
      infoTerm.value = now.getDate();
    };
    
    setInterval(() => {
      timeCalculator();
    }, 1000);

    timeCalculator();
    monthAtStart();

    return {
      noti,
      dateStor,
      userStor,
      tab,
      tabHandler,
      infoToday,
      infoYear,
      infoTime,
      infoDate,
      infoDateUS,
      infoDay,
      infoMonth,
      infoTerm,
      calTitle,
      timeCalculator,
      callPrevMonth,
      callNextMonth,
      calDaysInMonth,
      calPrevDaysInMonth,
      calNextDaysInMonth,
      yearWithMonth,
      reallyNow,
      reallyNowDay,
    };
  },
});
</script>
