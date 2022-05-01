import type { NextPage } from 'next';
import { env } from 'process';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import React from 'react';
import { renderComponent } from '../utils/dynamic-component';
import PageAdapter from '../adapters/page-adapter';
import HomePageData from '../types/pages/homepage';
import WebsiteAdapter from '../adapters/website-adapter';
import StaticsData from '../types/statics';

/**
 * Props for the Home component.
 */
interface HomeProps {
  pageData: HomePageData,
  statics: StaticsData,
}

const Home: NextPage<HomeProps> = ({ pageData, statics }: HomeProps) => {
  const [contentComponents, setContentComponents] = useState([]);

  useEffect(() => {
    setContentComponents(pageData.content);
  }, []);

  return (
    <>
      <Head>
        <title>{ pageData.title + ' | ' + statics.website.name }</title>
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
  const websiteAdapter = new WebsiteAdapter(CMS_URL, CMS_ACCESS_TOKEN);
  const websiteMetaData = await websiteAdapter.getWebsiteMetaData();

  // Retrieve homepage data (& content) from the CMS on the server side.
  const pageAdapter = new PageAdapter(CMS_URL, CMS_ACCESS_TOKEN);
  const pageData = await pageAdapter.getHomePageData();

  const statics: StaticsData = {
    CMS_URL: CMS_URL !== undefined ? CMS_URL : '',
    website: websiteMetaData,
  };

  // Pass data/content from the CMS to the component as a prop.
  return {
    props: {
      pageData,
      statics
    },
  };
}

export default Home;
