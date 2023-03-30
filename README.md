# 🌐 [fabiancdng.com](https://fabiancdng.com)

### My personal portfolio website and blog built with Next.js, Tailwind, and Storyblok.

---

### Deployment with Docker

My website can be deployed using a single Docker image:

- [`fabiancdng-website`](https://github.com/fabiancdng/fabiancdng.com/pkgs/container/fabiancdng-website) - Next.js front end

There's a continuous build of the Docker image up on the Github container registry. You can build it yourself, however, using the Dockerfile provided in the repository.

### Docker Compose

I use Docker Compose to separate all services into their own container and allow container-to-container networking. You can find an example [docker-compose.yml](docker-compose.yml) in the repository.

---

**Copyright © 2021-2023 Fabian Reinders (fabiancdng)**
