import Head from 'next/head';
import { PageStoryData } from '../../types';

/**
 * Some SEO tags generated with info from Storyblok SEO plugin.
 */
const SeoMetaTags = ({ story }: { story: PageStoryData }) => {
  if (!story.content.seoMetaTags) return null;

  let slugArray = story.full_slug.split('/');
  let twitterCardStyle = 'summary';

  if (slugArray[0] === 'blog' && slugArray[1] !== '') {
    twitterCardStyle = 'summary_large_image';
  }

  return (
    <Head>
      {/* Most important meta tags for SEO. */}
      {story.content.seoMetaTags['description'] && (
        <meta
          name="description"
          content={story.content.seoMetaTags.description}
        />
      )}

      {/* OG title */}
      {story.content.seoMetaTags['og_title'] && (
        <meta name="og:title" content={story.content.seoMetaTags['og_title']} />
      )}

      {/* OG description */}
      {story.content.seoMetaTags['og_description'] && (
        <meta
          name="og:description"
          content={story.content.seoMetaTags['og_description']}
        />
      )}

      {/* OG image */}
      {story.content.seoMetaTags['og_image'] && (
        <meta name="og:image" content={story.content.seoMetaTags['og_image']} />
      )}

      {/* Twitter title */}
      {story.content.seoMetaTags['twitter_title'] && (
        <>
          <meta name="twitter:card" content={twitterCardStyle} />

          <meta
            name="twitter:title"
            content={story.content.seoMetaTags['twitter_title']}
          />
        </>
      )}

      {/* Twitter description */}
      {story.content.seoMetaTags['twitter_description'] && (
        <meta
          name="twitter:description"
          content={story.content.seoMetaTags['twitter_description']}
        />
      )}

      {/* Twitter image */}
      {story.content.seoMetaTags['twitter_image'] && (
        <meta
          name="twitter:image"
          content={story.content.seoMetaTags['twitter_image']}
        />
      )}
    </Head>
  );
};

export default SeoMetaTags;
