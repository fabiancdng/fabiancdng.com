import type { NextPage } from 'next';
import { env } from 'process';
import { useEffect, useState } from 'react';
import MarkdownParser from '../utils/markdown-parser';

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
          <h1 className="text-5xl font-bold my-5">{ data['title'] }</h1>
          <div dangerouslySetInnerHTML={{ __html: data['content'] }}></div>
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
  const pageData = homepageDataRaw['data']['attributes'];

  // Parse page content (markdown).
  const markdownParser = new MarkdownParser();
  pageData['content'] = markdownParser.parseMarkdown(pageData['content']);

  const data: homePageData = {
    title: pageData['title'],
    content: pageData['content'],
    updatedAt: pageData['updatedAt'],
    createdAt: pageData['createdAt'],
    publishedAt: pageData['publishedAt'],
  }

  // Pass data/content from the CMS to the component as a prop.
  return {
    props: data,
  }
}

export default Home;
