export default (await import('vue')).defineComponent({
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
            if (!row.total || isNaN(row.total))
                return '-';
            return Math.round((row.total * (1 + row.margin / 100)) * 100) / 100;
        }
    },
    computed: {
        minTotalClientPrice() {
            const prices = this.rows.map(r => this.totalPrice(r));
            return Math.min(...prices);
        }
    }
});
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.h6, __VLS_elements.h6)({});
(__VLS_ctx.tableName);
// @ts-ignore
[tableName,];
__VLS_asFunctionalElement(__VLS_elements.table, __VLS_elements.table)({
    ...{ class: "table table-bordered table-light" },
});
__VLS_asFunctionalElement(__VLS_elements.thead, __VLS_elements.thead)({});
__VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({});
for (const [row, idx] of __VLS_getVForSourceType((__VLS_ctx.rows))) {
    // @ts-ignore
    [rows,];
    __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({
        key: (idx),
        ...{ class: ({ 'table-warning': __VLS_ctx.totalPrice(row) <= __VLS_ctx.minTotalClientPrice }) },
    });
    // @ts-ignore
    [totalPrice, minTotalClientPrice,];
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (row.company);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (row.tariff);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (row.deliveryTime);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (row.base);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (row.sms);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (row.insurance);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (row.total);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (row.margin);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (__VLS_ctx.totalPrice(row));
    // @ts-ignore
    [totalPrice,];
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.$emit('select', row);
                // @ts-ignore
                [$emit,];
            } },
        ...{ class: "btn btn-outline-primary btn-sm" },
    });
}
/** @type {__VLS_StyleScopedClasses['table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-bordered']} */ ;
/** @type {__VLS_StyleScopedClasses['table-light']} */ ;
/** @type {__VLS_StyleScopedClasses['table-warning']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
var __VLS_dollars;
let __VLS_self;
