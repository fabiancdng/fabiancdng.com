import { ISbStories, getStoryblokApi } from '@storyblok/react';
import { GetServerSideProps } from 'next';
import GetCurrentTimestamp from '../utils/get-time-stamp';
import { IsbTags } from '../types';

const getPageAndPostSlugs = async () => {
  interface Link {
    id: number;
    slug: string;
    name: string;
    is_folder: boolean;
    parent_id: number;
    published: boolean;
    path: string;
    position: number;
    uuid: string;
    is_startpage: boolean;
    real_path: string;
  }

  interface LinksData {
    links: {
      [key: string]: Link;
    };
  }

  const slugs: string[] = [];

  // Get possible slugs from Storyblok.
  const storyblokApi = getStoryblokApi();
  let { data }: { data: LinksData } = await storyblokApi.get('cdn/links/', {
    version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
    excluding_slugs: 'blog/',
  });

  const skipPageSlugs = ['home', 'legal-notice', 'privacy-policy'];

  // Go through each link and add it to the array of paths.
  Object.keys(data.links).forEach((linkKey) => {
    // Skip folders and home page.
    if (
      data.links[linkKey].is_folder ||
      data.links[linkKey].is_startpage ||
      skipPageSlugs.includes(data.links[linkKey].slug)
    ) {
      return;
    }

    // Split nested links into array.
    const slug = data.links[linkKey].slug;

    slugs.push(slug);
  });

  return slugs;
};

const getTagSlugs = async () => {
  // Get all tags from Storyblok.
  const storyblokApi = getStoryblokApi();
  const { data: tags }: IsbTags = await storyblokApi.get(`cdn/tags`, {
    starts_with: 'blog/',
  });

  return tags.tags.map((tag) => 'blog/tags/' + tag.name);
};

const getBlogPostPaginationSlugs = async () => {
  const POSTS_PER_PAGE = process.env.POSTS_PER_PAGE
    ? parseInt(process.env.POSTS_PER_PAGE)
    : 15;

  const storyblokApi = getStoryblokApi();

  // Calculate how many blog posts there are by counting all links starting with 'blog/'.
  const { data: blogPostLinks }: ISbStories = await storyblokApi.get(
    `cdn/links`,
    {
      starts_with: 'blog/',
      version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
      excluding_slugs: 'blog/', // Don't query the blog overview page.
    }
  );

  const slugs: string[] = [];

  // Total count of blog posts in Storyblok.
  const blogPostTotalCount = Object.keys(blogPostLinks.links).length - 1; // -1 because the blog overview page is also counted.

  // Total number of overview pages (including the index page).
  const totalPages = Math.ceil(blogPostTotalCount / Number(POSTS_PER_PAGE));

  for (let page = 2; page < totalPages + 1; page++) {
    slugs.push('blog/posts/' + page.toString());
  }

  return slugs;
};

const generateSiteMap = (slugs: string[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Manual URLs known upfront -->
     <url>
       <loc>${process.env.NEXT_PUBLIC_DOMAIN}</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_DOMAIN}/blog</loc>
     </url>

     <!-- Dynamic map -->
     ${slugs
       .map((slug) => {
         return `
       <url>
           <loc>${`${process.env.NEXT_PUBLIC_DOMAIN}/${slug}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
};

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // We make an API call to gather the URLs for our site
  const pageAndPostSlugs = await getPageAndPostSlugs();
  const blogPostPaginationSlugs = await getBlogPostPaginationSlugs();
  const tagSlugs = await getTagSlugs();

  // Log the time on the server when the function is called.
  console.log(
    `[${GetCurrentTimestamp()}] getServerSideProps() executing for sitemap.xml.`
  );

  // Merge the slugs into one array.
  const slugs = [...blogPostPaginationSlugs, ...pageAndPostSlugs, ...tagSlugs];

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(slugs);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;