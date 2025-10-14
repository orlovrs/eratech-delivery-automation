<template>
  <h6>{{ tableName }}</h6>
  <table class="table table-bordered table-light">
    <thead>
    <tr>
      <th>Перевозчик</th>
      <th>Тариф / Код</th>
      <th>Срок доставки</th>
      <th>Доставка, ₽</th>
      <th>СМС, ₽</th>
      <th>Страховка, ₽</th>
      <th>Итого, ₽</th>
      <th>Наценка</th>
      <th>Цена клиента, ₽</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="(row, idx) in rows"
        :key="idx"
        :class="{ 'table-warning': totalPrice(row) <= minTotalClientPrice }">
      <td>{{ row.company }}</td>
      <td>{{ row.tariff }}</td>
      <td>{{ row.deliveryTime }}</td>
      <td>{{ row.base }}</td>
      <td>{{ row.sms }}</td>
      <td>{{ row.insurance }}</td>
      <td>{{ row.total }}</td>
      <td>{{ row.margin }}%</td>
      <td>{{ totalPrice(row) }}</td>
      <td>
        <button class="btn btn-outline-primary btn-sm"
                @click="$emit('select', row)">
          Выбрать доставку
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "DeliveryTable",
  props: {
    tableName: String,
    rows: {
      type: Array,
      required: true
    },
    margin: Number
  },
  methods: {
    totalPrice(row) {
      if (!row.total || isNaN(row.total)) return '-';
      return Math.round((row.total * (1 + row.margin / 100)) * 100) / 100;
    }
  },
  computed: {
    minTotalClientPrice() {
      const prices = this.rows.map(r => this.totalPrice(r))
      return Math.min(...prices);
    }
  }
};
</script>