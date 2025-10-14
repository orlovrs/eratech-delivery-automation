<template>
  <div class="container my-4" v-show="hasDealId">
    <GeneralFields
        :state="isGeneralDataLoading"
        :client="client"
        :cities="dictionaries.cities"
        :packages="dictionaries.packages"
        :standards="dictionaries.standards"
        :boxes="client.boxes.package"
        :from-address="info.fromAddress"
        :is-active="canFetchTariffs"
        @get-tariffs="fetchAllData"/>

    <!-- Delivery company tables -->
    <div v-show="!isTariffsLoading && !isPackagesLoading && isCalculated">
      <!-- SAMPLE -->
      <div v-show="errorTextSample" class="text-danger">{{ errorTextSample }}</div>
      <div class="mb-5" v-show="errorTextSample !== '' && !isTariffsLoading">
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
      <div v-show="errorTextPackages" class="text-danger">{{ errorTextPackages }}</div>
      <div class="mb-5" v-show="errorTextPackages != null && !isTariffsLoading">
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

  <div class="container my-4" v-show="!hasDealId">
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
      errorGeneralData: '',
      isCalculated: false,
      isTariffsLoading: false,
      isPackagesLoading: false,
      errorTextSample: '',
      errorTextPackages: '',
      hasDealId: false,
      dealId: '',
      // data
      dictionaries: {
        cities: [],
        packages: [],
        standards: []
      },
      client: {
        deliveryDate: '',
        sendSample: '',
        standard: '',
        amount: '',
        phone: '',
        package: '',
        address: {
          zipCode: '',
          city: '',
          street: '',
          building: '',
        },
        boxes: {
          package: [],
          sample: []
        },
        comments: '',
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
      info: {
        fromAddress: {
          addressLine: '',
          zipCode: '',
          city: ''
        },
        defaultMargin: ''
      }
    }
  },

  async mounted() {
    const params = new URLSearchParams(window.location.search);
    this.hasDealId = params.has('deal_id');

    if (this.hasDealId) {
      this.dealId = params.get('deal_id');
      await this.fetchOptions();
      await this.fetchGeneralData(this.dealId);
      await this.fetchInfo();
    }
  },

  computed: {
    canFetchTariffs: {
      get() {
        return this.info.fromAddress.zipCode && this.info.fromAddress.city
            && this.client.address.zipCode && this.client.address.city
            && !this.isTariffsLoading && !this.isPackagesLoading;
      }
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

        const json = await response.json();
        this.dictionaries = json;
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

        const json = await response.json();
        this.client = json;
      } catch (e) {
        console.error(e);
      } finally {
        this.isGeneralDataLoading = false;
      }
    },
    async fetchInfo() {
      try {
        this.isGeneralDataLoading = true;
        this.errorGeneralData = null;
        const response = await fetch(`http://localhost:3000/api/info`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        });

        if (!response.ok) {
          this.errorGeneralData = response.data;
          return;
        }

        const json = await response.json();
        this.info = json;
      } catch (e) {
        console.error(e);
      } finally {
        this.isGeneralDataLoading = false;
      }
    },
    async fetchSamplesData() {
      this.isTariffsLoading = true;
      this.errorTextSample = '';

      const response = await fetch('http://localhost:3000/api/calculations/package', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          from: this.info.fromAddress,
          to: this.client.address,
          phone: this.client.phone,
          packages: this.client.boxes.sample || [],
        })
      });

      const resJson = await response.json();
      if (!response.ok) {
        this.errorTextSample = resJson.error;
      } else {
        this.options.sample = resJson;
      }

      this.isTariffsLoading = false;
      this.isCalculated = true;
    },

    async fetchPackagesData() {
      this.isPackagesLoading = true;
      this.errorTextPackages = '';

      const response = await fetch('http://localhost:3000/api/calculations/package', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          from: this.info.fromAddress,
          to: this.client.address,
          phone: this.client.phone,
          packages: this.client.boxes.package || [],
        })
      });

      const resJson = await response.json();
      if (!response.ok) {
        this.errorTextPackages = resJson.error;
      } else {
        Object.keys(resJson).forEach(k => {
          resJson[k] = resJson[k].map(o => {
            return {
              ...o,
              margin: this.info.defaultMargin
            }
          })
        });
        this.options.package = resJson;
      }

      this.isPackagesLoading = false;
      this.isCalculated = true;
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