# 🌐 [fabiancdng.com](https://fabiancdng.com)

### My personal portfolio website and blog built with Next.js, Tailwind CSS, and Ghost.

---

### Docker images overview

All services of my website are deployed using the following Docker images:

- [`fabiancdng-website`](https://github.com/fabiancdng/fabiancdng.com/pkgs/container/fabiancdng-website) - Next.js front end
- [`ghost`](https://hub.docker.com/_/ghost) - The CMS I use for my blog posts

The continuous builds of the front end image is private for safety reasons.
However, you can build them yourself using the Dockerfiles provided in the repository.

### Docker Compose

I use Docker Compose to separate all services into their own container and allow container-to-container networking. You can find an example [docker-compose.yml](docker-compose.yml) in the repository.

---

**Copyright © 2021 Fabian Reinders (fabiancdng)**
