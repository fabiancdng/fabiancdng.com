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
import hljs from 'highlight.js';
import Link from 'next/link';

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
     * The post content as string (HTML).
     */
    var postContent = String(post.html);

    useEffect(() => {
        // Initialize Highlight.js.
        hljs.highlightAll();
    }, []);

    return (
        <div className="container pt-32 px-7 mx-auto mb-20 max-w-5xl text-black dark:text-white">
            { post.primary_tag
                && <div className="mb-5">
                    <Link href={ '/blog/tag/' + post.primary_tag.slug }>
                        <a className="text-blue-800 pl-1 font-semibold text-lg dark:text-slate-400">
                            { post.primary_tag.name?.toUpperCase() }
                        </a>
                    </Link>
                </div>
            }

            <h1 className="text-5xl font-semibold">{ post.title }</h1>

            { post.custom_excerpt
                && <p className="my-7 text-xl text-gray-500 dark:text-gray-300">{ post.custom_excerpt }</p>
            }

            <div className="flex items-center my-8">
                <img
                className="w-12 h-12 -translate-y-0.5 mr-2 rounded-full"
                src={ String(post.primary_author?.profile_image) }
                alt={ post.primary_author?.name + '\'s profile picture' }
                />
                <div>
                <h3 className="text-lg font-medium leading-3">{ post.primary_author?.name }</h3>
                <p className="text-gray-600 text-md dark:text-slate-400">{ new Date(String(post.published_at)).toLocaleString('en-US', { dateStyle: "long" }) }</p>
                </div>
            </div>

            <img
                className="w-full my-5 rounded-lg"
                src={ String(post.feature_image) }
                alt={ String(post.feature_image_alt) }
            />

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
    const [currentURL, setCurrentURL] = useState('');

    useEffect(() => {
        // Set initial state.
        setCurrentURL(window.location.href);
        setContentComponents(template.content);
    }, []);

    return (
        <>
            <Head>
                <title>{ post.title + ' | Blog | ' + statics.website.name }</title>
                <link
                    rel="icon"
                    href={ statics.STRAPI_URL + statics.website.favicon.data.attributes.url }
                    type={ statics.website.favicon.data.attributes.mime }
                />
                <meta name="description" content={ post.meta_description ? post.meta_description : post.excerpt } />
                <link rel="canonical" href={ currentURL } />
                <meta property="og:site_name" content={ "Blog | " + statics.website.name } />
                <meta property="og:title" content={ post.title } />
                <meta property="og:description" content={ post.meta_description ? post.meta_description : post.excerpt } />
                <meta property="og:url" content={ currentURL } />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={ String(post.feature_image) } />
                <meta property="article:published_time" content={ String(post.published_at) } />
                <meta property="article:modified_time" content={ String(post.updated_at) } />
                { post.primary_tag !== undefined && <meta property="article:tag" content={ post.primary_tag?.name } /> }
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
        version: 'v4',
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
        url: String(GHOST_URL),
        key: String(GHOST_CONTENT_API_KEY),
        version: 'v4',
    });

    let postData;
    // Try to get post from Ghost by slug.
    try {
        postData = await ghost.posts.read({
            // Query post by slug.
            slug: postSlug
        }, {
            // Include tag and author fields.
            include: ['authors', 'tags'],
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