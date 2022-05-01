import qs from "qs";
import HomePageData from "../types/pages/homepage";

/**
 * Class for making requests related to pages to the CMS and retrieving data.
 */
class PageAdapter {
    /**
     * URL of the CMS.
     */
    private CMS_URL: string|undefined;

    /**
     * Access token needed to access the CMS's API.
     */
    private CMS_ACCESS_TOKEN: string|undefined;

    /**
     * Constructor for the PageAdapter class.
     */
    constructor(CMS_URL: string|undefined, CMS_ACCESS_TOKEN: string|undefined) {
        this.CMS_URL = CMS_URL;
        this.CMS_ACCESS_TOKEN = CMS_ACCESS_TOKEN;
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
            const homepageDataRequest = await fetch(this.CMS_URL + '/api/homepage?' + querystring, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.CMS_ACCESS_TOKEN,
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