<template>
  <div @mouseleave="todayInfoTasks"
    class="bg-gradient-to-b from-gray-700 via-gray-700 to-gray-800 w-full h-full max-h-full shadow-2xl flex flex-row justify-center font-montserrat">
    <div class="h-full w-full flex flex-col justify-start items-center">
      <div v-if="tab === 0" class="flex justify-start items-center w-full h-full">
        <div class="flex flex-col justify-start items-center w-full h-full">
          <div class="flex h-full flex-col justify-start items-center bg-gray-100 w-full pt-0 pb-0">
            <div class="w-full h-full text-sm flex flex-col justify-start items-center">
              <div class="w-full p-1 flex justify-center items-center bg-gray-300">
                <p class="font-medium p-1.5 tracking-wider text-gray-700">
                  {{ infoTasksTitle }}
                </p>
              </div>
              <div
                class="w-full h-10 flex flex-col justify-start items-start shrink p-2 scrollbar-thumb-gray-300 scrollbar-thin scrollbar-track-gray-100 grow">
                <p v-if="infoTasks!.length == 0" class="p-3">
                  Nie ma żadnych zadań
                </p>
                <div v-else v-for="(task, ij) in infoTasks" :key="ij" class="w-full p-2 pr-2 pl-1">
                  <div v-if="infoTasksToday" class="w-full bg-gray-200 border border-gray-400">
                    <div class="flex flex-col w-full">
                      <div class="flex flex-row w-full">
                        <div v-if="task.task_color === 3"
                          class="bg-yellow-600 w-3/4 text-2xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2 font-medium">
                          DO WERYFIKACJI
                        </div>
                        <div v-else-if="task.task_color === 5"
                          class="bg-sky-600 w-3/4 text-2xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">
                          W TRAKCIE REALIZACJI
                        </div>
                        <div v-else-if="task.task_color === 2"
                          class="bg-red-600 w-3/4 text-2xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">
                          ZADANIE ZATRZYMANE
                        </div>
                        <div v-else-if="task.task_color === 1"
                          class="bg-gray-400 w-3/4 text-2xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">
                          ZWYKŁE ZADANIE
                        </div>
                        <div v-else-if="task.task_color === 6"
                          class="bg-green-600 w-3/4 text-2xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">
                          ZROBIONE ZADANIE
                        </div>
                        <div v-else-if="task.task_color === 4"
                          class="bg-purple-500 w-3/4 text-2xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">
                          AKTUALIZACJA DLA GRUPY
                        </div>
                        <div
                          class="bg-gray-600 text-2xs 2xl:text-2xs 3xl:text-xs flex-1 text-white p-0.5 pl-2 pr-2 font-medium flex justify-center items-center">
                          <p class="font-normal tracking-wider flex flex-wrap overflow-x-hidden uppercase">
                            {{ task.task_worker }}
                          </p>
                        </div>
                      </div>
                      <div
                        class="flex flex-col justify-start items-start w-full pr-2 pl-2 2xl:pr-2 2xl:pl-2 pt-1.5 pb-1.5">
                        <div class="flex justify-start items-center">
                          <p
                            class="text-xs 2xl:text-xs 3xl:text-sm 2xl:mt-0.5 2xl:m-0.5 font-medium flex flex-wrap overflow-x-hidden">
                            {{ task.task_name }}
                          </p>
                        </div>
                        <div class="">
                          <p
                            class="text-2xs 2xl:text-xs 3xl:text-xs mt-0 2xl:m-0.5 font-normal flex-wrap overflow-hidden max-h-10 leading-snug [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                            {{ task.task_desc }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="!infoTasksToday" class="w-full bg-gray-200 border border-gray-400">
                    <div class="flex flex-row w-full">
                      <div v-if="task.task_color === 3"
                        class="bg-yellow-600 w-3/4 text-2xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2 font-medium">
                        DO WERYFIKACJI
                      </div>
                      <div v-else-if="task.task_color === 5"
                        class="bg-sky-600 w-3/4 text-2xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">
                        W TRAKCIE REALIZACJI
                      </div>
                      <div v-else-if="task.task_color === 2"
                        class="bg-red-600 w-3/4 text-2xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">
                        ZADANIE ZATRZYMANE
                      </div>
                      <div v-else-if="task.task_color === 1"
                        class="bg-gray-400 w-3/4 text-2xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">
                        ZWYKŁE ZADANIE
                      </div>
                      <div v-else-if="task.task_color === 6"
                        class="bg-green-600 w-3/4 text-2xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">
                        ZROBIONE ZADANIE
                      </div>
                      <div v-else-if="task.task_color === 4"
                        class="bg-purple-600 w-3/4 text-2xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">
                        AKTUALIZACJA DLA GRUPY
                      </div>
                      <div
                        class="bg-gray-600 text-2xs 2xl:text-2xs 3xl:text-xs flex-1 text-white p-0.5 pl-2 pr-2 font-medium flex justify-center items-center">
                        <p class="font-normal tracking-wider flex flex-wrap overflow-x-hidden uppercase">
                          {{ task.task_worker }}
                        </p>
                      </div>
                    </div>
                    <div class="flex flex-row w-full">
                      <div class="flex flex-col justify-between items-center w-full">
                        <div
                          class="flex justify-between items-start w-full pr-2 pl-2 2xl:pr-2 2xl:pl-2 pt-2 2xl:pt-1 2xl:pb-1 2xl:mt-0.5">
                          <div class="flex justify-start items-center">
                            <p
                              class="text-xs 2xl:text-xs 3xl:text-sm 2xl:m-0.5 font-medium flex flex-wrap overflow-x-hidden">
                              {{ task.task_name }}
                            </p>
                          </div>
                          <div class="flex justify-end items-end text-2xs 2xl:m-0.5 2xl:text-xs 3xl:text-xs text-right">
                            <p v-if="
                              Math.ceil(
                                (new Date(
                                  task.task_date.replace(/\./g, '/')
                                ).getTime() -
                                  new Date().getTime()) /
                                1000 /
                                60 /
                                60 /
                                24
                              ) < 0
                            " class="flex flex-wrap justify-end items-end">
                              minęło
                              {{
                                  Math.ceil(
                                    Math.abs(
                                      new Date(
                                        task.task_date.replace(/\./g, "/")
                                      ).getTime() - new Date().getTime()
                                    ) /
                                    1000 /
                                    60 /
                                    60 /
                                    24
                                  ) - 1
                              }}
                              dni temu
                            </p>
                            <p v-else-if="
                              Math.ceil(
                                (new Date(
                                  task.task_date.replace(/\./g, '/')
                                ).getTime() -
                                  new Date().getTime()) /
                                1000 /
                                60 /
                                60 /
                                24
                              ) == 0
                            " class="flex flex-wrap justify-end items-end">
                              do dzisiaj
                            </p>
                            <p v-else-if="
                              Math.ceil(
                                (new Date(
                                  task.task_date.replace(/\./g, '/')
                                ).getTime() -
                                  new Date().getTime()) /
                                1000 /
                                60 /
                                60 /
                                24
                              ) == 1
                            " class="flex flex-wrap justify-end items-end">
                              do jutra
                            </p>
                            <p v-else-if="
                              Math.ceil(
                                (new Date(
                                  task.task_date.replace(/\./g, '/')
                                ).getTime() -
                                  new Date().getTime()) /
                                1000 /
                                60 /
                                60 /
                                24
                              ) <= 7
                            " class="flex flex-wrap justify-end items-end">
                              {{
                                  Math.ceil(
                                    (new Date(
                                      task.task_date.replace(/\./g, "/")
                                    ).getTime() -
                                      new Date().getTime()) /
                                    1000 /
                                    60 /
                                    60 /
                                    24
                                  )
                              }}
                              dni
                            </p>
                            <p v-else-if="
                              Math.ceil(
                                (new Date(
                                  task.task_date.replace(/\./g, '/')
                                ).getTime() -
                                  new Date().getTime()) /
                                1000 /
                                60 /
                                60 /
                                24
                              ) > 7
                            " class="flex flex-wrap justify-end items-end">
                              jeszcze
                              {{
                                  Math.ceil(
                                    (new Date(
                                      task.task_date.replace(/\./g, "/")
                                    ).getTime() -
                                      new Date().getTime()) /
                                    1000 /
                                    60 /
                                    60 /
                                    24
                                  )
                              }}
                              dni
                            </p>
                          </div>
                        </div>
                        <div
                          class="w-full pl-2 pr-2 pb-1 2xl:p-1 pt-0 2xl:pt-0 2xl:pr-2 2xl:pl-2 flex justify-start items-center">
                          <p
                            class="text-2xs 2xl:text-xs 3xl:text-xs mt-0 2xl:m-0.5 2xl:mt-0 font-normal flex-wrap overflow-hidden max-h-8 leading-snug [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                            {{ task.task_desc }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full pt-2 pb-2 bg-gray-300 transition-all duration-500">
              <div class="flex w-full flex-row justify-around items-center text-gray-800">
                <button @click="callPrevMonth"
                  class="h-7 w-7 cursor-pointer opacity-60 hover:opacity-30 transition select-none text-xl font-medium flex-1 grayscale brightness-125">
                  👈
                </button>
                <div class="flex flex-col w-1/2 justify-center items-center">
                  <p class="font-medium tracking-wider text-sm">KALENDARZ NA</p>
                  <p
                    class="text-xs 2xl:text-sm font-medium text-center tracking-wider cursor-default select-none uppercase">
                    {{ calTitle }}
                  </p>
                </div>

                <button @click="callNextMonth"
                  class="h-7 w-7 cursor-pointer opacity-60 hover:opacity-30 transition select-none text-xl font-medium flex-1 grayscale brightness-125">
                  👉
                </button>
              </div>
            </div>
            <div
              class="flex p-2 mt-0 pb-3 pt-4 w-full text-2xs font-semibold 2xl:text-xs bg-gray-200 transition-all duration-500">
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
            <div class="flex transition-all duration-500">
              <div class="flex flex-wrap p-2 w-full text-xs 2xl:text-sm">
                <div v-for="(day, index) in calPrevDaysInMonth" :key="index"
                  class="opacity-50 font-light w-1/7 2xl:h-12 h-8 flex justify-center items-center">
                  <div
                    class="flex flex-col justify-center items-center cursor-pointer transition rounded-sm hover:bg-gray-300 w-98/100 h-9/10 pt-1">
                    <span class="mb-3 pb-1.5">
                      {{ day }}
                    </span>
                  </div>
                </div>

                <div @click="showInfoTasks(day)" v-for="(day, index) in calDaysInMonth" :key="index"
                  class="w-1/7 2xl:h-12 h-8 flex justify-center items-center">
                  <div v-if="
                    yearWithMonth === reallyNow &&
                    day.charAt(8) + day.charAt(9) == reallyNowDay
                  "
                    class="flex justify-center items-center cursor-pointer transition flex-col rounded-sm w-98/100 h-9/10 hover:text-gray-100 hover:bg-gray-300">
                    <div class="text-webgencol text-xl font-bold mb-3.5">
                      {{ infoTerm! < 10 ? "0" + infoTerm : infoTerm }} </div>
                    </div>
                    <div v-else
                      class="flex justify-center items-center flex-col cursor-pointer transition rounded-sm hover:bg-gray-300 w-98/100 h-9/10 pt-1">
                      <div class>{{ day.charAt(8) + day.charAt(9) }}</div>
                      <div class="flex flex-row flex-wrap m-0.5 mb-2 mt-0 justify-center items-start w-full h-full">
                        <div v-for="(taskd, inde) in dateStor.dataTasks" :key="inde" class="flex overflow-hidden h-2">
                          <div v-if="
                            taskd.task_date === day && taskd.task_color === 1
                          " class="h-0.75 w-2.5 rounded-full bg-gray-400 m-px text-2xs"></div>
                          <div v-else-if="
                            taskd.task_date === day && taskd.task_color === 2
                          " class="h-0.75 w-2.5 rounded-full bg-red-600 m-px text-2xs"></div>
                          <div v-else-if="
                            taskd.task_date === day && taskd.task_color === 3
                          " class="h-0.75 w-2.5 rounded-full bg-yellow-500 m-px text-2xs"></div>
                          <div v-else-if="
                            taskd.task_date === day && taskd.task_color === 4
                          " class="h-0.75 w-2.5 rounded-full bg-purple-500 m-px text-2xs"></div>
                          <div v-else-if="
                            taskd.task_date === day && taskd.task_color === 5
                          " class="h-0.75 w-2.5 rounded-full bg-sky-400 m-px text-2xs"></div>
                          <div v-else-if="
                            taskd.task_date === day && taskd.task_color === 6
                          " class="h-0.75 w-2.5 rounded-full bg-green-400 m-px text-2xs"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-for="(day, index) in calNextDaysInMonth" :key="index"
                    class="opacity-50 font-light w-1/7 2xl:h-12 h-8 flex justify-center items-center">
                    <div
                      class="flex justify-center flex-col items-center cursor-pointer transition rounded-sm hover:bg-gray-300 w-98/100 h-9/10 pb-1">
                      <span class="mb-1 pb-1.5">
                        {{ day }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="h-0.5 w-full bg-gray-300"></div>
              <div v-if="dateStor.processing == null && noti"
                class="flex justify-between items-center w-full bg-gray-100 text-gray-900 transition-all duration-500">
                <div class="h-3/4 w-2 bg-red-400 m-2 mr-0 rounded-xl"></div>
                <div class="w-full p-4 pr-1 pl-2">
                  <p class="text-start text-sm flex-1">
                    Jest
                    <span class="underline underline-offset-2 pl-0.5 pr-0.5">
                      {{ infoTerm }}</span>
                    . {{ noti }}
                  </p>
                </div>
                <div class="h-full flex justify-center items-start pt-1 pr-2 invert hue-rotate-180 text-lg">
                  📌
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tab === 1"
          class="transition flex flex-col justify-start items-center flex-grow w-full cursor-default select-none h-3/4">
          <div class="w-full bg-gray-300 p-2 pb-3 pt-3">
            <div
              class="w-full font-medium text-xs flex flex-col justify-start items-start text-gray-900 tracking-wider">
              <div class="flex justify-between items-start w-full h-full">
                <div class="flex flex-col justify-start items-start h-full w-2/3">
                  <p class="p-1 pt-0 pb-0 tracking-wider font-semibold">
                    Zalogowano jako:
                  </p>
                  <p class="p-1 pt-0.5 pb-px tracking-wider text-ellipsis overflow-hidden whitespace-nowrap w-full">
                    {{ userStor.user.email }}
                  </p>
                </div>
                <div class="flex flex-col justify-start items-end h-full w-1/3 pr-1">
                  <p class="pt-0 pb-0 tracking-wider font-semibold ">Status:</p>
                  <p class="pt-0.5 pb-px tracking-wider text-right text-ellipsis overflow-hidden whitespace-nowrap w-full">
                    {{ userStor.user.role == 'authenticated' ? "zalogowano" : '???' }}
                  </p>
                </div>
              </div>
              <p class="p-1 pt-1 pb-0.5 tracking-wider font-semibold">Chmura:</p>
              <p class="p-1 pt-0.5 pb-1 tracking-wider">
                Ilość zapisanych plików <span class="bg-gray-600 bg-opacity-90 p-px pr-1 pl-1 text-white font-normal">{{
                    dateStor.diagnostics.storageFiles
                }}</span>
              </p>
              <p class="p-1 pt-0.5 pb-1.5 tracking-wider">
                Zajęta pamięć <span class="bg-gray-600 bg-opacity-90 p-px pr-1 pl-1 text-white font-normal">{{
                    (dateStor.diagnostics.storageFileMemory / 10).toFixed(2)
                }} %</span> ({{
    dateStor.diagnostics.storageFileMemory
}} mb / 1 gb)
              </p>
              <div class="w-full h-full pr-1 pl-1">
                <div
                  class="w-full h-2 flex justify-end items-center text-xs tracking-wider bg-webgencol relative overflow-hidden">

                  <div class="h-full bg-red-700 opacity-80 absolute left-0"
                    :style="{ width: dateStor.diagnostics.storageFileMemory / 10 + '%' }">
                  </div>
                </div>
              </div>
              <p @click="logOut"
                class="underline tracking-wider cursor-pointer text-red-700 hover:opacity-60 transition p-1 pt-2 pb-0">
                wyloguj
              </p>
            </div>
          </div>
          <div
            class="text-gray-300 font-light text-2xs 2xl:text-xs 3xl:text-sm text-center tracking-wide p-2 pb-3 pt-3">
            <div class="flex flex-col justify-evenly items-start flex-wrap m-0.5">
              <div class="flex m-0.5 2xl:m-1 2xl:mb-2">
                <div class="p-1 bg-gray-400 rounded-full ml-0.5 mr-0.5 hover:opacity-70"></div>
                <p class="text-justify ml-2 text-2xs 2xl:text-xs 3xl:text-xs tracking-normal">
                  <span class="font-medium tracking-wider">ZADANIE</span> Tą
                  etykiete posiadają zwykłe zadania, nie posiadające cech
                  unikalnych.
                </p>
              </div>
              <div class="flex m-0.5 2xl:m-1 2xl:mb-2">
                <div class="p-1 bg-red-600 rounded-full ml-0.5 mr-0.5 hover:opacity-70"></div>
                <p class="text-justify ml-2 text-2xs 2xl:text-xs 3xl:text-xs tracking-normal">
                  <span class="font-medium tracking-wider">STOP</span> Dodajemy tą
                  etykiete do zadania, które posiada błąd, lub problem, którego
                  nie możemy rozwiązać.
                </p>
              </div>
              <div class="flex m-0.5 2xl:m-1 2xl:mb-2">
                <div class="p-1 bg-yellow-600 rounded-full ml-0.5 mr-0.5 hover:opacity-70"></div>
                <p class="text-justify ml-2 text-2xs 2xl:text-xs 3xl:text-xs tracking-normal">
                  <span class="font-medium tracking-wider">WERYFIKACJA</span>
                  Dodajemy tą etykiete, kiedy prosimy o sprawdzenie błędów, czy
                  zgody w decyzyjności wspólnej.
                </p>
              </div>
              <div class="flex m-0.5 2xl:m-1 2xl:mb-2">
                <div class="p-1 bg-purple-500 rounded-full ml-0.5 mr-0.5 hover:opacity-70"></div>
                <p class="text-justify ml-2 text-2xs 2xl:text-xs 3xl:text-xs tracking-normal">
                  <span class="font-medium tracking-wider">AKTUALIZACJA</span>
                  Dodajemy tą etykiete, gdy chcemy, by reszta grupy zapoznała się
                  z tą zmianą.
                </p>
              </div>
              <div class="flex m-0.5 2xl:m-1 2xl:mb-2">
                <div class="p-1 bg-sky-500 rounded-full ml-0.5 mr-0.5 hover:opacity-70"></div>
                <p class="text-justify ml-2 text-2xs 2xl:text-xs 3xl:text-xs tracking-normal">
                  <span class="font-medium tracking-wider">ROZPOCZĘTO</span> Tą
                  etykietą oznaczamy zadania, które mają status aktywny.
                </p>
              </div>
              <div class="flex m-0.5 2xl:m-1 2xl:mb-2">
                <div class="p-1 bg-green-500 rounded-full ml-0.5 mr-0.5 hover:opacity-70"></div>
                <p class="text-justify ml-2 text-2xs 2xl:text-xs 3xl:text-xs tracking-normal">
                  <span class="font-medium tracking-wider">ZROBIONE</span>
                  Tą etykiete dodajemy na koniec, by oznaczyć zadanie jako
                  zrobione lub zrobione i sprawdzone.
                </p>
              </div>
            </div>
            <p class="p-1 pb-0 text-3xs 2xl:text-xs 3xl:text-sm">
              <span class="border-gray-200 font-semibold p-1 text-2xs">shift + scroll myszką</span>
            <p class="text-2sm">lub</p>
            <p class="border-gray-200 font-semibold p-1 text-2xs">scroll myszką po najechaniu na nagłówek tablicy</p>
            <p>scrollowanie okna pracy</p>
            </p>
          </div>
        </div>
        <div class="flex flex-col justify-end items-center w-full">
          <div
            class="flex flex-col w-full justify-center items-center mb-0 mt-0 font-normal bg-gray-600 text-gray-50 tracking-wide h-18">
            <div class="w-full pr-4 pl-7 2xl:pl-4 pb-3 pt-3 flex justify-center items-center">
              <div
                class="flex flex-col justify-start items-center w-full text-2sm 2xl:text-sm font-light tracking-wider">
                <div class="flex justify-end items-center w-full h-full pl-0">
                  <p class="cursor-default select-none">dzisiaj jest</p>
                  <p class="cursor-default select-none ml-1">{{ infoTerm }}</p>
                  <p class="cursor-default select-none ml-1">{{ infoMonth }}</p>
                  <p class="cursor-default select-none ml-1">{{ infoYear }}</p>
                </div>
                <div class="flex justify-end items-center w-full h-full pl-5">
                  <p class="cursor-default w-14 select-none mr-2 tracking-widest">
                    {{ infoTime }}
                  </p>
                  <p class="cursor-default select-none mr-0">{{ infoDay }}</p>
                  
                </div>
              </div>
            </div>
          </div>
          <div class="w-full h-22 bg-gray-100">
            <div class="flex justify-center items-center rounded-full w-full h-full">
              <div
                class="h-32 w-32 relative bg-gray-100 rounded-full flex justify-center items-center animate-spin-slow"
                :class="{ 'anim-pause': dateStor.processing }">
                <img src="../assets/logo_circle.svg" draggable="false" alt="WIMS"
                  class="cursor-default select-none h-full font-montserrat w-24 absolute"
                  :class="{ 'opacity-50': dateStor.processing }" />
                <span v-if="dateStor.processing" class="text-3xl absolute grayscale">⏳</span>
              </div>
              <div class="pl-3 3xl:pl-2 pr-5 3xl:pr-2">
                <p class="text-xs 2xl:text-sm 3xl:text-base tracking-wider 3xl:tracking-widetest font-medium">
                  WEBGENETICSS
                </p>
                <p class="text-xs 2xl:text-sm tracking-widest font-bold">
                  IM System <span class="text-2xs"></span>
                  <span class="text-2xs"> {{ dateStor.version }}</span>
                </p>
              </div>
            </div>
          </div>
          <div v-if="dateStor.fixing" class="w-full h-8 bg-gray-300 bg-opacity-90 flex justify-end items-center">
            <div class="w-full h-full  flex justify-between items-center overflow-hidden">
              <div class="bg-yellow-600 bg-opacity-80 flex justify-center items-center">
                <span class="text-xl p-1 pr-2.5 pl-2.5 grayscale invert opacity-100">🛠</span>
              </div>
              <div class="bg-gray-700 bg-opacity-90 w-full h-full pr-2">
                <span
                  class="text-sm pr-2 flex justify-end items-center h-full font-normal text-gray-200 tracking-wider">
                  Naprawianie rzeczy..
                </span>
              </div>
            </div>
          </div>
          <div v-else-if="dateStor.processing"
            class="w-full h-8 bg-gray-300 bg-opacity-90 flex justify-end items-center">
            <div class="w-full h-full  flex justify-between items-center overflow-hidden">
              <div class="bg-sky-600 bg-opacity-70 flex justify-center items-center">
                <span class="text-lg p-1 pr-2 pl-2 grayscale brightness-150 opacity-80">📥</span>
              </div>
              <div class="bg-gray-700 bg-opacity-90  w-full h-full pr-2">
                <span
                  class="text-sm pr-2 flex justify-end items-center h-full font-normal text-gray-200 tracking-wider">
                  Pobieranie danych...
                </span>
              </div>
            </div>
          </div>
          <div v-else
            class="w-full h-8 bg-webgencol bg-opacity-90 flex justify-between items-center pr-1 overflow-hidden">
            <div v-if="dateStor.check" class="bg-orange-400 bg-opacity-80 flex justify-center items-center">
              <span class="text-lg p-1 pr-3 pl-3 grayscale brightness-150 opacity-70">❕</span>
            </div>
            <div v-else class="">
            </div>
            <div class="flex justify-end items-center pr-1">
              <div class="h-full w-12 p-1">
                <div
                  class="h-full w-full bg-gray-300 rounded-2xl flex justify-center items-center transition text-sm opacity-60 cursor-not-allowed">
                  📃
                </div>
              </div>
              <div class="h-full w-12 p-1">
                <div v-if="tab === 1" @click="tabHandler(1)"
                  class="h-full w-full bg-gray-200 rounded-2xl flex justify-center items-center transition text-sm opacity-80">
                  🔍
                </div>
                <div v-else @click="tabHandler(1)"
                  class="h-full w-full bg-gray-300 opacity-60 rounded-2xl hover:opacity-80 cursor-pointer flex justify-center items-center transition text-sm">
                  🔍
                </div>
              </div>
              <div class="h-full w-12 p-1">
                <div v-if="tab === 0" @click="tabHandler(0)"
                  class="h-full w-full bg-gray-200 rounded-2xl transition flex justify-center items-center font-semibold text-sm opacity-80">
                  📆
                </div>
                <div v-else @click="tabHandler(0)"
                  class="h-full w-full bg-gray-300 opacity-60 rounded-2xl transition hover:opacity-80 flex justify-center items-center font-semibold cursor-pointer text-sm">
                  📆
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";
import { dataStore } from "@/stores/data.js";
import { userStore } from "@/stores/user.js";
import { supabase } from "../supabase/init.js";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "HeaderPlace",
  setup() {
    const dateStor: any = dataStore();
    const userStor: any = userStore();
    const tab = ref<number>(0);
    const infoTasks = ref<any[]>();
    const infoTasksToday = ref<boolean>(true);
    const infoTasksTitle = ref<string>("ZADANIA NA DZISIAJ");
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
    const router = useRouter();
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
    const calDaysInMonth = ref(<any>[]);
    const calPrevDaysInMonth = ref(<any>[]);
    const calLastDayOfWeek = ref(
      new Date(now.value.getUTCFullYear(), now.value.getMonth() + 1, 0).getDay()
    );
    now.value.setDate(1);
    const caldayOfWeek = ref(now.value.getUTCDay());
    const calNextDaysInMonth = ref(<any>[]);
    const yearWithMonth = ref(yearNow.value + "" + monthOfDate.value);
    const tabHandler = (num: number): void => {
      tab.value = num;
    };
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
      if (
        monthOfDate.value < 2 &&
        dayOfDate.value > 0 &&
        dayOfDate.value < 20
      ) {
        noti.value =
          "Przypomnienie o ZUS i podatkach do 20-ego. Jest jeszcze PIT-28 do końca lutego.";
      } else if (
        monthOfDate.value == 2 &&
        dayOfDate.value > 0 &&
        dayOfDate.value < 20
      ) {
        noti.value =
          "Przypomnienie o ZUS i podatkach do 20-ego. Zwrot podatku?";
      } else if (monthOfDate.value < 2 && dayOfDate.value > 20) {
        noti.value =
          "Przypomnienie o fakturkach. Jest jeszcze PIT-28 do końca lutego.";
      } else if (monthOfDate.value == 2 && dayOfDate.value > 20) {
        noti.value = "Przypomnienie o fakturkach. Zwrot podatku?";
      } else if (dayOfDate.value > 0 && dayOfDate.value < 20) {
        noti.value = "Przypomnienie o ZUS i podatkach do 20-ego.";
      } else if (dayOfDate.value > 20) {
        noti.value = "Przypomnienie o fakturkach.";
      }
      infoTasks.value = [];
      showInfoTasks(infoDateUS.value!);
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
        "-" +
        (now.getMonth() + 1 < 10
          ? "0" + (now.getMonth() + 1)
          : now.getMonth() + 1) +
        "-" +
        (now.getDate() < 10 ? "0" + now.getDate() : now.getDate());
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
    const showInfoTasks = async (date: string) => {
      infoTasksToday.value = false;
      if (date === infoDateUS.value) {
        todayInfoTasks();
      } else {
        infoTasks.value = dateStor.dataTasks.filter(
          (item: any) => item.task_date === date
        );
        infoTasks.value == undefined ? (infoTasks.value = []) : infoTasks.value;
        infoTasksTitle.value =
          "ZADANIA NA " +
          date.charAt(8) +
          date.charAt(9) +
          "." +
          date.charAt(5) +
          date.charAt(6);
      }
    };
    const todayInfoTasks = async () => {
      if (dateStor.dataTasks.length != 0) {
        infoTasksToday.value = true;
        infoTasks.value = await dateStor.dataTasks.filter(
          (item: any) => item.task_date === infoDateUS.value
        );
        infoTasksTitle.value = "ZADANIA NA DZISIAJ";
      } else {
        setTimeout(() => {
          showInfoTasks(infoDateUS.value!);
        }, 1000);
      }
    };
    setInterval(() => {
      timeCalculator();
    }, 1000);
    timeCalculator();
    monthAtStart();
    const logOut = async () => {
      await supabase.auth.signOut();
      setTimeout(() => {
        router.push({ name: "LoginPage" });
      }, 1000);
    };
    return {
      noti,
      dateStor,
      userStor,
      tab,
      tabHandler,
      infoTasks,
      infoTasksTitle,
      infoTasksToday,
      infoYear,
      infoTime,
      infoDate,
      infoDateUS,
      infoDay,
      infoMonth,
      infoTerm,
      showInfoTasks,
      todayInfoTasks,
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
      logOut,
    };
  },
})
</script>