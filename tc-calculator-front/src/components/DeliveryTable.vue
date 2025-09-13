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
      <th>Доп. услуги, ₽</th>
      <th>Итого, ₽</th>
      <th>Наценка %</th>
      <th>Цена клиента ₽</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row, idx) in rows" :key="idx">
      <td>{{ row.company }}</td>
      <td>{{ row.tariff }}</td>
      <td>{{ row.deliveryTime }}</td>
      <td>{{ row.base }}</td>
      <td>{{ row.sms }}</td>
      <td>{{ row.insurance }}</td>
      <td>{{ row.extras }}</td>
      <td>{{ row.total }}</td>
      <td>{{ row.margin }}</td>
      <td>{{ row.clientPrice }}</td>
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
    }
  }
};
</script>