export interface WP_User {
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
  simple_local_avatar: {
    media_id: 239;
    full: string;
    blog_id: 1;
    '192': string;
    '96': string;
    '128': string;
    '64': string;
    '52': string;
    '26': string;
    '24': string;
    '48': string;
    '100': string;
    '50': string;
    '32': string;
    '80': string;
    '40': string;
  };
}

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
  count: number;
  link: string;
  name: string;
  slug: string;
  description: string;
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
    author: WP_User[];
    'wp:featuredmedia': WP_Embedded_Media[];
    'wp:term': [WP_Embedded_Term[], WP_Embedded_Term[]];
  };
}

export interface Project {
  slug: string;
  metadata: ProjectMetadata;
  description: string;
  thumbnail: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
}

export interface ProjectMetadata {
  title: string;
  subtitle: string;
  technologies: string[];
  demo: string;
  github: string;
}
