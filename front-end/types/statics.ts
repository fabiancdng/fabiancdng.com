import { WebsiteMetaData } from './website-meta-data';

/**
 * Statics (like configuration values) to be passed to the components.
 */
export default interface StaticsData {
    CMS_URL: string,
    website: WebsiteMetaData,
}