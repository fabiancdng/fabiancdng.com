/**
 * Shared types.
 */

/**
 * Author object from Storyblok for a page or post.
 * Resolved Relation in 'rels' array.
 */
export interface PageOrPostAuthor {
  name: string;
  created_at: string;
  published_at: string;
  id: number;
  uuid: string;
  content: {
    bio: string;
    _uid: string;
    avatar?: ImageAsset;
    component: string;
    _editable: string;
  };
  slug: string;
  full_slug: string;
  sort_by_date: null;
  position: number;
  tag_list: string[];
  is_startpage: boolean;
  parent_id: number;
  meta_data: null;
  group_id: string;
  first_published_at: string;
  release_id: null;
  lang: string;
  path: null;
  alternates: [];
  default_full_slug: null;
  translated_slugs: null;
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
