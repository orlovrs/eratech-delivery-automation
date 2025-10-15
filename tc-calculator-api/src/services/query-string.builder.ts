export class QueryStringBuilder {
    static assemble(params: { [key: string]: string | number }, apiKey: string) {
        return Object.keys(params)
            .sort()
            .map((key: string) =>
                encodeURIComponent(key) + '=' + encodeURIComponent(params[key]!)
            )
            .join('&');
    }
}