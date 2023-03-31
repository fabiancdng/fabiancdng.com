# Changelog

All notable changes to this project will be documented in this file.

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
