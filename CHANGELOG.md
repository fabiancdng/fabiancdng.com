# Changelog

All notable changes to this project will be documented in this file.

## 3.10.1 - 2023-04-28

- Fix: Styling for links
- Fix: Unified styling for `<hr />` tags
- Fix: Set target attribute for links in blog posts
- Fix: Active navlink color on darkmode

## 3.10.0 - 2023-04-28

- Add Next.js image optimization on blog posts

## 3.9.1 - 2023-04-26

- Fix: `IntersectionObserver` in projects section not working

## 3.9.0 - 2023-04-17

- Add global state for global values on the website

## 3.8.3 - 2023-04-11

- Improved Logging on the Server-Side

## 3.8.2 - 2023-04-10

- Fix: Add sitemap.xml link to `robots.txt`

## 3.8.1 - 2023-04-10

- Fix: Sitemap has wrong URL to blog

## 3.8.0 - 2023-04-10

- Blog homepage is now editable through Storyblok
- Metadata from blog homepage is being used in paginated blog feed
- `/blog/posts` is now `/blog`

## 3.7.5 - 2023-04-09

- Redesign blog front page

## 3.7.4 - 2023-04-09

- Fix: Imprint -> Legal notice
- Fix: Update robots.txt

## 3.7.3 - 2023-04-09

- Fix: Storyblok Cache Invalidation

## 3.7.2 - 2023-04-08

- Fix: Wrong Return Value for `getStaticPaths()`

## 3.7.1 - 2023-04-08

- Fix: Add Tag Slugs to `sitemap.xml`

## 3.7.0 - 2023-04-08

- Add tag pages (`/blog/tags/tag`)

## 3.6.0 - 2023-04-07

- Add author pages (`/authors/handle`)

## 3.5.9 - 2023-04-07

- Fix: Storyblok changed CDN URL

## 3.5.8 - 2023-04-07

- Fix: SEO: Use HTML5 tags like `header`, `main`, `article`
- Fix: SEO: Consistently use OpenGraph `type` and `article:` properties

## 3.5.7 - 2023-04-07

- Fix: SEO: Headings

## 3.5.6 - 2023-04-04

- Fix: Wrong Twitter card style

## 3.5.5 - 2023-04-04

- Fix: SEO: Add Twitter card tag

## 3.5.4 - 2023-04-04

- Fix: Timestamp alongside logs

## 3.5.3 - 2023-04-04

- Fix: Add Debug Logs on Server

## 3.5.2 - 2023-04-04

- Fix: Initial build for blog post pages not being done

## 3.5.1 - 2023-04-04

- Fix: Unwanted URLs in Sitemap (308 redirect)

## 3.5.0 - 2023-04-04

- Fix: `404` instead of `500` if fallback page doesn't exist
- Cache `404` response for URL for 30 minutes
- Add dynamic XML sitemap

## 3.4.1 - 2023-04-03

- Fix: `NEXT_PUBLIC_DOMAIN` environment variable not set during initial build

## 3.4.0 - 2023-04-03

- `/blog` is now `/blog/posts` and supports pagination via dynamic routes (e.g. `/blog/posts/4`)
- Implementing `/blog/posts` in SEO strategy

## 3.3.0 - 2023-04-02

- `/blog` is now rendered via SSR
- Pagination for blog post overview
- Fix some spacing issues

## 3.2.1 - 2023-04-02

- Fix Some Empty HTML Elements + Style Props

## 3.2.0 - 2023-04-01

- Add support for some additional inline CSS in Storyblok
- Remove unnecessary wrapper divs
- Add `storyblokEditable()` call where missing in components

## 3.1.1 - 2023-04-01

- Fix spacing and contrast issues

## 3.1.0 - 2023-04-01

- Design overhaul for section components
- Contact form with SendGrid integration

## 3.0.4 - 2023-03-31

- Fix: Invert colors of SVG fallback icons when in dark mode.

## 3.0.3 - 2023-03-31

- Use only Font Awesome for Icons
- Include via CSS not SVG/JS components
- Reduce total size of assets to 1/10

## 3.0.2 - 2023-03-31

- Further SEO optimizations

## 3.0.1 - 2023-03-31

Fix: Expose Storyblok token to the front end for

- A nicer editing experience in the production environment
- Reducing unused JavaScript on the front end (bad for SEO)
- Preventing error logs in the console (also bad for SEO)

## 3.0.0 - 2023-03-30

- Complete rework with Storyblok CMS
- Abandon Ghost and Strapi
- Dynamic Page structure thanks to Storyblok visual editor
- All content and asset stored in the cloud
- Incremental state regeneration to "cache" rendered pages for 30 minutes
- Many new components
- Design overhaul
- SEO concept

## 2.0.1 - 2022-10-21

### Changed

- Fix some assets and positioning issues

## 2.0.0 - 2022-10-21

### Changed

- Drop Strapi as a base for page structure and some content

## 1.3.3 - 2022-07-20

### Changed

- Further CSS fixes

## 1.3.2 - 2022-07-20

### Changed

- Enhance header CSS for saving space + better navigation

## 1.3.1 - 2022-07-19

### Bugfixes

- Fix TypeScript error messing with the build

## 1.3.0 - 2022-07-19

### Added

- Add ContactSection component (not yet with contact form)

## 1.2.0 - 2022-07-19

### Added

- Add RichTextSection component to be used on pages with support for Markdown text (RichText field in Strapi)

## 1.1.0 - 2022-07-18

### Added

- Add anonymous analytics as stated in privacy policy (only active in production environment).

## 1.0.3 - 2022-07-18

### Changed

- Utilize Next.js fallback to render static pages from Ghost on the fly if not returned by `getStaticPaths()` but existent.

## 1.0.2 - 2022-05-10

### Changed

- Small CSS fixes.

## 1.0.1 - 2022-05-10

### Changed

- SEO and accessibility fixes according to Google Lighthouse analysis.

## 1.0.0 - 2022-05-10

### Added

- Styling for blog posts and pages from Ghost CMS
- Highlight.js for syntax highlighting in code blocks
- SEO (tags) for pages and blog posts

### Changed

- Overhauled single blog post page
- Other small design enhancements

## 0.1.0 - 2022-05-10

- Initial (pre-)release
