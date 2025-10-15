import GeneralFields from "./GeneralFields.vue";
import DeliveryTable from "./DeliveryTable.vue";
import OrdersTable from "./OrdersTable.vue";
export default (await import('vue')).defineComponent({
    name: "MainPage",
    components: { OrdersTable, DeliveryTable, GeneralFields },
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
        };
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
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!response.ok) {
                    this.errorGeneralData = response.data;
                    return;
                }
                const json = await response.json();
                this.dictionaries = json;
            }
            catch (e) {
                console.error(e);
            }
            finally {
                this.isGeneralDataLoading = false;
            }
        },
        async fetchGeneralData(dealId) {
            try {
                this.isGeneralDataLoading = true;
                this.errorGeneralData = null;
                const response = await fetch(`http://localhost:3000/api/deals/${dealId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({})
                });
                if (!response.ok) {
                    this.errorGeneralData = response.data;
                    return;
                }
                const json = await response.json();
                this.client = json;
            }
            catch (e) {
                console.error(e);
            }
            finally {
                this.isGeneralDataLoading = false;
            }
        },
        async fetchInfo() {
            try {
                this.isGeneralDataLoading = true;
                this.errorGeneralData = null;
                const response = await fetch(`http://localhost:3000/api/info`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!response.ok) {
                    this.errorGeneralData = response.data;
                    return;
                }
                const json = await response.json();
                this.info = json;
            }
            catch (e) {
                console.error(e);
            }
            finally {
                this.isGeneralDataLoading = false;
            }
        },
        async fetchSamplesData() {
            this.isTariffsLoading = true;
            this.errorTextSample = '';
            const response = await fetch('http://localhost:3000/api/calculations/package', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
            }
            else {
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
                headers: { 'Content-Type': 'application/json' },
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
            }
            else {
                Object.keys(resJson).forEach(k => {
                    resJson[k] = resJson[k].map(o => {
                        return {
                            ...o,
                            margin: this.info.defaultMargin
                        };
                    });
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
});
const __VLS_ctx = {};
let __VLS_elements;
const __VLS_componentsOption = { OrdersTable, DeliveryTable, GeneralFields };
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "container my-4" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.hasDealId) }, null, null);
// @ts-ignore
[vShow, hasDealId,];
const __VLS_0 = {}.GeneralFields;
/** @type {[typeof __VLS_components.GeneralFields, ]} */ ;
// @ts-ignore
GeneralFields;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onGetTariffs': {} },
    state: (__VLS_ctx.isGeneralDataLoading),
    client: (__VLS_ctx.client),
    cities: (__VLS_ctx.dictionaries.cities),
    packages: (__VLS_ctx.dictionaries.packages),
    standards: (__VLS_ctx.dictionaries.standards),
    boxes: (__VLS_ctx.client.boxes.package),
    fromAddress: (__VLS_ctx.info.fromAddress),
    isActive: (__VLS_ctx.canFetchTariffs),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onGetTariffs': {} },
    state: (__VLS_ctx.isGeneralDataLoading),
    client: (__VLS_ctx.client),
    cities: (__VLS_ctx.dictionaries.cities),
    packages: (__VLS_ctx.dictionaries.packages),
    standards: (__VLS_ctx.dictionaries.standards),
    boxes: (__VLS_ctx.client.boxes.package),
    fromAddress: (__VLS_ctx.info.fromAddress),
    isActive: (__VLS_ctx.canFetchTariffs),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
const __VLS_6 = ({ getTariffs: {} },
    { onGetTariffs: (__VLS_ctx.fetchAllData) });
// @ts-ignore
[isGeneralDataLoading, client, client, dictionaries, dictionaries, dictionaries, info, canFetchTariffs, fetchAllData,];
var __VLS_3;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.isTariffsLoading && !__VLS_ctx.isPackagesLoading && __VLS_ctx.isCalculated) }, null, null);
// @ts-ignore
[vShow, isTariffsLoading, isPackagesLoading, isCalculated,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "text-danger" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.errorTextSample) }, null, null);
// @ts-ignore
[vShow, errorTextSample,];
(__VLS_ctx.errorTextSample);
// @ts-ignore
[errorTextSample,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mb-5" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.errorTextSample !== '' && !__VLS_ctx.isTariffsLoading) }, null, null);
// @ts-ignore
[vShow, isTariffsLoading, errorTextSample,];
__VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({});
const __VLS_8 = {}.DeliveryTable;
/** @type {[typeof __VLS_components.DeliveryTable, ]} */ ;
// @ts-ignore
DeliveryTable;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onSelect': {} },
    rows: (__VLS_ctx.options.sample.door2door),
    tableName: "Доставка Дверь -> Дверь",
}));
const __VLS_10 = __VLS_9({
    ...{ 'onSelect': {} },
    rows: (__VLS_ctx.options.sample.door2door),
    tableName: "Доставка Дверь -> Дверь",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
const __VLS_14 = ({ select: {} },
    { onSelect: (__VLS_ctx.sampleSetOption) });
// @ts-ignore
[options, sampleSetOption,];
var __VLS_11;
const __VLS_16 = {}.DeliveryTable;
/** @type {[typeof __VLS_components.DeliveryTable, ]} */ ;
// @ts-ignore
DeliveryTable;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ 'onSelect': {} },
    rows: (__VLS_ctx.options.sample.door2store),
    tableName: "Доставка Дверь -> Склад",
}));
const __VLS_18 = __VLS_17({
    ...{ 'onSelect': {} },
    rows: (__VLS_ctx.options.sample.door2store),
    tableName: "Доставка Дверь -> Склад",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
const __VLS_22 = ({ select: {} },
    { onSelect: (__VLS_ctx.sampleSetOption) });
// @ts-ignore
[options, sampleSetOption,];
var __VLS_19;
const __VLS_24 = {}.DeliveryTable;
/** @type {[typeof __VLS_components.DeliveryTable, ]} */ ;
// @ts-ignore
DeliveryTable;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    ...{ 'onSelect': {} },
    rows: (__VLS_ctx.options.sample.store2door),
    tableName: "Доставка Склад -> Дверь",
}));
const __VLS_26 = __VLS_25({
    ...{ 'onSelect': {} },
    rows: (__VLS_ctx.options.sample.store2door),
    tableName: "Доставка Склад -> Дверь",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
let __VLS_28;
let __VLS_29;
const __VLS_30 = ({ select: {} },
    { onSelect: (__VLS_ctx.sampleSetOption) });
// @ts-ignore
[options, sampleSetOption,];
var __VLS_27;
const __VLS_32 = {}.DeliveryTable;
/** @type {[typeof __VLS_components.DeliveryTable, ]} */ ;
// @ts-ignore
DeliveryTable;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    ...{ 'onSelect': {} },
    rows: (__VLS_ctx.options.sample.store2store),
    tableName: "Доставка Склад -> Склад",
}));
const __VLS_34 = __VLS_33({
    ...{ 'onSelect': {} },
    rows: (__VLS_ctx.options.sample.store2store),
    tableName: "Доставка Склад -> Склад",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
let __VLS_36;
let __VLS_37;
const __VLS_38 = ({ select: {} },
    { onSelect: (__VLS_ctx.sampleSetOption) });
// @ts-ignore
[options, sampleSetOption,];
var __VLS_35;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "text-danger" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.errorTextPackages) }, null, null);
// @ts-ignore
[vShow, errorTextPackages,];
(__VLS_ctx.errorTextPackages);
// @ts-ignore
[errorTextPackages,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mb-5" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.errorTextPackages != null && !__VLS_ctx.isTariffsLoading) }, null, null);
// @ts-ignore
[vShow, isTariffsLoading, errorTextPackages,];
__VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({});
const __VLS_40 = {}.DeliveryTable;
/** @type {[typeof __VLS_components.DeliveryTable, ]} */ ;
// @ts-ignore
DeliveryTable;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    ...{ 'onSelect': {} },
    rows: (__VLS_ctx.options.package.door2door),
    tableName: "Доставка Дверь -> Дверь",
}));
const __VLS_42 = __VLS_41({
    ...{ 'onSelect': {} },
    rows: (__VLS_ctx.options.package.door2door),
    tableName: "Доставка Дверь -> Дверь",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
let __VLS_44;
let __VLS_45;
const __VLS_46 = ({ select: {} },
    { onSelect: (__VLS_ctx.packageSetOption) });
// @ts-ignore
[options, packageSetOption,];
var __VLS_43;
const __VLS_48 = {}.DeliveryTable;
/** @type {[typeof __VLS_components.DeliveryTable, ]} */ ;
// @ts-ignore
DeliveryTable;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    ...{ 'onSelect': {} },
    rows: (__VLS_ctx.options.package.door2store),
    tableName: "Доставка Дверь -> Склад",
}));
const __VLS_50 = __VLS_49({
    ...{ 'onSelect': {} },
    rows: (__VLS_ctx.options.package.door2store),
    tableName: "Доставка Дверь -> Склад",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
let __VLS_52;
let __VLS_53;
const __VLS_54 = ({ select: {} },
    { onSelect: (__VLS_ctx.packageSetOption) });
// @ts-ignore
[options, packageSetOption,];
var __VLS_51;
const __VLS_56 = {}.DeliveryTable;
/** @type {[typeof __VLS_components.DeliveryTable, ]} */ ;
// @ts-ignore
DeliveryTable;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    ...{ 'onSelect': {} },
    rows: (__VLS_ctx.options.package.store2door),
    tableName: "Доставка Склад -> Дверь",
}));
const __VLS_58 = __VLS_57({
    ...{ 'onSelect': {} },
    rows: (__VLS_ctx.options.package.store2door),
    tableName: "Доставка Склад -> Дверь",
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
let __VLS_60;
let __VLS_61;
const __VLS_62 = ({ select: {} },
    { onSelect: (__VLS_ctx.packageSetOption) });
// @ts-ignore
[options, packageSetOption,];
var __VLS_59;
const __VLS_64 = {}.DeliveryTable;
/** @type {[typeof __VLS_components.DeliveryTable, ]} */ ;
// @ts-ignore
DeliveryTable;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    ...{ 'onSelect': {} },
    rows: (__VLS_ctx.options.package.store2store),
    tableName: "Доставка Склад -> Склад",
}));
const __VLS_66 = __VLS_65({
    ...{ 'onSelect': {} },
    rows: (__VLS_ctx.options.package.store2store),
    tableName: "Доставка Склад -> Склад",
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
let __VLS_68;
let __VLS_69;
const __VLS_70 = ({ select: {} },
    { onSelect: (__VLS_ctx.packageSetOption) });
// @ts-ignore
[options, packageSetOption,];
var __VLS_67;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mb-5" },
});
__VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({});
const __VLS_72 = {}.OrdersTable;
/** @type {[typeof __VLS_components.OrdersTable, ]} */ ;
// @ts-ignore
OrdersTable;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    ...{ 'onSelect': {} },
    rows: (__VLS_ctx.orders),
    tableName: "Оформленные заказы",
}));
const __VLS_74 = __VLS_73({
    ...{ 'onSelect': {} },
    rows: (__VLS_ctx.orders),
    tableName: "Оформленные заказы",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
let __VLS_76;
let __VLS_77;
const __VLS_78 = ({ select: {} },
    { onSelect: (__VLS_ctx.cancelOrder) });
// @ts-ignore
[orders, cancelOrder,];
var __VLS_75;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mb-5" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.saveScreenshot) },
    ...{ class: "btn btn-warning btn-lg" },
});
// @ts-ignore
[saveScreenshot,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "container my-4" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.hasDealId) }, null, null);
// @ts-ignore
[vShow, hasDealId,];
__VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({});
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['my-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-danger']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-danger']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-warning']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['my-4']} */ ;
var __VLS_dollars;
let __VLS_self;
