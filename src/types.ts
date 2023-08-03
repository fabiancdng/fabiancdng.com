import { ISizeCalculationResult } from 'image-size/dist/types/interface';

export interface WP_Embedded_Image {
  file: string;
  width: number;
  height: number;
  filesize: number;
  mime_type: string;
  source_url: string;
}

export interface WP_Embedded_Media {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    filesize: number;
    sizes: {
      medium: WP_Embedded_Image;
      large: WP_Embedded_Image;
      thumbnail: WP_Embedded_Image;
      medium_large: WP_Embedded_Image;
      full: WP_Embedded_Image;
    };
    image_meta: {
      aperture: string;
      credit: string;
      camera: string;
      caption: string;
      created_timestamp: string;
      copyright: string;
      focal_length: string;
      iso: string;
      shutter_speed: string;
      title: string;
      orientation: string;
      keywords: [];
    };
  };
  source_url: string;
}

export interface WP_Embedded_Term {
  id: number;
  link: string;
  name: string;
  slug: string;
  taxonomy: 'post_tag' | 'category';
}

export interface WP_Post {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: false;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: [];
  categories: number[];
  tags: number[];
  _embedded: {
    author: [
      {
        id: number;
        name: string;
        url: string;
        description: string;
        link: string;
        slug: string;
        avatar_urls: {
          '24': string;
          '48': string;
          '96': string;
        };
      }
    ];
    'wp:featuredmedia': WP_Embedded_Media[];
    'wp:term': [WP_Embedded_Term[], WP_Embedded_Term[]];
  };
}

export interface Page {
  slug: string;
  metadata: PageMetadata;
  content: string;
}

export interface PostMetadata {
  title: string;
  author: string;
  published_at: Date;
  updated_at: Date;
  tags: string[];
  description: string;
}

export interface PageMetadata {
  title: string;
  author: string;
  description: string;
  published_at: Date;
  updated_at: Date;
  search_engine_index: boolean;
}

export interface Image {
  path: string;
  source: string;
  dimensions: ISizeCalculationResult;
}

export interface Author {
  metadata: AuthorMetadata;
  content: string;
}

export interface AuthorMetadata {
  slug: string;
  name: string;
  homepage: string;
  twitter: string;
  github: string;
}

export interface Tag {
  slug: string;
  name: string;
  emoji: string;
}

export interface Project {
  slug: string;
  metadata: ProjectMetadata;
  thumbnail: Image;
  content: string;
}

export interface ProjectMetadata {
  title: string;
  subtitle: string;
  author: string;
  description: string;
  published_at: Date;
  updated_at: Date;
  technologies: string[];
  demo: string;
  github: string;
}
