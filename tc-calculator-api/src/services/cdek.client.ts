export class CdekClient {
    private baseUrl = "https://api.edu.cdek.ru";
    private grantType = 'client_credentials';
    private clientId = 'wqGwiQx0gg8mLtiEKsUinjVSICCjtTEP';
    private clientSecret = 'RmAmgvSgSl1yirlz9QupbzOJVqhCxcP5';

    private byCityNameUrl = '/v2/location/suggest/cities';
    private zipCodesUrl = '/v2/location/postalcodes';
    private tariffsUrl = '/v2/calculator/alltariffs';
    private tokenUrl = '/v2/oauth/token';
    private tariffsAndServices = '/v2/calculator/tariffAndService';

    private token;

    public async getToken() {
        const params = new URLSearchParams({
            grant_type: this.grantType,
            client_id: this.clientId,
            client_secret: this.clientSecret,
        });

        const response = await fetch(`${this.baseUrl}${this.tokenUrl}?${params.toString()}`, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error('Could not get CDEK token');
        }

        const json = await response.json();
        return json.access_token;
    }

    async findByCityAndZipCode(city: string, zipCode: number) {
        this.token = await this.getToken();
        const params = new URLSearchParams({ name: city });

        let response = await fetch(`${this.baseUrl}${this.byCityNameUrl}?${params.toString()}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error received: ${await response.text()}`);
        }

        let possibleCities = await response.json();
        if (possibleCities.length == 0) {
            throw new Error(`Cannot find city by name ${city}`);
        }

        let zipCodes;
        for (let pc of possibleCities) {
            const params = new URLSearchParams({ code: pc.code });
            response = await fetch(`${this.baseUrl}${this.zipCodesUrl}?${params.toString()}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error received: ${await response.text()}`);
            }

            const j = await response.json();
            zipCodes = j.postal_codes;
            if (zipCodes && zipCodes.indexOf(zipCode.toString()) != -1) {
                return pc;
            }
        }
        throw new Error(`Cannot find zip code ${zipCode} in city ${city}`);
    }

    async getDeliveryOptions(
        fromCity: any,
        toCity: any,
        hasInsurance: boolean,
        smsPhone: any,
        packages: any
    ) {
        this.token = await this.getToken();

        const services = [];
        if (hasInsurance) {
            services.push({
                code: "INSURANCE",
                parameter: 5000
            });
        }
        if (smsPhone) {
            // services.push({
            //     code: "SMS",
            //     parameter: smsPhone
            // });
        }
        let response = await fetch(`${this.baseUrl}${this.tariffsAndServices}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from_location: fromCity,
                to_location: toCity,
                services,
                packages: packages.packages.map(p => {
                    return {
                        weight: p.weight * 1000,
                        length: p.length,
                        width: p.width,
                        height: p.height
                    }
                })
            })
        });
        return await response.json();
    }

    async getDeliveryTariffs() {
        this.token = await this.getToken();
        let response = await fetch(`${this.baseUrl}${this.tariffsUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.token}`,
            }
        });
        return await response.json();
    }
}
