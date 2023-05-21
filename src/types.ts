export interface Post {
  slug: string;
  content: string;
  metadata: PostMetadata;
  excerpt?: string;
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
}

export interface Author {
  metadata: AuthorMetadata;
  content: string;
}

export interface AuthorMetadata {
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
