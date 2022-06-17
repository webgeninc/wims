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
        v-if="dateStor.ready == tab.id"
        class="flex justify-center item-center text-xs font-medium"
      >
        <p class="p-0.5 mt-0.5">🔔 GOTOWE</p>
      </div>
      <div
        v-if="tabNameId != tab.id && dateStor.ready != tab.id"
        class="flex flex-row justify-end text-xs cursor-grab"
      >
        <p
          @click="tabNameChange(tab.id)"
          class="ml-2 mr-2 text-2xs tracking-wider font-semibold text-gray-600 text-opacity-50 hover:text-opacity-100 transition cursor-pointer"
        >
          edytuj tytuł karty
        </p>
        <p
          @click="tabDelete(tab.id)"
          class="ml-2 mr-2 text-2xs tracking-tighter font-semibold text-red-600 text-opacity-50 hover:text-opacity-100 transition cursor-pointer"
        >
          usuń kartę
        </p>
      </div>
      <div
        v-if="tabNameId === tab.id && dateStor.ready == null"
        class="flex flex-row justify-between w-full text-xs mr-0.5 ml-0.5 cursor-grab"
      >
        <input
          autofocus
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
        class="p-1 pt-1 text-center flex flex-row justify-center items-center cursor-grab h-18"
      >
        <h3
          class="font-semibold text-left text-base text-gray-700 tracking-wide p-2 pt-0 pb-0 flex-1"
        >
          {{ tab.tab_name }}
        </h3>
        <button
          @click="taskCreateHandler(tab.id)"
          class="bg-gray-300 opacity-80 text-white rounded-full font-medium transition hover:bg-opacity-50 p-0.5 pr-3 pl-4"
        >
          <span class="text-sm grayscale opacity-70">📝</span>
        </button>
      </div>
      <div
        class="h-full flex-nowrap overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200 pr-2"
      >
        <div v-if="taskCreateForm === tab.id" class="w-full mt-1 mb-2">
          <div
            class="w-full bg-gray-200 bg-opacity-70 p-2 scrollbar-none !scrollbar-thumb-indigo-500"
          >
            <form
              v-for="(item, index) in tasks"
              :key="index"
              @submit.prevent="
                taskCreatePush(
                  item.task_name,
                  item.task_worker,
                  item.task_desc,
                  item.task_date,
                  item.task_color,
                  tab.id
                )
              "
              class="flex flex-col justify-center text-xs items-center"
            >
              <div class="w-full flex justify-between items-center pl-1 m-1">
                <h4 class="text-xs m-0.5 pr-3 font-semibold uppercase">
                  Nowe zadanie
                </h4>
                <div class="h-full mr-1">
                  <button
                    @click="taskCreateHandler(null)"
                    class="rounded-lg p-0.5 pr-4 pl-4 mr-1 bg-gray-300 bg-opacity-80 transition hover:bg-opacity-50 font-medium text-sm"
                  >
                    <span class="opacity-60">❌</span>
                  </button>
                  <button
                    type="submit"
                    class="rounded-lg p-0.5 pr-4 pl-4 ml-1 bg-gray-300 bg-opacity-80 transition hover:bg-opacity-50 font-medium text-sm"
                  >
                    <span class="opacity-80">✔️</span>
                  </button>
                </div>
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
                    class="p-1 w-3/5 text-xs bg-white bg-opacity-80 rounded-md focus:outline-offset-1 border border-gray-50 focus:border-gray-300 focus:outline-none resize-none"
                  />
                  <select
                    required
                    v-model="item.task_worker"
                    class="p-1 w-2/6 text-xs bg-white bg-opacity-80 rounded-md focus:border-gray-300 border-gray-50 border focus:outline-none"
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
                  class="w-full h-16 m-1 p-1 text-xs rounded-md bg-white bg-opacity-80 focus:border-gray-200 border-gray-50 border focus:outline-none resize-none overflow-y-scroll scrollbar-thin scrollbar-thumb-webgencol scrollbar-track-gray-200"
                />
                <div
                  class="flex flex-row w-full justify-between items-center mt-1 mb-1 text-xs"
                >
                  <input
                    v-model="item.task_date"
                    type="date"
                    class="w-1/2 h-6 p-1 bg-white bg-opacity-80 focus:border-gray-300 border-gray-50 border rounded-md focus:outline-none"
                  />
                  <select
                    required
                    v-model="item.task_color"
                    class="p-1 w-2/5 h-6 bg-white bg-opacity-80 focus:border-gray-300 border-gray-50 border rounded-md focus:outline-none"
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
                  class="flex flex-row w-full justify-between items-center mt-2 text-2xs h-8"
                >
                  <div class="flex flex-1 justify-between h-full ml-1">
                    <div
                      v-if="taskCreateImageInfo"
                      class="flex flex-1 flex-col justify-center items-start tracking-widewide text-xs"
                    >
                      <div class="flex justify-end items-center p-px">
                        <p>{{ taskFile.name }}</p>
                        <p>&nbsp; - nazwa</p>
                      </div>
                      <div class="flex justify-end items-center p-px">
                        <p>
                          {{
                            taskFile.size / 1024 > 999
                              ? (taskFile.size / 1024 / 1024).toFixed(2) + " mb"
                              : (taskFile.size / 1024).toFixed() + " kb"
                          }}
                        </p>
                        <p>&nbsp; - rozmiar</p>
                      </div>
                    </div>
                    <div
                      v-else
                      class="h-full w-full flex justify-start items-center"
                    >
                      <div
                        class="flex justify-center items-end flex-col text-xs pr-0.5"
                      >
                        <p>Nie wybrano żadnych zdjęć</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="w-16 h-full relative rounded-lg bg-gray-300 pointer-events-auto cursor-pointer transition hover:bg-opacity-50 overflow-hidden flex justify-center items-center"
                  >
                    <span
                      class="h-full w-full flex justify-center items-center text-lg opacity-90 transition"
                      >💾</span
                    >
                    <input
                      @change="taskCreateImageInfoHandler"
                      ref="taskCreateImage"
                      id="taskCreateImage"
                      type="file"
                      accept="image/*"
                      class="opacity-0 absolute cursor-pointer p-0 top-0 bottom-0 text-xs"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div v-for="(task, index) in dateStor.dataTasks" :key="index">
          <div
            v-if="taskEditForm != task.id && tab.id === task.task_tabid"
            @mouseleave="taskHoverHandler(null)"
            class="overflow-hidden flex bg-gray-50 shadow-md mb-1.5 mt-1 pt-0.5"
          >
            <div
              class="w-1 rounded-full"
              :class="{
                'bg-gray-400': task.task_color === 1,
                'bg-red-600': task.task_color === 2,
                'bg-yellow-600': task.task_color === 3,
                'bg-purple-600': task.task_color === 4,
                'bg-blue-600': task.task_color === 5,
                'bg-green-600': task.task_color === 6,
              }"
            ></div>
            <div class="ml-1.5 flex flex-col flex-1 pr-0.5 pb-px pt-px">
              <div
                v-if="taskEditForm != task.id"
                class="flex flex-row w-full items-baseline overflow-hidden"
              >
                <div
                  v-if="taskHover === task.id"
                  class="pt-0.5 flex flex-row w-full justify-end items-center flex-shrink-0 transition duration-200"
                >
                  <p
                    @click="taskEditChange(task.id)"
                    class="text-2xs ml-2 mr-2 font-semibold tracking-wider text-gray-600 text-opacity-50 hover:text-opacity-100 cursor-pointer"
                  >
                    edycja
                  </p>
                  <p
                    @click="taskDelete(task.id, tab.id)"
                    class="text-2xs ml-2 mr-2 font-semibold tracking-wider text-red-600 text-opacity-50 hover:text-opacity-100 cursor-pointer"
                  >
                    usunięcie
                  </p>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <p
                  class="text-sm m-1 mb-0 font-semibold flex flex-wrap overflow-x-hidden"
                >
                  {{ task.task_name }}
                </p>
                <!-- <button
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
                </button> -->
              </div>
              <!-- <div v-if="task.task_image !== '' && task.task_image !== null">
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
              </div> -->
              <div
                v-if="task.task_desc.length > 140 && taskExtend != task.id"
                class="w-full"
              >
                <p
                  class="text-sm m-1 font-normal tracking-tight overflow-hidden h-16"
                >
                  {{ task.task_desc }}
                </p>
                <p
                  @click="taskExtendHandler(task.id)"
                  class="p-1 pt-0 pb-0 text-2xs text-gray-400 hover:text-gray-700 cursor-pointer m-0"
                >
                  zobacz wiecej
                </p>
              </div>
              <div
                v-if="task.task_desc.length > 140 && taskExtend == task.id"
                class="w-full"
              >
                <p
                  class="text-sm m-1 font-normal tracking-normal overflow-hidden"
                >
                  {{ task.task_desc }}
                </p>
                <p
                  @click="taskExtendHandler(task.id)"
                  class="p-1 text-2xs text-red-600 hover:text-red-400 cursor-pointer m-0"
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
                    {{ taskDateChanger(task.task_date) }}
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
                      ) < 0 && task.task_color != 6
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
                      ) == 0 && task.task_color != 6
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
                      ) <= 7 && task.task_color != 6
                    "
                    class="text-xs m-1 font-medium tracking-wider text-yellow-500"
                  >
                    tylko
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
                    dni
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
                      ) > 7 && task.task_color != 6
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
                  @click="taskHoverHandler(task.id)"
                  class="text-xs m-1 font-bold hover:text-gray-400 transition cursor-pointer"
                >
                  {{ task.task_worker }}
                </p>
              </div>
            </div>
          </div>
          <div
            v-if="taskEditForm == task.id && tab.id === task.task_tabid"
            class="flex justify-center items-center bg-gray-200 bg-opacity-70 p-2 w-full mb-2"
          >
            <form
              v-for="(item, index) in taskEdited"
              :key="index"
              @submit.prevent="taskEditPush(task.id, tab.id)"
              class="flex flex-col justify-center text-xs items-center w-full"
            >
              <div class="w-full flex justify-between items-center pl-1 m-1">
                <h4 class="text-xs m-0.5 pl-1 pr-3 font-semibold uppercase">
                  Edycja zadania
                </h4>
                <div class="h-full mr-1">
                  <button
                    @click="taskEditClose"
                    class="rounded-lg p-0.5 pr-4 pl-4 mr-1 bg-gray-300 text-white transition hover:bg-gray-200 font-medium text-sm"
                  >
                    <span class="opacity-60">❌</span>
                  </button>
                  <button
                    type="submit"
                    class="rounded-lg p-0.5 pr-4 pl-4 ml-1 bg-gray-300 text-white transition hover:bg-gray-200 font-medium text-sm"
                  >
                    <span class="opacity-60">✔️</span>
                  </button>
                </div>
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
                    class="p-1 w-3/5 text-xs bg-white bg-opacity-80 rounded-md focus:outline-offset-1 border border-gray-50 focus:border-gray-300 focus:outline-none resize-none"
                  />

                  <select
                    required
                    v-model="item.task_worker"
                    class="p-1 w-2/6 text-xs bg-white bg-opacity-80 rounded-md focus:border-gray-300 border-gray-50 border focus:outline-none"
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
                  class="w-full h-16 m-1 p-1 text-xs bg-white bg-opacity-80 rounded-md focus:border-gray-300 border-gray-50 border focus:outline-none resize-none overflow-y-scroll scrollbar-thin scrollbar-thumb-webgencol scrollbar-track-gray-200"
                />
                <div
                  class="flex flex-row w-full justify-between items-center mt-1 mb-1 text-xs"
                >
                  <input
                    v-model="item.task_date"
                    type="date"
                    class="w-1/2 h-6 p-1 bg-white bg-opacity-80 rounded-md focus:border-gray-300 border-gray-50 border focus:outline-none"
                  />
                  <select
                    required
                    v-model="item.task_color"
                    class="p-1 w-2/5 h-6 bg-white bg-opacity-80 rounded-md focus:border-gray-300 border-gray-50 border focus:outline-none"
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
                  class="flex flex-row w-full justify-between items-center mt-2 text-2xs h-8"
                >
                  <div class="flex flex-1 justify-between h-full ml-1">
                    <div
                      v-if="taskCreateImageInfo"
                      class="flex flex-1 flex-col justify-center items-start tracking-widewide text-xs"
                    >
                      <div class="flex justify-end items-center p-px">
                        <p>{{ taskFile.name }}</p>
                        <p>&nbsp; - nazwa</p>
                      </div>
                      <div class="flex justify-end items-center p-px">
                        <p>
                          {{
                            taskFile.size / 1024 > 999
                              ? (taskFile.size / 1024 / 1024).toFixed(2) + " mb"
                              : (taskFile.size / 1024).toFixed() + " kb"
                          }}
                        </p>
                        <p>&nbsp; - rozmiar</p>
                      </div>
                    </div>
                    <div
                      v-else
                      class="h-full w-full flex justify-start items-center"
                    >
                      <div
                        class="flex justify-center items-end flex-col text-xs pr-0.5"
                      >
                        <p>Nie wybrano żadnych zdjęć</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="w-16 h-full relative rounded-lg bg-gray-300 pointer-events-auto cursor-pointer transition hover:bg-opacity-50 overflow-hidden flex justify-center items-center"
                  >
                    <span
                      class="h-full w-full flex justify-center items-center text-lg opacity-90 transition"
                      >💾</span
                    >
                    <input
                      @change="taskCreateImageInfoHandler"
                      ref="taskCreateImage"
                      id="taskCreateImage"
                      type="file"
                      accept="image/*"
                      class="opacity-0 absolute cursor-pointer p-0 top-0 bottom-0 text-xs"
                    />
                  </div>
                </div>
                <!-- <input
                    v-on:change="imageHandler"
                    ref="imageUpload"
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    class="w-full text-2xs p-0 m-1 flex justify-start items-center"
                  /> -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!--<div
      v-if="socialPost !== null"
      class="absolute top-0 bottom-0 left-0 right-1/6 bg-white bg-opacity-80 pointer-events-auto"
    ></div> -->
    <!--<div
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
    </div> -->
    <div class="flex justify-center items-start h-20">
      <div
        v-if="!tabCreateForm"
        class="flex h-12 w-10 justify-start items-center p-2 pl-4 pr-4"
      >
        <button
          @click="tabCreateHandler(true)"
          class="h-full rounded-xl bg-gray-300 opacity-80 text-white transition hover:bg-opacity-50 font-medium text-base shadow-inner flex justify-center items-center"
        >
          <span class="text-lg p-4">📁</span>
        </button>
      </div>
      <div
        v-if="tabCreateForm"
        class="pl-4 p-1.5 text-sm flex flex-col justify-center items-center"
      >
        <form
          @submit.prevent="tabCreatePush"
          class="flex flex-col justify-center items-center"
        >
          <input
            autocomplete="off"
            maxlength="50"
            required
            v-model="tabName"
            id="tabName"
            type="text"
            placeholder="Nazwa nowej tabeli"
            class="p-1.5 pr-2 pl-2 border-gray-300 border focus:outline-none resize-none rounded-lg"
          />
          <div class="flex flex-row justify-start items-center w-full mt-1">
            <button
              type="submit"
              class="rounded-lg p-1 mt-1 w-1/4 mr-1 bg-gray-300 text-white transition hover:bg-gray-200 font-medium text-sm shadow-inner"
            >
              ✔️
            </button>
            <button
              @click="tabCreateHandler(false)"
              class="rounded-lg mt-1 p-1 h w-1/4 ml-1 bg-gray-300 text-white transition hover:bg-gray-200 font-medium text-sm shadow-inner"
            >
              ✖️
            </button>
          </div>
        </form>
      </div>
      <!-- <div
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
import { defineComponent } from "vue";
import { dataStore } from "@/stores/data.js";
import { userStore } from "@/stores/user.js";
import { supabase } from "@/supabase/init.js";

export default defineComponent({
  name: "WorkPlace",
  setup() {
    const dateStor: any = dataStore();
    const userStor: any = userStore();
    const tabNameId = ref<number | null>(null);
    const tabName = ref<string | null>(null);
    const tabNameInput = ref<any>(null);
    const tabCreateForm = ref<boolean>(false);
    const taskCreateForm = ref<number | null>(null);
    const taskEditForm = ref<number | null>(null);
    const tasks = ref<any[]>();
    const taskEdited = ref<any[]>([]);
    const taskHover = ref<number | null>(null);
    const taskExtend = ref<number | null>(null);
    const taskCreateImage = ref<any>(null);
    const taskCreateImageInfo = ref<boolean>(false);
    const taskFile = ref<any>(null);
    // const imageStatus = ref<number | null>(null);
    // const ImageLoaded = ref<boolean>(false);

    //TABS

    const tabDelete = async (tabID: number) => {
      let question = window.confirm(
        "Na pewno? Danych (łącznie ze zdjęciami) nie będzie można odzyskać..."
      );
      let imagesToRemove: any = null;
      imagesToRemove = dateStor.dataTasks
        .filter((item: any) => item.task_tabid == tabID)
        .filter((item: any) => item.task_image != null)
        .map((item: any) => item.task_image);
      if (question) {
        if (imagesToRemove.length > 0) {
          for (const item of imagesToRemove) {
            try {
              const { error } = await supabase.storage
                .from("images")
                .remove([item]);
              if (error instanceof Error) throw error;
            } catch (error) {
              if (error instanceof Error) {
                console.warn(error.message);
              }
            }
          }
        }
        try {
          const err1 = await supabase
            .from("tabs_table")
            .delete()
            .eq("id", tabID);
          if (err1 instanceof Error) throw err1;
          const err2 = await supabase
            .from("tasks_table")
            .delete()
            .eq("task_tabid", tabID);
          if (err2 instanceof Error) throw err2;
        } catch (error) {
          if (error instanceof Error) {
            console.warn(error.message);
          }
        }
      } else return;
    };

    const tabNameChange = (tabID: number) => {
      dateStor.dataTabs.forEach((item: any) => {
        item.id === tabID ? (tabName.value = item.tab_name) : false;
      });
      tabNameId.value = tabID;
      setTimeout(() => {
        tabNameInput.value[0].focus();
      }, 300);
    };

    const tabNamePush = async (tabID: number) => {
      dateStor.ready = tabID;
      try {
        const { error } = await supabase
          .from("tabs_table")
          .update({ tab_name: tabName.value })
          .eq("id", tabID);
        if (error instanceof Error) throw error;
      } catch (error) {
        if (error instanceof Error) {
          console.warn(error.message);
        }
      }
      setTimeout(() => {
        tabNameId.value = null;
        dateStor.ready = null;
      }, 1200);
    };

    const tabCreateHandler = (handler: boolean) => {
      taskEditForm.value = null;
      taskExtend.value = null;
      taskCreateForm.value = null;
      tasks.value = [];
      handler === true
        ? ((tabCreateForm.value = true), (tabName.value = ""))
        : (tabCreateForm.value = false);
    };

    const tabCreatePush = async () => {
      taskEditForm.value = null;
      taskCreateForm.value = null;
      tasks.value = [];
      try {
        const { error } = await supabase.from("tabs_table").insert([
          {
            tab_name: tabName.value,
          },
        ]);
        if (error instanceof Error) throw error;
        tabCreateForm.value = false;
        tabName.value = null;
      } catch (error) {
        if (error instanceof Error) {
          console.warn(error.message);
        }
      }
    };

    // TASKS

    const taskCreateImageInfoHandler = () => {
      if (
        taskCreateImage.value[0].files[0] == null ||
        taskCreateImage.value[0].files[0] == undefined
      ) {
        taskCreateImageInfo.value = false;
        taskFile.value = null;
      } else {
        taskCreateImageInfo.value = false;
        taskCreateImageInfo.value = true;
        taskFile.value = taskCreateImage.value[0].files[0];
      }
    };

    const taskCreatePush = async (
      task: string,
      worker: string,
      desc: string,
      date: Date,
      color: number,
      tabID: number
    ) => {
      dateStor.ready = tabID;
      taskCreateForm.value = null;
      try {
        const { error } = await supabase.from("tasks_table").insert([
          {
            task_worker: worker,
            task_color: color,
            task_name: task,
            task_desc: desc,
            task_date: date,
            task_image: taskFile.value === null ? null : taskFile.value.name,
            task_tabid: tabID,
          },
        ]);
        if (error instanceof Error) throw error;
      } catch (error) {
        if (error instanceof Error) {
          console.warn(error.message);
        }
      }
      if (taskFile.value !== null && taskFile.value !== undefined) {
        try {
          const { error } = await supabase.storage
            .from("images")
            .upload(taskFile.value.name, taskFile.value);

          if (error) throw error;
        } catch (error) {
          if (error instanceof Error) {
            console.warn(error.message);
          }
        }
        taskFile.value = null;
      }
      taskCreateImageInfo.value = false;
      setTimeout(() => {
        dateStor.ready = null;
      }, 1200);
    };

    const taskCreateHandler = (tabID: number | null) => {
      taskEditForm.value = null;
      taskExtend.value = null;
      if (tabID == null) {
        taskCreateForm.value = null;
        taskCreateImageInfo.value = false;
      }
      if (taskCreateForm.value === tabID) {
        taskCreateForm.value = null;
      } else {
        taskCreateForm.value = tabID;
        tasks.value = [];
        tabCreateForm.value = false;
        if (taskCreateForm.value != null) {
          tasks.value.push({
            id: null,
            task_name: "",
            task_desc: "",
            task_date: "",
            task_worker: "",
            task_image: null,
            task_color: null,
          });
        }
      }
    };

    const taskDateChanger = (date: string) => {
      if (date !== null) {
        let dy = date.charAt(8) + date.charAt(9);
        let mon = date.charAt(5) + date.charAt(6);
        let yrr =
          date.charAt(0) + date.charAt(1) + date.charAt(2) + date.charAt(3);
        return dy + "." + mon + "." + yrr;
      } else return "Bez daty";
    };

    const taskExtendHandler = (taskID: number) => {
      taskExtend.value != taskID
        ? (taskExtend.value = taskID)
        : (taskExtend.value = null);
    };

    const taskHoverHandler = (opt: number | null) => {
      taskHover.value = opt;
    };

    const taskEditClose = () => {
      taskEditForm.value = null;
      taskEdited.value = [];
      taskCreateImageInfo.value = false;
    };

    const taskEditChange = (taskID: number) => {
      taskExtend.value = null;
      tabCreateForm.value = false;
      taskCreateForm.value = null;
      taskHover.value = null;
      taskEdited.value = [];
      if (taskEditForm.value === taskID) {
        taskEditForm.value = null;
      } else {
        taskEditForm.value = taskID;
        tasks.value = [];
        dateStor.dataTasks.forEach((item: any) => {
          if (item.id === taskID) {
            taskEdited.value.push(item);
            // fileDataTask.value =
            // item.task_image === null ? null : item.task_image;
          }
        });
      }
    };

    const taskEditPush = async (taskID: number, tabID: number) => {
      dateStor.ready = tabID;
      try {
        const { error } = await supabase
          .from("tasks_table")
          .update({
            task_worker: taskEdited.value[0].task_worker,
            task_color: taskEdited.value[0].task_color,
            task_name: taskEdited.value[0].task_name,
            task_desc: taskEdited.value[0].task_desc,
            // "task_image": fileDataTask.value === null ? null : fileDataTask.value.name,
            task_date: taskEdited.value[0].task_date,
          })
          .eq("id", taskID);
        taskExtend.value = null;
        tabCreateForm.value = false;
        // taskCreate.value = false;
        taskHover.value = null;
        taskEditForm.value = null;
        if (error instanceof Error) throw error;
      } catch (error) {
        if (error instanceof Error) {
          console.warn(error.message);
        }
      }
      // if (fileDataTask.value !== null) {
      //   try {
      //     const { errorr } = await supabase.storage
      //       .from("images")
      //       .upload(fileDataTask.value.name, fileDataTask.value);

      //     if (errorr) throw errorr;
      //   } catch (errorr) {
      //     console.log(errorr.message);
      //   }
      //   taskFile.value = null;
      // }
      taskCreateImageInfo.value = false;
      setTimeout(() => {
        dateStor.ready = null;
      }, 1200);
    };

    const taskDelete = async (taskID: number, tabID: number) => {
      dateStor.ready = tabID;
      let imageToRemove: any = null;
      imageToRemove = dateStor.dataTasks
        .filter((item: any) => item.id === taskID)
        .map((item: any) => item.task_image)[0];

      if (imageToRemove !== null) {
        try {
          const { error } = await supabase.storage
            .from("images")
            .remove([imageToRemove]);
          if (error instanceof Error) throw error;
        } catch (error) {
          if (error instanceof Error) {
            console.warn(error.message);
          }
        }
      }
      try {
        const { error } = await supabase
          .from("tasks_table")
          .delete()
          .eq("id", taskID);
        if (error instanceof Error) throw error;
      } catch (error) {
        if (error instanceof Error) {
          console.warn(error.message);
        }
      }
      setTimeout(() => {
        dateStor.ready = null;
      }, 1200);
    };

    // IMAGES

    // const imageOpen = async (taskID: number) => {
    //   ImageLoaded.value = false;
    //   imageStatus.value = taskID;
    //   let imageName: string | null = null;
    //   imageName = dateStor.dataTasks
    //     .filter((item: any) => item.id === taskID)
    //     .map((item: any) => item.task_image)[0];
    //   try {
    //     const { data: data_images, error } = await supabase.storage
    //       .from("images")
    //       .download(imageName!);
    //     if (error instanceof Error) throw error;
    //     dateStor.dataImages = URL.createObjectURL(
    //       new Blob([data_images!], { type: "image/jpeg" })
    //     );
    //     // previewImage
    //     ImageLoaded.value = true;
    //   } catch (error) {
    //     if (error instanceof Error) {
    //       console.warn(error.message);
    //     }
    //   }
    // };

    return {
      dateStor,
      userStor,
      tabNameChange,
      tabNamePush,
      tabNameInput,
      tabCreateHandler,
      tabCreatePush,
      tabDelete,
      tabNameId,
      tabName,
      tabCreateForm,
      taskCreateHandler,
      taskCreateForm,
      taskCreatePush,
      taskEditForm,
      taskEditChange,
      taskEditPush,
      taskEdited,
      taskEditClose,
      taskHoverHandler,
      taskHover,
      taskDelete,
      taskExtendHandler,
      taskExtend,
      taskDateChanger,
      tasks,
      taskFile,
      taskCreateImage,
      taskCreateImageInfoHandler,
      taskCreateImageInfo,
    };
  },
});
</script>
