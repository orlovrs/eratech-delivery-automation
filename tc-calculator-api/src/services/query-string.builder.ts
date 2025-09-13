export class QueryStringBuilder {
    static assemble(params: { [key: string]: string | number }, apiKey: string) {
        return Object.keys(params)
            .sort()
            .map(key =>
                encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
            )
            .join('&');
    }
}