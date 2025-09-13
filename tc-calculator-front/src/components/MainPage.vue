<template>
  <div class="container my-4" v-if="hasDealId">
    <GeneralFields
        :state="isGeneralDataLoading"
        :client="client"
        :cities="dictionaries.cities"
        :packages="dictionaries.packages"
        :standards="dictionaries.standards"
        :boxes="client.boxes"
        @refresh="fetchAllData"/>

    <!-- Delivery company tables -->
    <div v-if="isCalculating">
      <!-- SAMPLE -->
      <div v-if="isGeneralDataLoading">Загрузка...</div>
      <div v-if="errorGeneralData" class="text-danger">{{ errorTextSamples }}</div>
      <div class="mb-5" v-show="!errorTextSamples && !isSamplesLoading">
        <h4>Доставка образца</h4>
        <DeliveryTable
            :rows="options.sample.door2door"
            tableName="Доставка Дверь -> Дверь"
            @select="sampleSetOption"
        />
        <DeliveryTable
            :rows="options.sample.door2store"
            tableName="Доставка Дверь -> Склад"
            @select="sampleSetOption"
        />
        <DeliveryTable
            :rows="options.sample.store2door"
            tableName="Доставка Склад -> Дверь"
            @select="sampleSetOption"
        />
        <DeliveryTable
            :rows="options.sample.store2store"
            tableName="Доставка Склад -> Склад"
            @select="sampleSetOption"
        />
      </div>

      <!-- PACKAGE -->
      <div v-if="isPackagesLoading">Загрузка...</div>
      <div v-if="errorTextPackages" class="text-danger">{{ errorTextPackages }}</div>
      <div class="mb-5" v-show="!errorTextPackages && !isPackagesLoading">
        <h4>Доставка тиража</h4>
        <DeliveryTable
            :rows="options.package.door2door"
            tableName="Доставка Дверь -> Дверь"
            @select="packageSetOption"
        />
        <DeliveryTable
            :rows="options.package.door2store"
            tableName="Доставка Дверь -> Склад"
            @select="packageSetOption"
        />
        <DeliveryTable
            :rows="options.package.store2door"
            tableName="Доставка Склад -> Дверь"
            @select="packageSetOption"
        />
        <DeliveryTable
            :rows="options.package.store2store"
            tableName="Доставка Склад -> Склад"
            @select="packageSetOption"
        />
      </div>
    </div>

    <!-- HISTORY -->
    <div class="mb-5">
      <h4>Оформленные заказы</h4>
      <OrdersTable
          :rows="orders"
          tableName="Оформленные заказы"
          @select="cancelOrder"
      />
    </div>

    <!-- SAVE SCREENSHOT -->
    <div class="mb-5">
      <button class="btn btn-warning btn-lg"
              @click="saveScreenshot">
        Сохранить цены
      </button>
    </div>
  </div>

  <div class="container my-4" v-else>
    <h4>Не передан ID сделки, страница не будет отображена</h4>
  </div>
</template>

<script>
import GeneralFields from "./GeneralFields.vue";
import DeliveryTable from "./DeliveryTable.vue";
import OrdersTable from "./OrdersTable.vue";

export default {
  name: "MainPage",
  components: {OrdersTable, DeliveryTable, GeneralFields},
  data() {
    return {
      // component
      isGeneralDataLoading: false,
      errorGeneralData: null,
      isCalculating: false,
      isSamplesLoading: false,
      isPackagesLoading: false,
      errorTextSamples: null,
      errorTextPackages: null,
      hasDealId: false,
      dealId: null,
      // data
      dictionaries: {
        cities: [],
        packages: [],
        standards: []
      },
      client: {
        deliveryDate: '',
        measures: '',
        standard: '',
        amount: '',
        package: '',
        address: {
          zipCode: '',
          city: '',
          street: '',
          building: '',
        },
        boxes: [],
        comments: ''
      },
      options: {
        sample: {
          door2door: [],
          door2store: [],
          store2door: [],
          store2store: [],
        },
        package: {
          door2door: [],
          door2store: [],
          store2door: [],
          store2store: []
        },
      },
      orders: [
        {
          company: "СДЭК",
          deliveryTime: "1 д",
          extras: 360,
          tariff: "Экспресс",
          base: 400,
          pickup: 50,
          sms: 20,
          insurance: 0,
          total: 470,
          margin: "10%",
          clientPrice: 517,
          trackNumber: 123,
          invoice: "http://google.com",
          remarks: "Как можно быстрее",
          deliveryStatus: "Оформлен"
        },
      ],
    }
  },
  async mounted() {
    const params = new URLSearchParams(window.location.search);
    this.hasDealId = params.has('deal_id');

    if (this.hasDealId) {
      this.dealId = params.get('deal_id');
      await this.fetchOptions();
      await this.fetchGeneralData(this.dealId);
    }
  },
  methods: {
    async fetchOptions() {
      try {
        this.isGeneralDataLoading = true;
        this.errorGeneralData = null;

        const response = await fetch(`http://localhost:3000/api/dictionaries`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        });

        if (!response.ok) {
          this.errorGeneralData = response.data;
          return;
        }

        this.dictionaries = await response.json();
      } catch (e) {
        console.error(e);
      } finally {
        this.isGeneralDataLoading = false;
      }
    },
    async fetchGeneralData(dealId) {
      try {
        this.isGeneralDataLoading = true;
        this.errorGeneralData = null;
        const response = await fetch(`http://localhost:3000/api/deals/${dealId}`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({})
        });

        if (!response.ok) {
          this.errorGeneralData = response.data;
          return;
        }

        this.client = await response.json();
      } catch (e) {
        console.error(e);
      } finally {
        this.isGeneralDataLoading = false;
      }
    },
    async fetchSamplesData() {
      this.isSamplesLoading = true;
      this.errorTextSamples = null;

      const response = await fetch('http://localhost:3000/api/calculations/sample', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      });

      if (!response.ok) {
        this.errorTextSamples = response.data;
        this.isSamplesLoading = false;
        return;
      }

      setTimeout(async function (data) {
        data.isSamplesLoading = false;
        data.options.sample = await response.json();
      }, 3000, this);
    },
    async fetchPackagesData() {
      this.isPackagesLoading = true;
      this.errorTextPackages = null;

      const response = await fetch('http://localhost:3000/api/calculations/package', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      });

      if (!response.ok) {
        this.errorTextPackages = response.data;
        this.isPackagesLoading = false;
        return;
      }

      setTimeout(async function (data) {
        data.isPackagesLoading = false;
        data.options.package = await response.json();
      }, 3000, this);
    },
    async fetchAllData() {
      await this.fetchSamplesData();
      await this.fetchPackagesData();
    },
    sampleSetOption(row) {
      alert(`выбрана опция: ${row.company} - ${row.tariff}`);
    },
    packageSetOption(row) {
      alert(`выбрана опция: ${row.company} - ${row.tariff}`);
    },
    cancelOrder(row) {
      alert(`Заказ отменен: ${row.company} - ${row.tariff}`);
    },
    saveScreenshot() {
      alert('Скриншот сохранен по адресу: http://google.com');
    }
  }
};
</script>