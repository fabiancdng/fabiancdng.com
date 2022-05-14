import GhostContentAPI, { PostOrPage } from '@tryghost/content-api';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { env } from 'process';
import { useEffect, useState } from 'react';
import PageAdapter from '../../adapters/page-adapter';
import WebsiteAdapter from '../../adapters/website-adapter';
import { PageTemplate } from '../../types/templates';
import StaticsData from '../../types/statics';
import { renderComponent } from '../../utils/dynamic-component';

interface BlogPostProps {
    post: PostOrPage,
    template: PageTemplate,
    statics: StaticsData,
}

/**
 * Component to be intercepted to "opt-out" of Strapi and use data from Ghost.
 */
const BlogPostContent = ({ post }: { post: PostOrPage }) => {
    /**
     * The page content (HTML).
     */
    var postContent = String(post.html);

    return (
        <div className="container pt-32 mx-auto mb-20 px-7 max-w-6xl text-black dark:text-white">
            <h1 className="text-5xl font-semibold">{ post.title }</h1>
            <div
                className="ghost-css"
                id="ghost-page"
                dangerouslySetInnerHTML={{ __html: postContent }}
            />
        </div>
    );
}

/**
 * Custom BlogPost component.
 * Gets the post content from Ghost by its slug (if it exists).
 */
const BlogPost = ({ post, template, statics }: BlogPostProps) => {
    const [contentComponents, setContentComponents] = useState<any>([]);

    useEffect(() => {
      setContentComponents(template.content);
    }, []);

    return (
        <>
            <Head>
                <title>{ post.title + ' | ' + statics.website.name }</title>
                <link
                    rel="icon"
                    href={ statics.STRAPI_URL + statics.website.favicon.data.attributes.url }
                    type={ statics.website.favicon.data.attributes.mime }
                />
            </Head>
            <div className="bg-white dark:bg-slate-900">
                {
                    contentComponents.map((component: any, index: number) => (
                        component['__component'] === 'adapters.ghost-post' ? <BlogPostContent key={ index } post={ post } /> : renderComponent(component, index, statics)
                    ))
                }
            </div>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    /**
     * The list of available paths to return.
     */
    const paths: string[] = [];

    const {
        GHOST_URL,
        GHOST_CONTENT_API_KEY
    } = env;

    // Initialize GhostContentAPI.
    const ghost = new GhostContentAPI({
        url: String(GHOST_URL),
        key: String(GHOST_CONTENT_API_KEY),
        version: 'v4.46',
    });

    // Get list of all posts from Ghost.
    // TODO: Don't get full post, only list of slugs is necessary.
    const posts = await ghost.posts.browse({
        include: 'authors',
    });

    // Go through each post and add its slug to the list of available paths.
    posts.forEach((post: PostOrPage) => {
        const postSlug = '/blog/' + post.slug;
        paths.push(postSlug);
    });

    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    /**
     * The slug of this post/page.
     */
    const postSlug = String(context.params?.slug);

    const {
        GHOST_URL,
        GHOST_CONTENT_API_KEY,
        STRAPI_URL,
        STRAPI_ACCESS_TOKEN,
    } = env;

    // Get website metadata from Strapi.
    const websiteAdapter = new WebsiteAdapter(STRAPI_URL, STRAPI_ACCESS_TOKEN);
    const websiteMetaData = await websiteAdapter.getWebsiteMetaData();

    // Get the template for a custom page from Strapi.
    const pageAdapter = new PageAdapter(STRAPI_URL, STRAPI_ACCESS_TOKEN);
    const postTemplate = await pageAdapter.getBlogPostTemplate();

    const statics: StaticsData = {
        STRAPI_URL: String(STRAPI_URL),
        website: websiteMetaData,
    }

    // Initialize GhostContentAPI.
    const ghost = new GhostContentAPI({
        url: GHOST_URL ? GHOST_URL : '',
        key: GHOST_CONTENT_API_KEY ? GHOST_CONTENT_API_KEY : '',
        version: 'v4.46',
    });

    let postData;
    // Try to get post from Ghost by slug.
    try {
        postData = await ghost.posts.read({
            slug: postSlug,
        });
    } catch(error) {
        // Return 404 page if the post doesn't exist.
        return {
            notFound: true,
        }
    }

    // Pass the page metadata and content from Ghost.
    return {
        props: {
            post: postData,
            template: postTemplate,
            statics,
        },
        revalidate: 1800, // seconds
    };
}

export default BlogPost;