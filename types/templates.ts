/**
 * Template for a dynamic/custom page from Ghost.
 */
export interface PageTemplate {
    content: any[],
    updatedAt: string,
    createdAt: string,
    publishedAt: string,
}

/**
 * Template for the blog page.
 */
 export interface BlogTemplate {
    content: any[],
    updatedAt: string,
    createdAt: string,
    publishedAt: string,
}

/**
 * Template for a dynamic blog post from Ghost.
 */
export interface BlogPostTemplate {
    content: any[],
    updatedAt: string,
    createdAt: string,
    publishedAt: string,
}