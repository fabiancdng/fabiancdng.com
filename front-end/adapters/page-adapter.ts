import qs from "qs";
import HomePageData from "../types/pages/homepage";

/**
 * Class for making requests related to pages to the CMS and retrieving data.
 */
class PageAdapter {
    /**
     * URL of the CMS.
     */
    private STRAPI_URL: string|undefined;

    /**
     * Access token needed to access the CMS's API.
     */
    private STRAPI_ACCESS_TOKEN: string|undefined;

    /**
     * Constructor for the PageAdapter class.
     */
    constructor(STRAPI_URL: string|undefined, STRAPI_ACCESS_TOKEN: string|undefined) {
        this.STRAPI_URL = STRAPI_URL;
        this.STRAPI_ACCESS_TOKEN = STRAPI_ACCESS_TOKEN;
    }

    public getHomePageData(): Promise<HomePageData> {
        // Querystring holding the fields to populate.
        const querystring = qs.stringify({
            populate: {
            // Populate DZ 'content'.
            content: {
                populate: [
                '*',
                'logo',
                'links',
                'projects',
                'projects.languages',
                ]
            }
            }
        }, {
            encodeValuesOnly: true,
        });

        return new Promise(async (resolve, reject) => {
            // Retrieve homepage data (& content) from CMS.
            const homepageDataRequest = await fetch(this.STRAPI_URL + '/api/homepage?' + querystring, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.STRAPI_ACCESS_TOKEN,
                }
            });

            // Parse JSON response and return relevant data.
            const homepageDataRaw = await homepageDataRequest.json();
            const data: HomePageData = homepageDataRaw.data.attributes;

            // TODO: Add error handling.

            // Resolve promise and return data.
            resolve(data);
        });
    }
}

export default PageAdapter;