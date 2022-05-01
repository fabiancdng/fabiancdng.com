import ImageData from "./image";

/**
 * Meta information about a website from the CMS.
 */
export default interface WebsiteMetaData {
    name: string,
    createdAt: string,
    updatedAt: string,
    favicon: {
        data: ImageData,
    },
}