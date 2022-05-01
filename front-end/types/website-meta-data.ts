import ImageData from "./image";

/**
 * Meta information about a website from the CMS.
 */
export interface WebsiteMetaData {
    data: {
        id: number,
        attributes: {
            name: string,
            createdAt: string,
            updatedAt: string,
            favicon: {
                data: ImageData,
            },
        }
    },
    meta: {},
}