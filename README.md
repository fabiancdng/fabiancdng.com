# 🌐 [fabiancdng.com](https://fabiancdng.com)

### My personal portfolio website and blog built with Next.js and Tailwind.

This is the fifth iteration of my website.

| Version | Architecture                                                                                          |
| ------- | ----------------------------------------------------------------------------------------------------- |
| v1      | Strapi + Ghost as a CMS, Next.js 12 front end                                                         |
| v2      | Ghost as a CMS for the blog, other content hard-coded; Next.js 12 front end                           |
| v3      | Rewrite with Storyblok as a CMS, Next.js 13 on the front end                                          |
| v4      | Next.js 13.4 Rewrite Utilizing the "App Router"                                                       |
| v5      | Switch to WordPress as a headless CMS                                                                 |

---

### Deployment with Docker

My website can be deployed using a single Docker image:

- [`fabiancdng-website`](https://github.com/fabiancdng/fabiancdng.com/pkgs/container/fabiancdng-website) - Next.js app

There's a (private) continuous build of the Docker image up on the Github container registry. You can build it yourself, however, using the Dockerfile provided in the repository.

---

**Copyright © 2021-2023 Fabian Reinders (fabiancdng)**
