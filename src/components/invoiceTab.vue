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
                v-model="invItem.dateOfpayment"
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
                <option value="">Przelew</option>
                <option value="">Gotówka</option>
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
                v-model="invItem.invoiceDate"
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
                <p class="pl-3">{{ item.grossValue }} PLN</p>
              </div>
            </div>
            <div
              class="pt-0.5 pb-1 mt-5 w-full flex flex-col justify-center items-start"
            >
              <div class="flex justify-between items-center w-full pt-0.5 pb-1">
                <label class="p-1 pl-0 pr-4 text-sm"
                  >{{ services.length + 1 }}.
                </label>
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
                  type="text"
                  placeholder="Ilość"
                />
                <input
                  v-model="servItem.netPrice"
                  autocomplete="off"
                  maxlength="80"
                  class="ml-1 pl-1.5 p-1 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                  type="text"
                  placeholder="Cena netto"
                />
              </div>
              <div class="flex justify-between items-center w-full pt-0.5 pb-1">
                <input
                  v-model="servItem.vat"
                  autocomplete="off"
                  maxlength="80"
                  class="p-1 pl-1.5 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                  type="text"
                  placeholder="VAT"
                />
                <input
                  v-model="servItem.grossPrice"
                  autocomplete="off"
                  maxlength="80"
                  class="ml-1 pl-1.5 p-1 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                  type="text"
                  placeholder="Cena brutto"
                />
              </div>
              <div class="flex justify-between items-center w-full pt-0.5 pb-1">
                <input
                  v-model="servItem.netValue"
                  autocomplete="off"
                  maxlength="80"
                  class="p-1 pl-1.5 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                  type="text"
                  placeholder="Wartość netto"
                />
                <input
                  v-model="servItem.grossValue"
                  autocomplete="off"
                  maxlength="80"
                  class="ml-1 pl-1.5 p-1 flex-1 w-full border-gray-200 border focus:outline-none focus:border-gray-300 resize-none rounded-lg"
                  type="text"
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
            <span class="text-2base"> 320<span> PLN</span></span>
          </div>
          <div
            class="flex flex-col justify-center items-start w-full mt-1 mb-1 pt-1 pb-1"
          >
            <div class="flex mt-1 justify-center items-center w-full">
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
              type="number"
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
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";
import { dataStore } from "@/stores/data.js";

export default defineComponent({
  name: "InvoiceTab",
  setup() {
    const dateStor: any = dataStore();

    const invoiceData = ref<any[]>([]);
    const services = ref<any[]>([]);

    const service = ref<any[]>([]);

    const serviceAdd = (
      nam: any,
      j: any,
      am: any,
      netpr: any,
      va: any,
      grosspr: any,
      netva: any,
      grossva: any
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
        dateOfpayment: "",
        formOfPayment: "",
        invoiceNumber: "",
        invoiceDate: "",
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
      console.log(invoiceData.value);
      console.log(services.value);
    };

    return {
      serviceAdd,
      service,
      services,
      invoiceFormHandler,
      invoiceData,
      invoiceCreate,
    };
  },
});
</script>
