<template>
  <div class="mb-5" v-if="state">Загружаем данные сделки...</div>
  <form class="mb-4" v-else>
    <div class="mb-3">
      <label class="form-label">Дата забора (отгрузки):</label>
      <input type="date" class="form-control" v-model="formattedDeliveryDate"/>
    </div>
    <div class="mb-3">
      <label class="form-label">Габариты и вес</label>
      <div class="p-2 border rounded bg-light mb-2">
        <div><strong>Всего коробок:</strong> {{ boxes.totalBoxes }}</div>
        <div><strong>Общий вес:</strong> {{ boxes.totalWeight }} кг</div>
        <div><strong>Общий объем:</strong> {{ boxes.totalVolumeM3 }} м³</div>
      </div>
      <button
          class="btn btn-outline-primary btn-sm mb-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#boxesTable"
          aria-expanded="false"
          aria-controls="boxesTable"
      >
        Показать/Скрыть детали
      </button>
      <div class="collapse" id="boxesTable">
        <table class="table table-sm table-bordered">
          <thead class="table-light">
          <tr>
            <th>#</th>
            <th>Вес, кг</th>
            <th>Ширина, см</th>
            <th>Длина, см</th>
            <th>Высота, см</th>
            <th>Объем, см³</th>
            <th>Объем, м³</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(pkg, index) in boxes.packages" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ pkg.weight }}</td>
            <td>{{ pkg.width }}</td>
            <td>{{ pkg.length }}</td>
            <td>{{ pkg.height }}</td>
            <td>{{ pkg.volume.cm3 }}</td>
            <td>{{ pkg.volume.m3 }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label">Стандарт изделия:</label>
      <select class="form-control" v-model="client.standard">
        <option v-for="option in standards" :key="option.id" :value="option.value">
          {{ option.value }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Тираж (кол-во пар):</label>
      <input type="text" class="form-control" v-model="client.amount"/>
    </div>
    <div class="mb-3">
      <label class="form-label">Упаковка:</label>
      <select class="form-control" v-model="client.package">
        <option v-for="option in packages" :key="option.id" :value="option.value">
          {{ option.value }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Адрес клиента:</label>
      <div class="d-flex gap-2">
        <input type="text" class="form-control" placeholder="Индекс" v-model="client.address.zipCode"
               style="width: 80px"/>
        <select class="form-control" v-model="client.address.city">
          <option v-for="option in cities" :key="option.id" :value="option.value">
            {{ option.value }}
          </option>
        </select>
        <input type="text" class="form-control" placeholder="Улица" v-model="client.address.street"/>
        <input type="text" class="form-control" placeholder="Дом" v-model="client.address.building"
               style="width: 80px"/>
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label">Примечание для ТК:</label>
      <textarea class="form-control" v-model="client.comments"></textarea>
    </div>
    <button
        type="button"
        class="btn btn-primary"
        @click="$emit('refresh')"
    >
      Обновить данные
    </button>
  </form>
</template>
<script>
export default {
  name: "GeneralFields",
  props: [
    "state",
    "client",
    "cities",
    "packages",
    "standards",
    "boxes"
  ],
  computed: {
    formattedDeliveryDate: {
      get() {
        const [day, month, year] = this.client.deliveryDate.split('.');
        return `${year}-${month}-${day}`;
      },
      set(value) {
        const [year, month, day] = value.split('-');
        this.client.deliveryDate = `${day}.${month}.${year}`;
      }
    }
  }
}
</script>