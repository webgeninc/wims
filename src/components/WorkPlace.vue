<template>
  <div
    class="bg-gray-100 w-full h-full flex p-2 flex-nowrap overflow-x-auto font-montserrat"
  >
    <div
      v-for="(tab, index) in dateStor.dataTabs"
      :key="index"
      class="flex flex-shrink-0 w-80 flex-col m-1"
    >
      <div
        v-if="tabNameId != tab.id"
        class="flex flex-row justify-end text-xs cursor-grab"
      >
        <p
          @click="tabNameChange(tab.id)"
          class="ml-2 mr-2 text-2xs tracking-wider font-semibold text-gray-600 text-opacity-50 hover:text-opacity-100 transition cursor-pointer"
        >
          edytuj tytuł karty
        </p>
        <p
          class="ml-2 mr-2 text-2xs tracking-tighter font-semibold text-red-600 text-opacity-50 hover:text-opacity-100 transition cursor-pointer"
        >
          usuń kartę
        </p>
      </div>
      <div
        v-if="tabNameId === tab.id && dateStor.processing == null"
        class="flex flex-row justify-between w-full text-xs mr-0.5 ml-0.5 cursor-grab"
      >
        <input
          ref="tabNameInput"
          autocomplete="off"
          maxlength="45"
          required
          type="text"
          v-model="tabName"
          placeholder="tabName"
          class="p-1.5 flex-1 m-1 border-gray-300 border focus:outline-none resize-none rounded-xl"
        />
        <button
          @click="tabNamePush(tab.id)"
          class="bg-gray-300 text-white rounded-full font-medium transition hover:bg-gray-200 m-1 p-0.5 pr-4 pl-4"
        >
          <span class="text-base grayscale opacity-50">👌</span>
        </button>
      </div>
      <div
        v-if="dateStor.processing == tab.id"
        class="flex justify-center item-center text-sm font-medium"
      >
        <p class="p-1 mt-1">🔔 GOTOWE</p>
      </div>
      <div
        class="p-1 pt-1 text-center flex flex-row justify-center items-center cursor-grab h-16"
      >
        <h3
          class="font-semibold text-left text-base text-gray-700 tracking-wide p-2 pt-0 pb-0 flex-1"
        >
          {{ tab.tab_name }}
        </h3>
        <button
          class="bg-gray-300 text-white rounded-full font-medium transition hover:bg-gray-200 p-0.5 pr-3 pl-3"
        >
          <span class="text-base grayscale opacity-50">📝</span>
        </button>
      </div>
      <div
        class="w-full bg-gray-200 mt-2 p-2 scrollbar-none !scrollbar-thumb-indigo-500"
      >
        <form
          v-for="(item, index) in dateStor.tasks"
          :key="index"
          class="flex flex-col justify-center text-xs items-center"
        >
          <div class="w-full flex justify-between items-center pl-1 m-1">
            <h4 class="text-xs m-0.5 pl-1 pr-3 font-semibold uppercase">
              Nowe zadanie
            </h4>
            <button
              class="bg-gray-400 text-gray-50 rounded-2xl text-2xs font-medium transition hover:bg-gray-500 p-0.5 pr-3 pl-3 mr-0.5 ml-0.5"
            >
              Zamknij okno
            </button>
          </div>
          <div class="flex w-full flex-col justify-center items-center p-1">
            <div class="flex w-full justify-between items-center m-1 h-6">
              <input
                v-model="item.task_name"
                autocomplete="off"
                maxlength="50"
                minlength="5"
                required
                id="taskName"
                type="text"
                placeholder="Nazwa zadania"
                class="p-1 w-3/5 text-xs focus:border-gray-400 border-gray-200 border focus:outline-none resize-none"
              />
              <select
                required
                v-model="item.task_worker"
                class="p-1 w-2/6 text-xs focus:border-gray-400 border-gray-200 border focus:outline-none"
              >
                <option value="Ozi">Ozito</option>
                <option value="Mati">Matito</option>
                <option value="Wszyscy">Wszyscy</option>
              </select>
            </div>
            <textarea
              v-model="item.task_desc"
              autocomplete="off"
              maxlength="500"
              id="taskDesc"
              type="text"
              placeholder="Opis"
              class="w-full h-16 m-1 p-1 text-xs focus:border-gray-400 border-gray-200 border focus:outline-none resize-none"
            />
            <div
              class="flex flex-row w-full justify-between items-center mt-1 mb-1 text-xs"
            >
              <input
                v-model="item.task_date"
                type="date"
                class="w-1/2 h-6 p-1 focus:border-gray-400 border-gray-200 border focus:outline-none"
              />
              <select
                required
                v-model="item.task_color"
                class="p-1 w-2/5 h-6 focus:border-gray-400 border-gray-200 border focus:outline-none"
              >
                <option value="1">Zadanie</option>
                <option value="2">Stop</option>
                <option value="3">Weryfikacja</option>
                <option value="4">Aktualizacja</option>
                <option value="5">Rozpoczęto</option>
                <option value="6">Zrobione</option>
              </select>
            </div>
            <div
              class="flex flex-row w-full justify-around items-center mt-2 text-2xs"
            >
              <input
                ref="imageUpload"
                id="imageUpload"
                type="file"
                accept="image/*"
                class="w-full text-2xs p-0 m-1 flex justify-start items-center"
              />
              <button
                type="submit"
                class="bg-gray-400 text-gray-50 rounded-2xl font-medium transition hover:bg-gray-500 p-0.5 pr-3 pl-3 mr-0.5 ml-0.5"
              >
                Dodaj
              </button>
            </div>
          </div>
        </form>
      </div>
      <!-- <div
        v-if="dataLoaded"
        class="h-full flex-nowrap overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full pr-2"
      >
        <div v-for="(task, index) in dataTasks" :key="index">
          <div
            v-if="editTask != task.id && tab.id === task.task_tabid"
            @mouseleave="hoverTaskLeave"
            class="overflow-hidden flex bg-gray-50 shadow-md mb-1 mt-1 pt-1"
          >
            <div v-if="task.task_color === 3" class="bg-yellow-600 w-1.5"></div>
            <div
              v-else-if="task.task_color === 5"
              class="bg-blue-600 w-1.5"
            ></div>
            <div
              v-else-if="task.task_color === 2"
              class="bg-red-600 w-1.5"
            ></div>
            <div
              v-else-if="task.task_color === 1"
              class="bg-gray-400 w-1.5"
            ></div>
            <div
              v-else-if="task.task_color === 6"
              class="bg-green-600 w-1.5"
            ></div>
            <div
              v-else-if="task.task_color === 4"
              class="bg-purple-600 w-1.5"
            ></div>
            <div class="m-0.5 ml-1.5 flex flex-col flex-1">
              <div
                v-if="editTask != task.id"
                class="flex flex-row w-full items-baseline overflow-hidden"
              >
                <div
                  v-if="hoverTask === task.id"
                  class="pt-0.5 flex flex-row w-full justify-end items-center flex-shrink-0 transition duration-200"
                >
                  <p
                    @click="ChangeEditTask(task.id)"
                    class="text-2xs ml-2 mr-2 font-semibold tracking-wider text-gray-600 text-opacity-50 hover:text-opacity-100 cursor-pointer"
                  >
                    EDYTUJ
                  </p>
                  <p
                    @click="deleteTask(task.id)"
                    class="text-2xs ml-2 mr-2 font-semibold tracking-wider text-red-600 text-opacity-50 hover:text-opacity-100 cursor-pointer"
                  >
                    USUŃ
                  </p>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <p
                  class="text-sm m-1 font-semibold flex flex-wrap overflow-x-hidden"
                >
                  {{ task.task_name }}
                </p>
                <button
                  v-if="
                    task.task_image !== '' &&
                    task.task_image !== null &&
                    imageStatus !== task.id
                  "
                  @click="openImage(task.id)"
                  class="bg-gray-400 text-gray-50 rounded-2xl text-2xs font-medium transition hover:bg-gray-500 p-0.5 pr-3 pl-3 mr-0.5 ml-0.5"
                >
                  Zobacz obraz
                </button>
                <button
                  v-if="imageStatus === task.id"
                  @click="closeImage()"
                  class="bg-gray-400 text-gray-50 rounded-2xl text-2xs font-medium transition hover:bg-gray-500 p-0.5 pr-3 pl-3 mr-0.5 ml-0.5"
                >
                  Zamknij
                </button>
              </div>
              <div v-if="task.task_image !== '' && task.task_image !== null">
                <div class="flex justify-center items-center">
                  <div
                    v-if="imageStatus === task.id && imageDataLoaded !== true"
                    class="mt-4 mb-2 w-1 h-1 rounded-full p-4 bg-gradient-to-t from-gray-400 via-gray-50 to-gray-50 flex justify-center items-center animate-spin"
                  >
                    <div class="w-1 h-1 rounded-full p-3 bg-gray-100"></div>
                  </div>
                </div>
                <img
                  v-if="imageStatus === task.id"
                  @click="socialPostOpener(task.id)"
                  ref="imagerPreview"
                  class="w-full mt-1 mb-2 cursor-pointer hover:opacity-80 hover:bg-gray-400"
                />
              </div>
              <div
                v-if="(task.task_desc.length > 140) & (seeMore != task.id)"
                class="w-full"
              >
                <p class="text-sm m-1 font-normal overflow-hidden h-16">
                  {{ task.task_desc }}
                </p>
                <p
                  @click="seeMoreHandler(task.id)"
                  class="p-1 text-2xs text-gray-400 hover:text-gray-700 cursor-pointer m-0"
                >
                  zobacz wiecej
                </p>
              </div>
              <div
                v-if="(task.task_desc.length > 140) & (seeMore == task.id)"
                class="w-full"
              >
                <p class="text-sm m-1 font-normal overflow-hidden">
                  {{ task.task_desc }}
                </p>
                <p
                  @click="seeMoreHandler(task.id)"
                  class="p-1 text-2xs text-gray-400 hover:text-gray-700 cursor-pointer m-0"
                >
                  zobacz mniej
                </p>
              </div>
              <p
                v-if="task.task_desc.length <= 140"
                class="text-sm m-1 font-normal"
              >
                {{ task.task_desc }}
              </p>
              <div class="mt-1 flex flex-row justify-between">
                <div v-if="task.task_date !== ''" class="flex flex-row">
                  <p class="text-xs m-1 font-semibold">
                    {{ viewDate(task.task_date) }}
                  </p>
                  <p
                    v-if="
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
                    "
                    class="text-xs m-1 font-normal text-red-600"
                  >
                    (minęło
                    <span class="font-semibold tracking-wider">{{
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
                    }}</span>
                    dni temu)
                  </p>
                  <p
                    v-else-if="
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
                    "
                    class="text-xs m-1 font-medium tracking-wider text-yellow-600"
                  >
                    (do dzisiaj)
                  </p>
                  <p
                    v-else-if="
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
                    "
                    class="text-xs m-1 font-medium tracking-wider text-yellow-500"
                  >
                    (tylko
                    <span class="font-semibold tracking-wider">{{
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
                    }}</span>
                    dni)
                  </p>
                  <p
                    v-else-if="
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
                    "
                    class="text-xs m-1 font-normal text-gray-600"
                  >
                    (zostało
                    <span class="font-semibold tracking-wider">{{
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
                    }}</span>
                    dni)
                  </p>
                </div>
                <div v-if="task.task_date === ''" class="flex flex-row">
                  <p class="text-xs m-1 font-semibold">Bez daty</p>
                </div>
                <p
                  @click="hoverTaskEnter(task.id)"
                  class="text-xs m-1 font-bold hover:text-gray-400 transition cursor-pointer"
                >
                  {{ task.task_worker }}
                </p>
              </div>
            </div>
          </div>
          <div
            v-if="editTask == task.id && tab.id === task.task_tabid"
            class="flex justify-center items-center bg-gray-200 p-px pt-1 pb-1 w-full"
          >
            <form
              v-for="(item, index) in editedTask"
              :key="index"
              @submit.prevent="pushEditTask(task.id)"
              class="flex flex-col justify-center text-xs items-center"
            >
              <div class="w-full flex justify-between items-center pl-1 m-1">
                <h4 class="text-xs m-0.5 pl-1 pr-3 font-semibold uppercase">
                  Edycja zadanie
                </h4>
                <button
                  @click="removeEditTask"
                  class="bg-gray-400 text-gray-50 rounded-2xl text-2xs font-medium transition hover:bg-gray-500 p-0.5 pr-3 pl-3 mr-0.5 ml-0.5"
                >
                  Zamknij okno
                </button>
              </div>
              <div class="flex w-full flex-col justify-center items-center p-1">
                <div class="flex w-full justify-between items-center m-1 h-6">
                  <input
                    v-model="item.task_name"
                    autocomplete="off"
                    maxlength="50"
                    minlength="5"
                    required
                    type="text"
                    :placeholder="item.task_name"
                    class="p-1 w-3/5 text-xs border-gray-200 border focus:border-gray-400 focus:outline-none resize-none"
                  />

                  <select
                    required
                    v-model="item.task_worker"
                    class="p-1 w-2/6 text-xs focus:border-gray-400 border-gray-200 border focus:outline-none"
                  >
                    <option value="Ozi">Ozito</option>
                    <option value="Mati">Matito</option>
                    <option value="Wszyscy">Wszyscy</option>
                  </select>
                </div>
                <textarea
                  v-model="item.task_desc"
                  autocomplete="off"
                  maxlength="500"
                  id="taskDesc"
                  type="text"
                  placeholder="Opis"
                  class="w-full h-16 m-1 p-1 text-xs border-gray-200 border focus:border-gray-400 focus:outline-none resize-none"
                />
                <div
                  class="flex flex-row w-full justify-between items-center mt-1 mb-1 text-xs"
                >
                  <input
                    v-model="item.task_date"
                    type="date"
                    class="w-1/2 h-6 p-1 focus:border-gray-400 border-gray-200 border focus:outline-none"
                  />
                  <select
                    required
                    v-model="item.task_color"
                    class="p-1 w-2/5 h-6 focus:border-gray-400 border-gray-200 border focus:outline-none"
                  >
                    <option value="1">Zadanie</option>
                    <option value="2">Stop</option>
                    <option value="3">Weryfikacja</option>
                    <option value="4">Aktualizacja</option>
                    <option value="5">Rozpoczęto</option>
                    <option value="6">Zrobione</option>
                  </select>
                </div>

                <div
                  class="flex flex-row w-full justify-around items-center mt-2 text-2xs"
                >
                  <input
                    v-on:change="imageHandler"
                    ref="imageUpload"
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    class="w-full text-2xs p-0 m-1 flex justify-start items-center"
                  />
                  <button
                    type="submit"
                    class="bg-gray-400 text-gray-50 rounded-2xl font-medium transition hover:bg-gray-500 p-0.5 pr-3 pl-3 mr-0.5 ml-0.5"
                  >
                    Dodaj
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="socialPost !== null"
      class="absolute top-0 bottom-0 left-0 right-1/6 bg-white bg-opacity-80 pointer-events-auto"
    ></div>
    <div
      v-if="socialPost !== null"
      class="bg-fbbackground absolute top-30 left-30 right-110 bottom-30 rounded-xl shadow-2xl border border-gray-300 flex justify-start items-center overflow-hidden"
    >
      <div class="w-1/7 3xl:w-2/7 flex-shrink-0 h-full">
        <p
          class="text-2xs 2xl:text-xs 3xl:text-sm font-medium p-5 tracking-wider"
        >
          Social Media 0.13.00
        </p>
      </div>
      <div class="flex justify-start items-center w-3/4 3xl:w-2/3 h-full">
        <div
          class="flex flex-col justify-start items-start w-1/2 3xl:w-2/5 h-full p-2"
        >
          <div
            class="w-full bg-white border border-black border-opacity-20 rounded-xl p-3 mt-1 shadow-md"
          >
            <div class="flex justify-between items-start">
              <p class="text-2xs 2xl:text-xs 3xl:text-sm font-semibold flex-1">
                Utwórz reklamę
              </p>
              <p class="text-2xs 2xl:text-xs 3xl:text-xs text-webgencol">
                Wyświetl wszystko
              </p>
            </div>
            <div class="mt-0.5">
              <p class="text-2xs 2xl:text-xs 3xl:text-sm text-gray-500">
                Jak chcesz rozwijać swoją firmę?
              </p>
            </div>
            <div class="mt-5">
              <p class="text-2xs 2xl:text-xs 3xl:text-sm font-medium">
                Utwórz nową reklamę
              </p>
              <p class="text-2xs 2xl:text-xs 3xl:text-xs">
                Utwórz reklamę za pomocą tekstu, zdjęć i filmów, aby wypromować
                swoją firmę
              </p>
            </div>
            <div class="w-full h-px bg-gray-300 mt-3 mb-3"></div>
            <div class="mt-3">
              <p class="text-2xs 2xl:text-xs 3xl:text-sm">Promuj post</p>
            </div>
            <div class="w-full h-px bg-gray-300 mt-3 mb-3"></div>
            <div class="mt-3">
              <p class="text-2xs 2xl:text-xs 3xl:text-sm">
                Promuj post na Instagramie
              </p>
            </div>
            <div class="w-full h-px bg-gray-300 mt-3 mb-3"></div>
            <div class="mt-3">
              <p class="text-2xs 2xl:text-xs 3xl:text-sm">
                Zautomatyzowane reklamy
              </p>
              <p class="text-2xs 2xl:text-xs 3xl:text-xs text-gray-500">
                Wybierz inny cel biznesowy zautomatyzowanych reklam
              </p>
            </div>
          </div>
          <div
            class="w-full bg-white border border-black border-opacity-20 rounded-xl p-3 mt-5 shadow-md"
          >
            <div class="flex justify-between items-center">
              <p class="text-2xs 2xl:text-xs 3xl:text-sm font-bold">
                Statystyki
              </p>
              <p class="text-2xs 2xl:text-xs 3xl:text-xs text-webgencol">
                Wyświetl wszystko
              </p>
            </div>
            <div class="mt-0.5">
              <p class="text-2xs 2xl:text-xs 3xl:text-xs text-gray-500">
                Ostatnie 28 dni : 11 kwi – 8 maj
              </p>
            </div>
            <div
              class="mt-4 flex flex-row justify-between items-center bg-gray-200 rounded-lg p-3"
            >
              <p class="text-2xs 2xl:text-xs 3xl:text-xs">Liczba odbiorców</p>
              <p class="text-2xs 2xl:text-xs 3xl:text-sm font-bold">1,503</p>
            </div>
            <div
              class="mt-4 flex flex-row justify-between items-center bg-gray-200 rounded-lg p-3"
            >
              <p class="text-2xs 2xl:text-xs 3xl:text-xs">
                Aktywność dotycząca postów
              </p>
              <p class="text-2xs 2xl:text-xs 3xl:text-sm font-bold">96</p>
            </div>
            <div
              class="mt-4 flex flex-row justify-between items-center bg-gray-200 rounded-lg p-3"
            >
              <p class="text-2xs 2xl:text-xs 3xl:text-xs">Polubienia strony</p>
              <p class="text-2xs 2xl:text-xs 3xl:text-sm font-bold">1</p>
            </div>
            <div
              class="mt-4 flex flex-row justify-between items-center bg-gray-200 rounded-lg p-3"
            >
              <p class="text-2xs 2xl:text-xs 3xl:text-xs">
                Kliknięcia oznaczonych produktów
              </p>
              <p class="text-2xs 2xl:text-xs 3xl:text-sm font-bold">0</p>
            </div>
          </div>
          <div
            class="h-16 w-full bg-white border-t border-l border-r border-black border-opacity-20 rounded-t-xl p-3 mt-5 shadow-md"
          >
            <div class="flex justify-between items-center bg-white">
              <p class="text-2xs 2xl:text-xs 3xl:text-sm font-bold bg-white">
                Informacje
              </p>
            </div>
          </div>
        </div>
        <div
          class="flex justify-start items-start w-3/4 3xl:w-3/5 h-full p-2 mt-6"
        >
          <div
            class="w-full bg-white border border-black border-opacity-20 rounded-xl mt-2 shadow-md"
          >
            <div class="p-2 pb-3 2xl:p-3 3xl:p-4 3xl:pb-4 w-full">
              <div class="flex flex-row justify-between items-center w-full">
                <div
                  class="w-1/12 rounded-full p-5 2xl:p-6 3xl:p-6 bg-black bg-opacity-80 mr-3"
                ></div>
                <div
                  class="w-full h-full flex flex-col items-start justify-center pb-1"
                >
                  <p
                    class="text-xs 2xl:text-sm 3xl:text-base tracking-tight font-sans font-medium"
                  >
                    Strona Firmy
                  </p>
                  <p
                    class="text-2xs 2xl:text-2xs 3xl:text-xs text-gray-400 tracking-tight font-sans font-normal"
                  >
                    Opublikowane przez: Użytkownik Strony
                    {{ socialPost.date }} o 12:00
                  </p>
                </div>
              </div>
            </div>
            <div class="pl-3 pr-3 3xl:pl-4 3xl:pr-4 w-full">
              <div class="mb-2">
                <p
                  class="text-xs 2xl:text-sm 3xl:text-base tracking-tight font-sans font-normal leading-tight"
                >
                  {{ socialPost.desc }}
                </p>
              </div>
            </div>
            <div>
              <img
                ref="imagerSocialPreview"
                class="w-full mt-1 mb-2 border-t border-b border-black border-opacity-20"
              />
            </div>
            <div
              class="flex flex-row justify-between items-center pl-2 pr-2 3xl:pr-4 3xl:pl-4 mt-4 mb-4"
            >
              <div class="flex flex-col justify-center items-start">
                <p
                  class="text-2xs 2xl:text-xs 3xl:text-sm font-medium tracking-tighter 3xl:tracking-normal"
                >
                  523
                </p>
                <p
                  class="text-2xs 2xl:text-xs 3xl:text-xs font-normal tracking-tighter 3xl:tracking-normal"
                >
                  Liczba odbiorców
                </p>
              </div>
              <div class="flex flex-col justify-center items-start">
                <p
                  class="text-2xs 2xl:text-xs 3xl:text-sm font-medium tracking-tighter 3xl:tracking-normal"
                >
                  23
                </p>
                <p
                  class="text-2xs 2xl:text-xs 3xl:text-xs font-normal tracking-tighter 3xl:tracking-normal"
                >
                  Aktywność
                </p>
              </div>
              <div class="flex flex-col justify-center items-start">
                <p
                  class="text-2xs 2xl:text-xs 3xl:text-sm font-medium tracking-tighter 3xl:tracking-normal"
                >
                  Średni +1,0x
                </p>
                <p
                  class="text-2xs 2xl:text-xs 3xl:text-xs font-normal tracking-tighter 3xl:tracking-normal"
                >
                  Wynik dystrybucji
                </p>
              </div>
              <div class="flex flex-col justify-center items-center">
                <div
                  class="bg-webgencol rounded-md p-1 pr-1.5 pl-1.5 3xl:p-2 3xl:pr-2.5 3xl:pl-2.5"
                >
                  <p
                    class="text-white text-2xs 2xl:text-xs 3xl:text-sm font-medium"
                  >
                    Promuj post
                  </p>
                </div>
              </div>
            </div>
            <div class="w-full h-px bg-gray-300 mt-3 mb-8"></div>
            <div
              class="w-full h-full flex justify-center items-center m-3 mb-10"
            >
              <p class="text-sm 2xl:text-base 3xl:text-lg font-normal">
                Wczytywanie zdjęcia...
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-grow flex-shrink h-full">
        <div class="flex justify-end items-start p-5">
          <button
            @click="socialPostCloser()"
            class="bg-gray-400 text-gray-50 text-2xs 2xl:text-xs 3xl:text-sm rounded-2xl font-medium transition hover:bg-gray-500 p-0.5 pr-3 pl-3 mr-0.5 ml-0.5"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
    <div class="h-10 text-xs m-2">
      <div
        v-if="createTab == null"
        class="flex h-full justify-center items-center p-2"
      >
        <button
          @click="addCreateTab"
          class="h-8 w-12 p-1 rounded-full bg-gray-600 text-white transition hover:bg-gray-500 font-medium text-base shadow-inner"
        >
          +
        </button>
      </div>
      <div v-if="createTab" class="p-1">
        <form @submit.prevent="pushTab" action class="flex flex-col p-1">
          <input
            autocomplete="off"
            maxlength="50"
            required
            v-model="tabName"
            id="tabName"
            type="text"
            placeholder="Nazwa nowej tabeli"
            class="p-2 pr-3 pl-3 border-gray-300 border focus:outline-none resize-none rounded-full"
          />
          <div class="flex flex-row justify-around items-center w-full">
            <button
              type="submit"
              class="rounded-full mt-1 flex-1 mr-1 bg-gray-600 text-white transition hover:bg-gray-500 font-medium text-base shadow-inner"
            >
              +
            </button>
            <button
              @click="removeCreateTab"
              class="rounded-full mt-1 h w-1/4 ml-1 bg-gray-600 text-white transition hover:bg-gray-500 font-medium text-base shadow-inner"
            >
              -
            </button>
          </div>
        </form>
      </div>
      <div
        v-if="statusMsg"
        class="flex flex-row justify-evenly text-xs flex-wrap"
      >
        <div class="text-red-500 font-medium transition flex-1 pt-2 pb-2 m-1">
          Status: {{ statusMsg }}
        </div>
      </div>
      <div
        v-if="errorMsg"
        class="flex flex-row justify-evenly text-xs flex-wrap"
      >
        <div class="text-red-500 font-medium transition flex-1 pt-2 pb-2 m-1">
          Error: {{ errorMsg }}
        </div>  
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
// import { supabase } from "../supabase/init.js";
import { defineComponent } from "vue";
import { dataStore } from "@/stores/data.js";
import { userStore } from "@/stores/user.js";
import { supabase } from "@/supabase/init";

export default defineComponent({
  name: "WorkPlace",
  setup() {
    const dateStor: any = dataStore();
    const userStor: any = userStore();
    const tabNameId = ref<number | null>(null);
    const tabName = ref<string | null>(null);

    const tabNameChange = (tabID: number) => {
      dateStor.dataTabs.forEach((item: any) => {
        item.id === tabID ? (tabName.value = item.tab_name) : false;
      });
      tabNameId.value = tabID;
    };

    const tabNamePush = async (tabID: number) => {
      try {
        const { error } = await supabase
          .from("tabs_table")
          .update({ tab_name: tabName.value })
          .eq("id", tabID);
        tabName.value = "";
        dateStor.processing = tabID;
        if (error instanceof Error) throw error;
      } catch (error) {
        if (error instanceof Error) {
          console.warn(error.message);
        }
      }
      setTimeout(() => {
        dateStor.processing = null;
        tabNameId.value = null;
      }, 1000);
    };

    return {
      dateStor,
      userStor,
      tabNameChange,
      tabNamePush,
      tabNameId,
      tabName,
    };
  },
});
</script>
