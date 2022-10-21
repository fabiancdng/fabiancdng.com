/**
 * Data of an image from the CMS.
 */
export default interface ImageData {
    id: number,
    attributes: {
        name: string,
        alternativeText: string,
        caption: string,
        width: number,
        height: number,
        formats: {
            [key: string]: {
                name: string,
                hash: string,
                ext: string,
                mime: string,
                path?: string,
                width: number,
                height: number,
                size: number,
                url: string
            }
        }|null,
        hash: string,
        ext: string,
        mime: string,
        size: number,
        url: string,
        createdAt: string,
        updatedAt: string,
    }
}