import { ISizeCalculationResult } from 'image-size/dist/types/interface';

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
