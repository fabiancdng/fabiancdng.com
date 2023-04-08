/**
 * Shared types.
 */

import {
  ISbResult,
  ISbStories,
  ISbStoryData,
  SbBlokData,
} from '@storyblok/react';

/**
 * Author object from Storyblok for a page or post.
 * Resolved Relation in 'rels' array.
 */
export interface PostOrPageAuthor extends ISbStoryData {
  content: {
    bio: string;
    _uid: string;
    avatar: ImageAsset;
    component: string;
    website: string;
    githubUser: string;
    seoMetaTags: SeoMetaTagsData;
    twitterHandle: string;
  };
}

/**
 * Data for an asset field of a block in Storyblok.
 */
export interface ImageAsset {
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  filename: string;
  copyright: string;
  fieldtype: 'asset';
  is_external_url: boolean;
}

/**
 * Data for a field with SEO metadata generated by the Storyblok SEO plugin.
 */
export interface SeoMetaTagsData {
  _uid: string;
  title: string;
  plugin: string;
  og_image: string;
  og_title: string;
  description: string;
  twitter_image: string;
  og_description: string;
  twitter_title: string;
  twitter_description: string;
}

/**
 * Data for a story that is representing a page.
 */
export interface PageStoryData extends ISbStoryData {
  content: {
    _uid: string;
    body: SbBlokData[];
    component: string;
    seoMetaTags: SeoMetaTagsData;
    _editable: string;
  };
}

/**
 * Data for a story that is specifically a blog post.
 */
export interface BlogPostStoryData extends ISbStoryData {
  content: {
    _uid: string;
    title: string;
    author: string;
    excerpt: string;
    component: string;
    thumbnail: ImageAsset;
    _editable: string;
  };
}

export interface BlogPostStories extends ISbStories {
  data: {
    cv: number;
    links: ISbStoryData[];
    rels: ISbStoryData[];
    stories: BlogPostStoryData[];
  };
  perPage: number;
  total: number;
  headers: any;
}

export interface Tag {
  name: string;
  taggings_count: number;
}

export interface IsbTags extends ISbResult {
  data: {
    tags: Tag[];
  };
}
