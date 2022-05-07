import GhostContentAPI, { PostOrPage } from '@tryghost/content-api';
import { GetServerSideProps } from 'next';
import { env } from 'process';
import PageAdapter from '../adapters/page-adapter';
import WebsiteAdapter from '../adapters/website-adapter';
import Header from '../components/Header/Header';
import PageTemplateData from '../types/page-template';
import StaticsData from '../types/statics';

interface PageProps {
    page: PostOrPage,
    template: PageTemplateData,
    statics: StaticsData,
}

/**
 * Custom Page component.
 * Gets the page content from Ghost by its slug (if it exists).
 */
const Page = ({ page, template, statics }: PageProps) => {
    /**
     * The page content (HTML).
     */
    var pageContent = String(page.html);

    return (
        <>
        {JSON.stringify(template.pageHeader)}
            <Header
                data={ template.pageHeader }
                statics={ statics }
            />
            <h1>{ page.title }</h1>
            <div dangerouslySetInnerHTML={{ __html: pageContent }}></div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // The slug of this page.
    const pageSlug = String(context.query.slug);

    const {
        GHOST_URL,
        GHOST_CONTENT_API_KEY,
        STRAPI_URL,
        STRAPI_ACCESS_TOKEN,
    } = env;

    // Initialize GhostContentAPI.
    const ghost = new GhostContentAPI({
        url: GHOST_URL ? GHOST_URL : '',
        key: GHOST_CONTENT_API_KEY ? GHOST_CONTENT_API_KEY : '',
        version: 'v3',
    });

    let pageData;
    // Try to get page from Ghost by slug.
    try {
        pageData = await ghost.pages.read({
            slug: pageSlug,
        });
    } catch(error) {
        // Return 404 page if the page doesn't exist.
        return {
            notFound: true,
        }
    }

    // Get website metadata from Strapi.
    const websiteAdapter = new WebsiteAdapter(STRAPI_URL, STRAPI_ACCESS_TOKEN);
    const websiteMetaData = await websiteAdapter.getWebsiteMetaData();

    // Get the template for a custom page from Strapi.
    const pageAdapter = new PageAdapter(STRAPI_URL, STRAPI_ACCESS_TOKEN);
    const pageTemplate = await pageAdapter.getPageTemplate();

    const statics: StaticsData = {
        STRAPI_URL: String(STRAPI_URL),
        website: websiteMetaData,
    }
    
    // Pass the page metadata and content from Ghost.
    return {
        props: {
            page: pageData,
            template: pageTemplate,
            statics,
        },
    };
}

export default Page;