export default (await import('vue')).defineComponent({
    name: "GeneralFields",
    props: [
        "state",
        "client",
        "cities",
        "packages",
        "standards",
        "boxes",
        "fromAddress",
        "isActive",
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
        },
        hasAddresses() {
            return !!this.client.address.zipCode && !!this.client.address.city
                && !!this.fromAddress.zipCode && !!this.fromAddress.city;
        }
    }
});
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mb-5" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.state) }, null, null);
// @ts-ignore
[vShow, state,];
__VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
    ...{ class: "mb-4" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.state) }, null, null);
// @ts-ignore
[vShow, state,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mb-3" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "d-flex gap-2" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "text",
    ...{ class: "form-control" },
    placeholder: "Индекс",
    value: (__VLS_ctx.fromAddress.zipCode),
    ...{ style: {} },
});
// @ts-ignore
[fromAddress,];
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ class: "form-control" },
});
(__VLS_ctx.fromAddress.city);
// @ts-ignore
[fromAddress,];
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "text",
    ...{ class: "form-control" },
    placeholder: "Улица",
    value: (__VLS_ctx.fromAddress.addressLine),
});
// @ts-ignore
[fromAddress,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mb-3" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "date",
    ...{ class: "form-control" },
});
(__VLS_ctx.formattedDeliveryDate);
// @ts-ignore
[formattedDeliveryDate,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mb-3" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "p-2 border rounded bg-light mb-2" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
(__VLS_ctx.boxes.totalBoxes);
// @ts-ignore
[boxes,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
(__VLS_ctx.boxes.totalWeight);
// @ts-ignore
[boxes,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
(__VLS_ctx.boxes.totalVolumeM3);
// @ts-ignore
[boxes,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ class: "btn btn-outline-primary btn-sm mb-2" },
    type: "button",
    'data-bs-toggle': "collapse",
    'data-bs-target': "#boxesTable",
    'aria-expanded': "false",
    'aria-controls': "boxesTable",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "collapse" },
    id: "boxesTable",
});
__VLS_asFunctionalElement(__VLS_elements.table, __VLS_elements.table)({
    ...{ class: "table table-sm table-bordered" },
});
__VLS_asFunctionalElement(__VLS_elements.thead, __VLS_elements.thead)({
    ...{ class: "table-light" },
});
__VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({});
for (const [pkg, index] of __VLS_getVForSourceType((__VLS_ctx.boxes.packages))) {
    // @ts-ignore
    [boxes,];
    __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({
        key: (index),
    });
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (index + 1);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (pkg.weight);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (pkg.width);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (pkg.length);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (pkg.height);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (pkg.volume.cm3);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (pkg.volume.m3);
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mb-3" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    ...{ class: "form-control" },
    value: (__VLS_ctx.client.standard),
});
// @ts-ignore
[client,];
for (const [option] of __VLS_getVForSourceType((__VLS_ctx.standards))) {
    // @ts-ignore
    [standards,];
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        key: (option.id),
        value: (option.value),
    });
    (option.value);
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mb-3" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "text",
    ...{ class: "form-control" },
    value: (__VLS_ctx.client.amount),
});
// @ts-ignore
[client,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mb-3" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    ...{ class: "form-control" },
    value: (__VLS_ctx.client.package),
});
// @ts-ignore
[client,];
for (const [option] of __VLS_getVForSourceType((__VLS_ctx.packages))) {
    // @ts-ignore
    [packages,];
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        key: (option.id),
        value: (option.value),
    });
    (option.value);
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mb-3" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "d-flex gap-2" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "text",
    ...{ class: "form-control" },
    placeholder: "Индекс",
    value: (__VLS_ctx.client.address.zipCode),
    ...{ style: {} },
});
// @ts-ignore
[client,];
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    ...{ class: "form-control" },
    value: (__VLS_ctx.client.address.city),
});
// @ts-ignore
[client,];
for (const [option] of __VLS_getVForSourceType((__VLS_ctx.cities))) {
    // @ts-ignore
    [cities,];
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        key: (option.id),
        value: (option.value),
    });
    (option.value);
}
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "text",
    ...{ class: "form-control" },
    placeholder: "Улица",
    value: (__VLS_ctx.client.address.street),
});
// @ts-ignore
[client,];
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "text",
    ...{ class: "form-control" },
    placeholder: "Дом",
    value: (__VLS_ctx.client.address.building),
    ...{ style: {} },
});
// @ts-ignore
[client,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mb-3" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.textarea, __VLS_elements.textarea)({
    ...{ class: "form-control" },
    value: (__VLS_ctx.client.comments),
});
// @ts-ignore
[client,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mb-3" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('getTariffs');
            // @ts-ignore
            [$emit,];
        } },
    type: "button",
    ...{ class: "btn btn-primary" },
    disabled: (!__VLS_ctx.isActive),
});
// @ts-ignore
[isActive,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.hasAddresses) }, null, null);
// @ts-ignore
[vShow, hasAddresses,];
/** @type {__VLS_StyleScopedClasses['mb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-light']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['collapse']} */ ;
/** @type {__VLS_StyleScopedClasses['table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['table-bordered']} */ ;
/** @type {__VLS_StyleScopedClasses['table-light']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
let __VLS_self;
