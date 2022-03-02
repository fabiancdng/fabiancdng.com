import type { NextPage } from 'next';
import { env } from 'process';
import { useEffect, useState } from 'react';
import qs from 'qs';
import Head from 'next/head';
import React from 'react';
import { renderComponent } from '../utils/dynamic-component';
import staticsData from '../types/statics';

/**
 * Data (& content) for the homepage from CMS.
 */
interface homePageData {
  title: string,
  content: never[],
  updatedAt: string,
  createdAt: string,
  publishedAt: string,
}

/**
 * Props for the Home component.
 */
interface homeProps {
  data: homePageData,
  statics: staticsData,
}

const Home: NextPage<homeProps> = ({ data, statics }: homeProps) => {
  const [contentComponents, setContentComponents] = useState([]);

  useEffect(() => {
    console.log(data.content);
    console.log(data, statics);
    setContentComponents(data.content);
  }, []);

  return (
    <>
      <Head>
        <title>{ data.title }</title>
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

  // Querystring holding the fields to populate.
  const querystring = qs.stringify({
    populate: {
      // Populate DZ 'content'.
      content: {
        populate: '*'
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
  const data: homePageData = homepageDataRaw.data.attributes;

  const statics: staticsData = {
    'CMS_URL': CMS_URL !== undefined ? CMS_URL : '',
  };

  // Pass data/content from the CMS to the component as a prop.
  return {
    props: { data, statics },
  };
}

export default Home;
