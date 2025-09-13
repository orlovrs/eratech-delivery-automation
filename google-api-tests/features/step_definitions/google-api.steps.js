const assert = require('assert');
const {Given, When, Then} = require('@cucumber/cucumber');
const axios = require("axios");
const config = require("../../config");

function getDefaultJson() {
    return {
        amount: 100,
        standard: "Высокий спортивный стандарт",
        hasPackage: true,
        isSample: false
    }
}

Given('запрос с дефолтными параметрами', function () {
    this.json = getDefaultJson();
});

Given('в теле запроса не передано свойство {string}', async function (key) {
    this.json = {
        amount: 90, standard: "Высокий спортивный стандарт", hasPackage: true, isSample: false
    };
    delete this.json[key];
});

Given('запрос на тираж {int} экземпляров', function (amount) {
    this.json.amount = amount;
});

Given('стандарт изделий {string}', function (standard) {
    this.json.standard = standard;
});

Given('упаковка {string}', function (hasPackage) {
    this.json.hasPackage = hasPackage == 'true' || hasPackage == 'false'
        ? hasPackage == 'true'
        : this.json.hasPackage = hasPackage;
});

Given('образец выставлен в {string}', function (isSample) {
    this.json.isSample = isSample == 'true';
});

When(
    'я посылаю запрос для рассчета количества позиций',
    {timeout: config.requestTimeout},
    async function () {
        this.response = await axios.post(
            config.url,
            this.json, {
                timeout: config.requestTimeout
            }
        );
        await this.attach(
            JSON.stringify({
                method: 'POST',
                url: config.url,
                body: this.json
            }, null, 2),
            'application/json'
        );
        await this.attach(
            JSON.stringify({
                status: `${this.response.status} (${this.response.statusText})`,
                body: this.response.data
            }, null, 2),
            'application/json'
        )
    });

Then('приходит ответ с кодом {int}', function (statusCode) {
    assert.equal(
        this.response.status,
        statusCode,
        `Ожидали получить код ${statusCode}, получили - ${this.response.status}`
    );
});

Then('в теле ответа содержится ошибка {string}', async function (errorText) {
    const json = this.response.data;
    assert.equal(
        json.error,
        errorText,
        `Ожидали получить ошибку ${errorText}, получили - ${json.error}`
    );
});

Then('в теле ответа {int} коробки', function (boxesAmount) {
    const json = this.response.data;
    assert.equal(
        json.totalBoxes,
        boxesAmount,
        `Ожидали получить ${boxesAmount} коробок, получили - ${json.totalBoxes}`
    );
    assert.equal(
        json.packages.length,
        boxesAmount,
        `Массив с деталями коробок содержит ${json.packages.length} элементов, а должно быть - ${boxesAmount}`
    )
});

Then('суммарный вес посылок {float}', function (weight) {
    const json = this.response.data;
    assert.equal(
        json.totalWeight,
        weight,
        `Ожидали получить вес ${weight}, получили - ${json.totalWeight}`
    );
});

Then('подсчет выполнен для тиража {int}', function (nearestBoxesAmount) {
    const json = this.response.data;
    assert.equal(
        json.calculationForAmount,
        nearestBoxesAmount,
        `Ожидали получить рассчет для ${nearestBoxesAmount} коробок, получили для ${json.calculationForAmount}`
    );
});