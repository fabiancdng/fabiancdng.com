import type { NextPage } from 'next';
import { env } from 'process';
import { useEffect, useState } from 'react';

/**
 * Data (& content) for the homepage from CMS.
 */
interface homePageData {
  title: string,
  content: string,
  updatedAt: string,
  createdAt: string,
  publishedAt: string,
}

const Home: NextPage<homePageData> = (data: homePageData) => {
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <>
      <div className="flex justify-center w-full mb-5">
        <div className="w-full p-10 md:p-0 md:w-2/3">
          <h1 className="text-4xl font-bold my-5">{ data['title'] }</h1>
          <p>{ data['content'] }</p>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { CMS_URL, CMS_ACCESS_TOKEN } = env;

  // Retrieve homepage data (& content) from CMS on the server side.
  const homepageDataRequest = await fetch(CMS_URL + '/api/homepage', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + CMS_ACCESS_TOKEN,
    }
  });

  // Parse JSON response and get relevant data.
  const homepageDataRaw = await homepageDataRequest.json();
  const data: homePageData = {
    title: homepageDataRaw['data']['attributes']['title'],
    content: homepageDataRaw['data']['attributes']['content'],
    updatedAt: homepageDataRaw['data']['attributes']['updatedAt'],
    createdAt: homepageDataRaw['data']['attributes']['createdAt'],
    publishedAt: homepageDataRaw['data']['attributes']['publishedAt'],
  }

  // Pass data/content from the CMS to the component as a prop.
  return {
    props: data,
  }
}

export default Home;
