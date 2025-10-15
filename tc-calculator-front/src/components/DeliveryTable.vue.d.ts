declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    tableName: StringConstructor;
    rows: {
        type: ArrayConstructor;
        required: true;
    };
    margin: NumberConstructor;
}>, {}, {}, {
    minTotalClientPrice(): number;
}, {
    totalPrice(row: any): number | "-";
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    tableName: StringConstructor;
    rows: {
        type: ArrayConstructor;
        required: true;
    };
    margin: NumberConstructor;
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
