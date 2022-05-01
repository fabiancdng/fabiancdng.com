import WebsiteMetaData from "../types/website-meta-data";

/**
 * Class for making general requests related to the entire site to the CMS and retrieving data.
 */
class WebsiteAdapter {
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

    public getWebsiteMetaData(): Promise<WebsiteMetaData> {
        return new Promise(async (resolve, reject) => {
            const websiteMetaDataRequest = await fetch(this.CMS_URL + '/api/website?populate=*', {
                method: 'GET',
                headers: {
                'Authorization': 'Bearer ' + this.CMS_ACCESS_TOKEN,
                }
              });

            // Retrieve website metadata from CMS.
            const websiteMetaDataRaw = await websiteMetaDataRequest.json();
            const websiteMetaData: WebsiteMetaData = websiteMetaDataRaw.data.attributes;

            // TODO: Add error handling.

            // Resolve promise and return data.
            resolve(websiteMetaData);
        });
    }
}

export default WebsiteAdapter;