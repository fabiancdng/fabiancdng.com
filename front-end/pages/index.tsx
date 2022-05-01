import type { NextPage } from 'next';
import { env } from 'process';
import { useEffect, useState } from 'react';
import qs from 'qs';
import Head from 'next/head';
import React from 'react';
import { renderComponent } from '../utils/dynamic-component';
import GhostContentAPI, { PostOrPage } from "@tryghost/content-api";
import staticsData from '../types/statics';
import { WebsiteMetaData } from '../types/website-meta-data';

/**
 * Data (& content) for the homepage from CMS.
 */
interface HomePageData {
  title: string,
  content: never[],
  updatedAt: string,
  createdAt: string,
  publishedAt: string,
  blogPosts: PostOrPage[],
}

/**
 * Props for the Home component.
 */
interface HomeProps {
  data: HomePageData,
  statics: staticsData,
}

const Home: NextPage<HomeProps> = ({ data, statics }: HomeProps) => {
  const [contentComponents, setContentComponents] = useState([]);

  useEffect(() => {
    setContentComponents(data.content);
  }, []);

  return (
    <>
      <Head>
        <title>{ data.title + ' | ' + statics.website.name }</title>
        <link
          rel="icon"
          href={ statics.CMS_URL + statics.website.favicon.data.attributes.url }
          type={ statics.website.favicon.data.attributes.mime }
        />
      </Head>

      {
        // Render all known dynamic components from the CMS data.
        contentComponents.map((component, index) => renderComponent(component, index, statics))
      }
    </>
  );
};

export async function getServerSideProps() {
  const { CMS_URL, CMS_ACCESS_TOKEN } = env;

  // Retrieve website metadata from CMS on the server side.
  const websiteMetaDataRequest = await fetch(CMS_URL + '/api/website?populate=*', {
    method: 'GET',
    headers: {
    'Authorization': 'Bearer ' + CMS_ACCESS_TOKEN,
    }
  });

  const websiteMetaDataRaw = await websiteMetaDataRequest.json();
  const websiteMetaData: WebsiteMetaData = websiteMetaDataRaw.data.attributes;

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

  // Retrieve homepage data (& content) from CMS on the server side.
  const homepageDataRequest = await fetch(CMS_URL + '/api/homepage?' + querystring, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + CMS_ACCESS_TOKEN,
    }
  });

  // Parse JSON response and get relevant data.
  const homepageDataRaw = await homepageDataRequest.json();
  const data: HomePageData = homepageDataRaw.data.attributes;
  
  // Initialize Ghost Content API.
  const ghostContentAPI = new GhostContentAPI({
    url: 'https://blog.fabiancdng.com',
    key: '230342eab24d14ef2f58f0fa21',
    version: "v3"
  });

  // Retrieve blog posts from Ghost.
  const blogPosts = await ghostContentAPI.posts.browse({ limit: 'all' });
  data.blogPosts = blogPosts;

  const statics: staticsData = {
    CMS_URL: CMS_URL !== undefined ? CMS_URL : '',
    website: websiteMetaData,
  };

  // Pass data/content from the CMS to the component as a prop.
  return {
    props: { data, statics },
  };
}

export default Home;
