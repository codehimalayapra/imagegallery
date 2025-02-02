# Image Gallery

To run the app locally run these command: \
NOTE: Currently using `yarn` but if your prefere anything else you can use it.

- Clone the project using either `ssh` or `https`
- Inside the cloned folder open a terminal and enter these command

```
yarn install
yarn dev
```

The application should run without any issue if done correctly.

# Project Overview

- Using 'Feature Based' project structure, see below for more information.

  ### Tech Used

  - React JS
  - TailwindCSS V4
  - Typescript
  - Fetch API for HTTP request
  - [Picsum for Image backend](https://picsum.photos/)
  - Vite as build Tool
  - Vite-svgr for handling SVGs
  - Infinite Scroll and Masonry Packages

For Infinite and Masonry layout, had to use package as it was causing some issues with my own barebone implemenation of both.

[Refer to this](https://github.com/codehimalayapra/imagegallery/commit/8be641ee728637bc7d883665b4310694b3cb966e) for infinite scroll implementation using `IntersectionObserver` without package \
[Refer to this](https://github.com/codehimalayapra/imagegallery/commit/745c8e701d8a931cb90147e0fcef8e059105d2e9) for `grid` implmentation of masonry layout without package

# Project Structure Information for Scalability

Most of the code lives in the `src` folder and looks something like this:

```sh
src
|
+-- app               # application layer containing:
|   |                 # this folder might differ based on the meta framework used
|   +-- routes        # application routes / can also be pages
|   +-- app.tsx       # main application component
|   +-- provider.tsx  # application provider that wraps the entire application with different global providers - this might also differ based on meta framework used
|   +-- router.tsx    # application router configuration
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- components        # shared components used across the entire application
|
+-- config            # global configurations, exported env variables etc.
|
+-- features          # feature based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # reusable libraries preconfigured for the application
|
+-- stores            # global state stores
|
+-- testing           # test utilities and mocks
|
+-- types             # shared types used across the application
|
+-- utils             # shared utility functions
```

For easy scalability and maintenance, most of the code within the features folder. Each feature folder should contain code specific to that feature, keeping things neatly separated. This approach helps prevent mixing feature-related code with shared components, making it simpler to manage and maintain the codebase compared to having many files in a flat folder structure. By adopting this method, we can enhance collaboration, readability, and scalability in the application's architecture.

A feature could have the following structure:

```sh
src/features/awesome-feature
|
+-- api         # exported API request declarations and api hooks related to a specific feature
|
+-- assets      # assets folder can contain all the static files for a specific feature
|
+-- components  # components scoped to a specific feature
|
+-- hooks       # hooks scoped to a specific feature
|
+-- stores      # state stores for a specific feature
|
+-- types       # typescript types used within the feature
|
+-- utils       # utility functions for a specific feature
```

NOTE: if we don't need all of these folders for every feature. Only including the ones that are necessary for the feature is enough.
