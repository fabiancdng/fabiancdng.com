# 🌐 [fabiancdng.com](https://fabiancdng.com)
## My personal portfolio website and blog built with Strapi, Next.js and Tailwind CSS.

### Docker images overview

All services of my website are deployed using the following Docker images:

* [fabiancdng-website-frontend]() - Next.js front end
* [fabiancdng-website-cms]() - [Strapi v4](https://strapi.io/) with all custom models/post types
* [ghost](https://hub.docker.com/_/ghost) - The CMS I use for my blog posts

### Docker Compose

I use Docker Compose to separate all services into their own container and allow container-to-container networking. You can find an example [docker-compose.yml](docker-compose.yml) in the repository.

---

**Copyright © 2021 Fabian Reinders (fabiancdng)**