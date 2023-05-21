export interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
  excerpt?: string;
}

export interface PostMetadata {
  title: string;
  author: string;
  published_at: Date;
  updated_at: Date;
  tags: string[];
  description: string;
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
