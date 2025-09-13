export class GoogleClient {
    private appScriptUrl = "https://script.google.com/macros/s/AKfycbwkgjRlXuWxrDf5FLCwYZmvBCUOJFXqyqc8qkKK5b8Sg99yOw_IxXQ6KTv0cVDxSQjYtQ/exec";

    constructor() {
    }

    public async getBoxesDetails(amount, standard, hasPackage, isSample): Promise<any> {
        const response = await fetch(this.appScriptUrl, {
            method: 'POST',
            body: JSON.stringify({
                amount,
                standard,
                hasPackage,
                isSample
            })
        });

        if (!response.ok) {
            throw new Error('Could not get boxes details');
        }

        return await response.json();
    }
}
