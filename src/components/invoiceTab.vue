<template>
  <div class="w-full bg-gray-50 flex justify-start items-center">
    <div
      class="w-full h-full flex flex-col justify-center items-center mt-1 mb-2 pr-1"
    >
      <button
        v-if="invoiceData.length < 1"
        @click="invoiceFormHandler"
        class="bg-gray-500 p-1 pr-4 pl-4 rounded-2xl text-2sm tracking-wide mt-1 text-gray-50"
      >
        Stwórz nową fakturę
      </button>
      <form
        v-for="(invItem, index) in invoiceData"
        :key="index"
        @submit.prevent="invoiceCreate"
        class="w-full h-full flex flex-col justify-center items-center"
        action=""
      >
        <div class="text-2sm bg-gray-100 bg-opacity-50 p-4 w-full">
          <h3 class="text-2base mb-1 tracking-wide">
            Sprzedawca<span class="text-xs tracking-wide">
              (wystawiający fakturę)</span
            >
          </h3>
          <div class="pt-1 pb-1 flex justify-center items-center">
            <label class="p-1 pr-4 pl-0 w-1/5">Firma</label>
            <input
              v-model="invItem.invoicingName"
              autocomplete="off"
              maxlength="80"
              minlength="2"
              class="p-1 flex-1 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
            />
          </div>
          <div class="pt-1 pb-1 flex justify-center items-center">
            <label class="p-1 pr-4 pl-0 w-1/5">Ulica</label>
            <input
              v-model="invItem.invoicingStreet"
              autocomplete="off"
              maxlength="80"
              minlength="2"
              class="p-1 flex-1 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
            />
          </div>
          <div class="pt-1 pb-1 flex justify-center items-center">
            <label class="p-1 pr-4 pl-0 w-1/5">Adres</label>
            <input
              v-model="invItem.invoicingAddress"
              autocomplete="off"
              maxlength="80"
              minlength="2"
              class="p-1 flex-1 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
            />
          </div>
          <div class="pt-1 pb-1 flex justify-center items-center">
            <label class="p-1 pr-4 pl-0 w-1/5">NIP</label>
            <input
              v-model="invItem.invoicingNip"
              autocomplete="off"
              maxlength="80"
              minlength="2"
              class="p-1 flex-1 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
            />
          </div>
        </div>
        <div class="text-2sm bg-gray-200 bg-opacity-70 p-4 w-full">
          <h3 class="text-2base mb-1 tracking-wide">
            Nabywca
            <span class="text-xs tracking-wide"> (otrzymujący fakturę)</span>
          </h3>
          <div class="pt-1 pb-1 flex justify-center items-center">
            <label class="p-1 pr-4 pl-0 w-1/5">Firma</label>
            <input
              v-model="invItem.receivingName"
              autocomplete="off"
              maxlength="80"
              minlength="2"
              class="p-1 flex-1 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
            />
          </div>
          <div class="pt-1 pb-1 flex justify-center items-center">
            <label class="p-1 pr-4 pl-0 w-1/5">Ulica</label>
            <input
              v-model="invItem.receivingStreet"
              autocomplete="off"
              maxlength="80"
              minlength="2"
              class="p-1 flex-1 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
            />
          </div>
          <div class="pt-1 pb-1 flex justify-center items-center">
            <label class="p-1 pr-4 pl-0 w-1/5">Adres</label>
            <input
              v-model="invItem.receivingAddress"
              autocomplete="off"
              maxlength="80"
              minlength="2"
              class="p-1 flex-1 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
            />
          </div>
          <div class="pt-1 pb-1 flex justify-center items-center">
            <label class="p-1 pr-4 pl-0 w-1/5">NIP</label>
            <input
              v-model="invItem.receivingNip"
              autocomplete="off"
              maxlength="80"
              minlength="2"
              class="p-1 flex-1 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
            />
          </div>
        </div>
        <div class="text-2sm bg-gray-100 bg-opacity-50 p-4 w-full">
          <h3 class="text-2base mb-1 tracking-wide">Szczegóły faktury</h3>
          <div
            class="pt-0.5 pb-1 w-full flex flex-col justify-center items-start"
          >
            <label class="p-1 pl-0">Miejsce i data wystawienia faktury</label>
            <div class="flex justify-between items-center w-full">
              <input
                v-model="invItem.placeOfIssue"
                autocomplete="off"
                maxlength="80"
                minlength="2"
                class="p-1 flex-1 w-full pr-2 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                type="text"
              />
              <input
                v-model="invItem.dateOfIssue"
                autocomplete="off"
                maxlength="80"
                minlength="2"
                class="ml-1 p-0.75 pl-1.5 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                type="date"
              />
            </div>
          </div>
          <div
            class="pt-0.5 pb-1 w-full flex flex-col justify-center items-start"
          >
            <label class="p-1 pl-0">Termin i forma płatności</label>
            <div class="flex justify-between items-center w-full">
              <input
                v-model="invItem.dateOfPayment"
                autocomplete="off"
                maxlength="80"
                minlength="2"
                class="p-0.75 pl-1.5 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                type="date"
              />
              <select
                v-model="invItem.formOfPayment"
                autocomplete="off"
                maxlength="80"
                minlength="2"
                class="ml-1 p-1 flex-1 w-full pr-2 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              >
                <option value="Przelew">Przelew</option>
                <option value="Gotówka">Gotówka</option>
              </select>
            </div>
          </div>
          <div
            class="pt-0.5 pb-1 w-full flex flex-col justify-center items-start"
          >
            <label class="p-1 pl-0"
              >Numer faktury i data zakończenia usługi</label
            >
            <div class="flex justify-between items-center w-full">
              <input
                v-model="invItem.invoiceNumber"
                autocomplete="off"
                maxlength="80"
                minlength="2"
                class="p-0.75 pl-1.5 mr-2 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                type="text"
              />
              <input
                v-model="invItem.dateOfService"
                autocomplete="off"
                maxlength="80"
                minlength="2"
                class="p-0.75 pl-1.5 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                type="date"
              />
            </div>
          </div>
        </div>
        <div class="text-2sm bg-gray-200 bg-opacity-70 p-4 w-full">
          <form
            v-for="(servItem, index) in service"
            :key="index"
            @submit.prevent="
              serviceAdd(
                servItem.name,
                servItem.jm,
                servItem.amount,
                servItem.netPrice,
                servItem.vat,
                servItem.grossPrice,
                servItem.netValue,
                servItem.grossValue
              )
            "
          >
            <h3 class="text-2base mb-1 tracking-wide">Usługi</h3>
            <div
              v-for="(item, index) in services"
              :key="index"
              class="w-full mt-1 mb-1"
            >
              <div
                class="flex justify-between items-center w-full bg-gray-300 p-3 pt-1 pb-1 rounded-lg"
              >
                <div class="flex justify-start items-center">
                  <p>{{ item.number }}</p>
                  <p class="pl-3">{{ item.name }}</p>
                </div>
                <p class="pl-3">
                  ({{ item.netValue }}) {{ item.grossValue }} PLN
                </p>
              </div>
            </div>
            <div
              class="pt-0.5 pb-1 mt-5 w-full flex flex-col justify-center items-start"
            >
              <div class="flex justify-between items-center w-full pt-0.5 pb-1">
                <div class="p-0.75 pr-1 pl-1 mr-1 text-sm rounded-lg m-0.5">
                  <span class="w-full h-full flex justify-center items-center"
                    >{{ services.length + 1 }}.</span
                  >
                </div>
                <input
                  v-model="servItem.name"
                  autocomplete="off"
                  maxlength="80"
                  minlength="2"
                  class="p-1 pl-1.5 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                  type="text"
                  placeholder="Nazwa usługi"
                />
              </div>
              <div class="flex justify-between items-center w-full pt-0.5 pb-1">
                <input
                  v-model="servItem.jm"
                  autocomplete="off"
                  maxlength="80"
                  class="p-1 pl-1.5 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                  type="text"
                  placeholder="j.m."
                />
                <input
                  v-model="servItem.amount"
                  autocomplete="off"
                  maxlength="80"
                  class="ml-1 pl-1.5 p-1 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                  type="number"
                  placeholder="Ilość"
                />
                <input
                  v-model="servItem.netPrice"
                  autocomplete="off"
                  maxlength="80"
                  class="ml-1 pl-1.5 p-1 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                  type="number"
                  placeholder="Cena netto"
                />
              </div>
              <div class="flex justify-between items-center w-full pt-0.5 pb-1">
                <input
                  v-model="servItem.vat"
                  autocomplete="off"
                  maxlength="80"
                  class="p-1 pl-1.5 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                  type="number"
                  placeholder="VAT"
                />
                <input
                  v-model="servItem.grossPrice"
                  autocomplete="off"
                  maxlength="80"
                  class="ml-1 pl-1.5 p-1 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                  type="number"
                  placeholder="Cena brutto"
                />
              </div>
              <div class="flex justify-between items-center w-full pt-0.5 pb-1">
                <input
                  v-model="servItem.netValue"
                  autocomplete="off"
                  maxlength="80"
                  class="p-1 pl-1.5 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                  type="number"
                  placeholder="Wartość netto"
                />
                <input
                  v-model="servItem.grossValue"
                  autocomplete="off"
                  maxlength="80"
                  class="ml-1 pl-1.5 p-1 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                  type="number"
                  placeholder="Wartość brutto"
                />
              </div>
              <div
                class="flex justify-end items-center w-full mt-1 mb-1 pt-1 pb-1"
              >
                <button
                  type="submit"
                  class="bg-gray-400 p-1 pr-3 pl-3 rounded-xl text-gray-50 cursor-pointer hover:opacity-80 transition-all"
                >
                  Akceptuj
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="text-2sm bg-gray-100 bg-opacity-50 p-4 w-full">
          <div class="flex justify-between items-center">
            <h3 class="text-2base tracking-wide">Suma</h3>
            <span class="text-2base p-1">
              {{ invoiceSummary[0] ? invoiceSummary[0].sumGross : 0
              }}<span> PLN</span></span
            >
          </div>
          <div
            class="flex flex-col justify-center items-start w-full mt-1 mb-1 pt-1 pb-1"
          >
            <input
              v-model="invItem.inWords"
              autocomplete="off"
              maxlength="80"
              minlength="2"
              class="p-1 pl-1.5 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
              placeholder="Razem słownie"
            />
            <div class="flex mt-2 justify-center items-center w-full">
              <p class="pr-4 text-sm tracking-wide">Wpłata na konto</p>
              <input
                v-model="invItem.bankName"
                autocomplete="off"
                maxlength="80"
                minlength="2"
                class="p-1 flex-1 pl-1.5 w-full 2 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                type="text"
                placeholder="Nazwa banku"
              />
            </div>
            <input
              v-model="invItem.accountNumber"
              autocomplete="off"
              maxlength="80"
              minlength="2"
              class="p-1 mt-2 pl-1.5 flex-1 w-full 2 border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
              type="text"
              placeholder="Numer konta"
            />
          </div>
          <div class="flex justify-end items-center w-full mt-2 pt-1 pb-1">
            <button
              type="submit"
              class="bg-webgencol p-1 pr-3 pl-3 rounded-xl text-gray-50 cursor-pointer hover:opacity-80 transition-all"
            >
              Generuj fakturę
            </button>
          </div>
        </div>
      </form>
    </div>
    <div
      v-if="invoiceView"
      class="bg-white absolute top-[5%] right-[30%] h-[842px] w-[595px] p-10"
    >
      <div class="flex flex-col justify-start items-center w-full h-full">
        <div class="flex flex-col justify-start items-center flex-1">
          <div class="w-full flex justify-end items-center mb-3 p-1">
            <img src="../assets/wg_small.png" class="w-48" />
          </div>
          <div class="w-full flex justify-end items-center mb-2 p-1">
            <div class="w-full flex flex-col justify-start items-end">
              <div
                class="w-full flex flex-col justify-center items-start tracking-widewide"
              >
                <p class="text-2base font-medium">
                  Faktura nr:
                  <span class="font-normal pl-1">{{
                    invoiceData[0].invoiceNumber
                  }}</span>
                </p>
                <p class="text-xs font-medium">
                  Data wystawienia:
                  <span class="font-normal pl-1">{{
                    dateChanger(invoiceData[0].dateOfIssue)
                  }}</span>
                </p>
                <p class="text-xs font-medium">
                  Miejsce wystawienia:
                  <span class="font-normal pl-1">{{
                    invoiceData[0].placeOfIssue
                  }}</span>
                </p>
              </div>
            </div>
          </div>
          <div
            class="w-full flex justify-evenly items-center tracking-widewide"
          >
            <div
              class="w-full flex flex-col justify-start items-center border border-gray-300 p-0.5 mr-1"
            >
              <p class="font-medium text-sm mb-0.5 mt-0.5">Sprzedawca</p>
              <div
                class="flex flex-col justify-center items-start text-xs w-full p-1.5 pt-0.5"
              >
                <p class="pb-0.5">{{ invoiceData[0].invoicingName }}</p>
                <p class="pb-0.5">{{ invoiceData[0].invoicingStreet }}</p>
                <p class="pb-0.5">{{ invoiceData[0].invoicingAddress }}</p>
                <p>{{ invoiceData[0].invoicingNip }}</p>
              </div>
            </div>
            <div
              class="w-full flex flex-col justify-start items-center border border-gray-300 p-0.5 ml-1"
            >
              <p class="font-medium text-sm mb-0.5 mt-0.5">Nabywca</p>
              <div
                class="flex flex-col justify-center items-start text-xs w-full p-1.5 pt-0.5"
              >
                <p class="pb-0.5">{{ invoiceData[0].receivingName }}</p>
                <p class="pb-0.5">{{ invoiceData[0].receivingStreet }}</p>
                <p class="pb-0.5">{{ invoiceData[0].receivingAddress }}</p>
                <p>{{ invoiceData[0].receivingNip }}</p>
              </div>
            </div>
          </div>
          <div
            class="w-full flex flex-col justify-start items-center tracking-widewide mt-4"
          >
            <div
              class="w-full flex flex-col justify-start items-center border border-gray-300 h-full"
            >
              <div class="flex justify-start items-center text-2xs h-9 w-full">
                <div
                  class="pr-1.5 pl-1.5 border-r border-gray-300 flex justify-center items-center text-center h-full w-[3%]"
                >
                  <p>P</p>
                </div>
                <div
                  class="pr-1.5 pl-1.5 border-r border-gray-300 flex justify-center text-center items-center h-full w-[41%]"
                >
                  <p>Towar/usługa</p>
                </div>
                <div
                  class="pr-1.5 pl-1.5 border-r border-gray-300 flex justify-center text-center items-center h-full w-[7%]"
                >
                  <p>jm</p>
                </div>
                <div
                  class="pr-1.5 pl-1.5 border-r border-gray-300 flex justify-center text-center items-center h-full w-[7%]"
                >
                  <p>Ilość</p>
                </div>
                <div
                  class="pr-1.5 pl-1.5 border-r border-gray-300 text-center flex justify-center items-center h-full w-[9%]"
                >
                  <p>Cena netto</p>
                </div>
                <div
                  class="pr-1.5 pl-1.5 border-r border-gray-300 flex justify-center text-center items-center h-full w-[6%]"
                >
                  <p>VAT</p>
                </div>
                <div
                  class="pr-1.5 pl-1.5 border-r border-gray-300 text-center flex justify-center items-center h-full w-[9%]"
                >
                  <p>Cena brutto</p>
                </div>
                <div
                  class="pr-1.5 pl-1.5 border-r border-gray-300 text-center flex justify-center items-center h-full w-[9%]"
                >
                  <p>Wart. netto</p>
                </div>
                <div
                  class="pr-1.5 pl-1.5 text-center flex justify-center items-center h-full w-[9%]"
                >
                  <p>Wart. brutto</p>
                </div>
              </div>
            </div>
            <div
              class="w-full flex flex-col justify-center items-center border-b border-r border-l border-gray-300"
            >
              <div
                v-for="(it, index) in services"
                :key="index"
                class="flex justify-evenly items-center text-2xs w-full"
                :class="{
                  'h-12': it.name.length > 72,
                  'h-8': it.name.length > 35,
                  'h-6': it.name.length < 36,
                }"
              >
                <div
                  class="pr-1.5 pl-1.5 border-r border-gray-300 flex justify-center items-center text-center h-full w-[3%]"
                >
                  <p>{{ it.number }}</p>
                </div>
                <div
                  class="pr-1.5 pl-1.5 border-r border-gray-300 flex justify-center text-center items-center h-full w-[41%]"
                >
                  <p>{{ it.name }}</p>
                </div>
                <div
                  class="pr-1.5 pl-1.5 border-r border-gray-300 flex justify-center text-center items-center h-full w-[7%]"
                >
                  <p>{{ it.jm }}</p>
                </div>
                <div
                  class="pr-1.5 pl-1.5 border-r border-gray-300 flex justify-center text-center items-center h-full w-[7%]"
                >
                  <p>{{ it.amount }}</p>
                </div>
                <div
                  class="pr-1.5 pl-1.5 border-r border-gray-300 text-center flex justify-center items-center h-full w-[9%]"
                >
                  <p>{{ it.netPrice }}</p>
                </div>
                <div
                  class="pr-1.5 pl-1.5 border-r border-gray-300 flex justify-center text-center items-center h-full w-[6%]"
                >
                  <p>{{ it.vat }}</p>
                </div>
                <div
                  class="pr-1.5 pl-1.5 border-r border-gray-300 text-center flex justify-center items-center h-full w-[9%]"
                >
                  <p>{{ it.grossPrice }}</p>
                </div>
                <div
                  class="pr-1.5 pl-1.5 border-r border-gray-300 text-center flex justify-center items-center h-full w-[9%]"
                >
                  <p>{{ it.netValue }}</p>
                </div>
                <div
                  class="pr-1.5 pl-1.5 text-center flex justify-center items-center h-full w-[9%]"
                >
                  <p>{{ it.grossValue }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full flex justify-end items-end tracking-widewide mt-4">
            <div
              class="w-1/2 flex justify-end items-end tracking-widewide h-full"
            >
              <div
                class="w-full flex flex-col justify-end items-start tracking-widewide h-full"
              >
                <p class="text-xs font-medium">
                  Forma płatności:
                  <span class="font-normal pl-1">{{
                    invoiceData[0].formOfPayment
                  }}</span>
                </p>
                <p class="text-xs font-medium">
                  Termin płatności:
                  <span class="font-normal pl-1">{{
                    dateChanger(invoiceData[0].dateOfPayment)
                  }}</span>
                </p>
              </div>
            </div>
            <div
              class="w-1/2 flex flex-col justify-center items-center tracking-widewide"
            >
              <div class="flex justify-end items-center w-full">
                <p class="text-2xs tracking-widewide normal mb-1">
                  SUMA WEDŁUG STAWEK VAT W PLN
                </p>
              </div>
              <div
                class="w-full flex flex-col justify-center items-center h-full"
              >
                <div
                  class="flex justify-start items-center text-2xs w-full h-6 border"
                >
                  <div
                    class="pr-1.5 pl-1.5 border-r flex justify-center items-center text-center h-full flex-1"
                  >
                    <p>Netto</p>
                  </div>
                  <div
                    class="pr-1.5 pl-1.5 border-r flex justify-center text-center items-center h-full flex-1"
                  >
                    <p>VAT</p>
                  </div>
                  <div
                    class="pr-1.5 pl-1.5 border-r flex justify-center text-center items-center h-full flex-[2]"
                  >
                    <p>Kwota VAT</p>
                  </div>
                  <div
                    class="pr-1.5 pl-1.5 flex justify-center text-center items-center h-full flex-1"
                  >
                    <p>Brutto</p>
                  </div>
                </div>
                <div
                  class="flex justify-start items-center text-2xs w-full border-b border-r border-l h-7"
                >
                  <div
                    class="pr-1.5 pl-1.5 border-r flex justify-center items-center text-center h-full flex-1"
                  >
                    <p>{{ invoiceSummary[0].sumNet }}</p>
                  </div>
                  <div
                    class="pr-1.5 pl-1.5 border-r flex justify-center text-center items-center h-full flex-1"
                  >
                    <p>{{ invoiceSummary[0].vatPerc }}</p>
                  </div>
                  <div
                    class="pr-1.5 pl-1.5 border-r flex justify-center text-center items-center h-full flex-[2]"
                  >
                    <p>{{ invoiceSummary[0].vatAm }}</p>
                  </div>
                  <div
                    class="pr-1.5 pl-1.5 flex justify-center text-center items-center h-full flex-1"
                  >
                    <p>{{ invoiceSummary[0].sumGross }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full">
            <p class="text-xs font-medium">
              Data zakończenia usługi:
              <span class="font-normal pl-1">{{
                dateChanger(invoiceData[0].dateOfService)
              }}</span>
            </p>
          </div>
          <div class="w-full flex justify-end items-end tracking-widewide">
            <div
              class="w-1/2 flex justify-end items-end tracking-widewide h-full"
            >
              <div
                class="w-full flex flex-col justify-end items-start tracking-widewide h-full"
              >
                <p class="text-xs font-medium">Wpłata na konto:</p>
                <p class="text-xs font-normal">
                  {{ invoiceData[0].bankName }}
                </p>
                <p class="text-xs font-normal">
                  {{ invoiceData[0].accountNumber }}
                </p>
              </div>
            </div>
            <div class="w-1/2 flex flex-col justify-end items-center">
              <div class="flex justify-end items-center w-full">
                <p class="text-2xs tracking-widewide normal mb-1">
                  SUMA DO ZAPŁATY
                </p>
              </div>
              <div
                class="w-full flex flex-col justify-center items-center h-full"
              >
                <div
                  class="flex justify-start items-center text-2xs w-full h-6 border"
                >
                  <div
                    class="pr-1.5 pl-1.5 border-r flex justify-center items-center text-center h-full flex-1"
                  >
                    <p>Zapłacono</p>
                  </div>
                  <div
                    class="pr-1.5 pl-1.5 border-r flex justify-center text-center items-center h-full flex-1"
                  >
                    <p>Do zapłaty</p>
                  </div>
                  <div
                    class="pr-1.5 pl-1.5 flex justify-center text-center items-center h-full flex-1"
                  >
                    <p>Waluta</p>
                  </div>
                </div>
                <div
                  class="flex justify-start items-center text-2xs w-full border-b border-r border-l h-7"
                >
                  <div
                    class="pr-1.5 pl-1.5 border-r flex justify-center items-center text-center h-full flex-1"
                  >
                    <p>0</p>
                  </div>
                  <div
                    class="pr-1.5 pl-1.5 border-r flex justify-center text-center items-center h-full flex-1"
                  >
                    <p>{{ invoiceSummary[0].sumGross }}</p>
                  </div>
                  <div
                    class="pr-1.5 pl-1.5 flex justify-center text-center items-center h-full flex-1"
                  >
                    <p>PLN</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="w-full flex justify-end items-start tracking-widewide mt-3"
          >
            <p class="w-full text-xs font-medium">
              Razem słownie:
              <span class="font-normal pl-1"
                >{{ invoiceData[0].inWords }} PLN</span
              >
            </p>
          </div>
          <div
            class="w-full flex justify-center items-center text-2xs font-normal border-t border-gray-300 mt-3 tracking-wide"
          >
            <p class="pt-1">
              Dostawa towarów lub świadczenie usług zwolnionych od podatku VAT
              na podstawie art. 113 ust. 1 i 9 ustawy o VAT.
            </p>
          </div>
        </div>
        <div
          class="w-full mt-5 flex flex-col justify-center items-center self-end"
        >
          <div class="flex justify-around items-center w-full">
            <div
              class="flex flex-col justify-center items-center text-xs font-normal widewide"
            >
              <p class="tracking-widetest mb-1">
                ............................................
              </p>
              <p>fakturę wystawił</p>
            </div>
            <div
              class="flex flex-col justify-center items-center text-xs font-normal widewide"
            >
              <p class="tracking-widetest mb-1">
                ............................................
              </p>
              <p>fakturę odebrał</p>
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

export default defineComponent({
  name: "InvoiceTab",
  setup() {
    const invoiceView = ref<boolean>(false);
    const invoiceData = ref<any[]>([]);
    const invoiceSummary = ref<any[]>([]);
    const services = ref<any[]>([]);
    const service = ref<any[]>([]);

    const serviceAdd = (
      nam: string,
      j: string,
      am: number,
      netpr: number,
      va: number,
      grosspr: number,
      netva: number,
      grossva: number
    ) => {
      services.value.push({
        number: services.value.length + 1,
        name: nam,
        jm: j,
        amount: am,
        netPrice: netpr,
        vat: va,
        grossPrice: grosspr,
        netValue: netva,
        grossValue: grossva,
      });
      console.log(services.value);
    };

    const invoiceFormHandler = () => {
      invoiceData.value = [];
      services.value = [];
      invoiceData.value.push({
        invoicingName: "",
        invoicingStreet: "",
        invoicingAddress: "",
        invoicingNip: "",
        receivingName: "",
        receivingStreet: "",
        receivingAddress: "",
        receivingNip: "",
        placeOfIssue: "",
        dateOfIssue: "",
        dateOfPayment: "",
        formOfPayment: "",
        invoiceNumber: "",
        invoiceDate: "",
        inWords: "",
        bankName: "",
        accountNumber: "",
      });
      service.value.push({
        number: 1,
        name: "",
        jm: "",
        amount: null,
        netPrice: null,
        vat: null,
        grossPrice: null,
        netValue: null,
        grossValue: null,
      });
    };

    const invoiceCreate = () => {
      invoiceView.value = true;
      let sumnet = services.value
        .map((item: any) => item.netValue)
        .reduce((a: number, b: number) => a + b);
      let sumgross = services.value
        .map((item: any) => item.grossValue)
        .reduce((a: number, b: number) => a + b);
      invoiceSummary.value = [];
      invoiceSummary.value.push({
        sumNet: sumnet,
        sumGross: sumgross,
        vatPerc: 0,
        vatAm: 0,
      });
      console.log(invoiceData.value);
      console.log(services.value);
    };

    const dateChanger = (date: string) => {
      if (date !== null) {
        let dy = date.charAt(8) + date.charAt(9);
        let mon = date.charAt(5) + date.charAt(6);
        let yrr =
          date.charAt(0) + date.charAt(1) + date.charAt(2) + date.charAt(3);
        return dy + "." + mon + "." + yrr;
      } else return "Bez daty";
    };

    return {
      serviceAdd,
      service,
      services,
      invoiceFormHandler,
      invoiceData,
      invoiceCreate,
      invoiceView,
      invoiceSummary,
      dateChanger,
    };
  },
});
</script>
