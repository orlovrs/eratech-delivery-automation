"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryStringBuilder = void 0;
class QueryStringBuilder {
    static assemble(params, apiKey) {
        return Object.keys(params)
            .sort()
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
            .join('&');
    }
}
exports.QueryStringBuilder = QueryStringBuilder;
//# sourceMappingURL=query-string.builder.js.map