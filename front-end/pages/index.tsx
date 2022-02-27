import type { NextPage } from 'next';
import { env } from 'process';
import { useEffect, useState } from 'react';
import qs from 'qs';
import Head from 'next/head';
import React from 'react';
import { renderComponent } from '../utils/dynamic-component';

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

const Home: NextPage<homePageData> = (data: homePageData) => {
  const [contentComponents, setContentComponents] = useState([]);

  useEffect(() => {
    console.log(data.content);
    setContentComponents(data.content);
  }, []);

  return (
    <>
      <Head>
        <title>{ data.title }</title>
      </Head>

      {
        // Render all known dynamic components from the CMS data.
        contentComponents.map((component, index) => renderComponent(component, index))
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

  // Pass data/content from the CMS to the component as a prop.
  return {
    props: data,
  }
}

export default Home;
