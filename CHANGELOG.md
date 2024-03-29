# Changelog

All notable changes to this project will be documented in this file.

## 5.8.0 - 2023-12-31

- Add Gutenberg block that allows for the rendering of a single project on the homepage to take place entirely in WordPress

## 5.7.1 - 2023-12-30

- Fix: Undefined prop `description` for `Project` component

## 5.7.0 - 2023-12-30

- Add feature to render portfolio projects from CPT (instead of JSON files)

## 5.6.0 - 2023-11-25

- Add functionality to auto-hide navbar on scroll down and re-appear on scroll up (only on content pages)
- Refactor code to determine currently active page/nav item
- Other small design tweaks and fixes here

## 5.5.0 - 2023-11-19

- Add revalidation interval to `sitemap.ts`

## 5.4.1 - 2023-10-31

- Fix performance issues due to large (uncompressed) background video

## 5.4.0 - 2023-10-31

- New hero section design
- Social media links in hero section
- Re-add projects section (current datasource is a simple JSON file)
- Add ability for navbar to blend in with a background image (like the one on the hero section)
- Fix smooth scrolling

## 5.3.2 - 2023-10-29

- Fix WP webhook cache revalidation

## 5.3.1 - 2023-10-29

- Upgrade to Next.js 14

## 5.3.0 - 2023-10-29

- Add WordPress webhook endpoint for improved cache revalidation

## 5.2.1 - 2023-08-21

- Add `pm2` process management for the Docker runtime to leverage multiple CPU cores for best performance

## 5.2.0 - 2023-08-08

- API: Allow multiple paths to be revalidated per request

## 5.1.2 - 2023-08-06

- Fix: Issue with CD workflow due to wrong path

## 5.1.1 - 2023-08-06

- Update Docker build

## 5.1.0 - 2023-08-06

- New: New API for revalidating the cache for certain route segments on-demand.

## 5.0.0 - 2023-08-06

- Switch to WordPress as headless CMS for content management
- Remove automatic cache validation after time intervals (all sites/API calls are static now)
- Implement On-Demand cache revalidation via API (can be called from WordPress when a page is updated)
- Update Styling
- `/tags` -> `/categories` (Tags will be added in the future)
- Remove projects and introduction on the homepage for the time being

## 4.2.8 - 2023-08-02

- Fix: `PostPreview` Images not aligned

## 4.2.7 - 2023-06-25

- Update content submodule in image build due to copyright reasons

## 4.2.6 - 2023-06-17

- New Build With All Content Updates

## 4.2.5 - 2023-05-29

- Fix: Image Optimization Broken

## 4.2.4 - 2023-05-29

- Fix: Remove comments
- Fix: SEO: Add `og:url`

## 4.2.3 - 2023-05-29

- Fix: Better Docker build

## 4.2.2 - 2023-05-29

- Fix: GitHub Actions env vars undefined
- Fix: ISR instead of On-Demand only (as `revalidate_path` API is too complicated to opt-out of the load balancing for now)

## 4.2.1 - 2023-05-29

- Fix: Don't lazy load blog post thumbnails

## 4.2.0 - 2023-05-29

- Remove Background Revalidation
- Add On-Demand Revalidation via API route
- Add Authorization to Revalidation API route
- Update examples in the repository

## 4.1.1 - 2023-05-28

- Fix: Add field `search_engine_index` to pages for setting robots tags and de-listing pages in `sitemap.xml`

## 4.1.0 - 2023-05-28

- Add Social Share Buttons for Blog Posts

## 4.0.1 - 2023-05-28

- Fix: Add Fallback Domain for `sitemap.xml`

## 4.0.0 - 2023-05-28

- Rewrite with Next.js 13.4 (App Router)
- Drop Storyblok as a CMS (switch to `md` files)
- Utilize Next.js Metadata APIs for new `sitemap.xml` and SEO

## 3.14.4 - 2023-05-18

- Fix broken link `/blog/scaling-next-js-web-apps-with-docker` due to slug update

## 3.14.3 - 2023-05-14

- Fix: Styling: Margin for `blockquote`

## 3.14.2 - 2023-05-13

- Fix: Add Styling for `blockquote` and social media buttons

## 3.14.1 - 2023-05-13

- Fix: New Docker image

## 3.14.0 - 2023-05-13

- Add API to export content (for cross-posting)

## 3.13.6 - 2023-05-11

- Fix spacing and caching bugs

## 3.13.5 - 2023-05-07

- Fix: Layout and SEO issues

## 3.13.4 - 2023-05-07

- Fix: Blog post thumbnail getting too big

## 3.13.3 - 2023-05-06

- Fix: Add redirects to avoid broken links

## 3.13.2 - 2023-05-06

- Fix: Margin on Blog Posts overview page

## 3.13.1 - 2023-05-06

- Fix: Tag list always slightly different

## 3.13.0 - 2023-05-06

- Enhance mobile responsiveness
- Image parser utility function for less image parsing code

## 3.12.0 - 2023-05-01

- Add request logging middleware (`ip` or `body` are not logged!)

## 3.11.1 - 2023-04-29

- Improve mobile responsiveness (fix some space waste)
- Fix some routing/active nav link issues

## 3.11.0 - 2023-04-28

- New HeroSection Design

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
