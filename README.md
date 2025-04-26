# Sustainable Practice Indicators

This is a prototype web application for calculating a Suspra Score. The emphasis
is on correct implementation of the calculation and basic functionality for
data entry rather than cosmetics.

## Running the Code

In a terminal, install the project dependencies (only need do this once):

`npm install`

Start the development server:

`npm run dev -- -o`

Typecheck your code before creating a pull request with:

```
npm run build
npx nuxi typecheck
```

## System Architecture

The app is written in
[TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html). This is
becoming the industry standard. Many editors and IDEs can be configured to
provide a better developer experience with TypeScript than vanilla JavaScript.

This is a client-only app. It uses the Nuxt framework with server-side rendering
(SSR) disabled. The framework establishes a convention for the directory
structure of the code so be sure to read the
[documentation](https://nuxt.com/docs/guide) if you are unfamiliar with where
things go. There are three directories where most of the code lives.

<dl>
<dt>composables</dt>
<dd>The files in here create the reactive globals that are used in throughout
the app. Each file exposes a single reactive global. Each pathway has three
reactive globals: indicators, score and started. The files follow a naming
convention that is obvious from the existing files.</dd>
<dt>pages/indicators</dt>
<dd>This directory contains a subdirectory for each pathway. The pathway
subdirectory will contain the data entry forms for the indicators in that
pathway. These are the core markup files for the app. All the files are
<a href="https://vuejs.org/guide/scaling-up/sfc.html">Vue Single-File Components</a>.</dd>
<dt>utils</dt>
<dd>Suspra Score calculations and type definitions for the reactive globals go
in this directory. Each pathway should have single file in this directory.</dd>
</dl>

## Adding a Pathway

Adding a new pathway is a mostly mechanical process. It's usually quickest to
copy-paste from an existing pathway and touch up the new files as needed.

1. Create a TypeScript file for the pathway in utils. This file should export
a type for the object that holds the indicator values, a function to create a
default indicators object and a function to calculate a score for the pathway
from the indicators.
2. Create TypeScript files for the three reactive globals in composables.
3. Back in the utils directory, modify indicatorStorage.ts and suspraScore.ts
to include the indicators for the new pathway.
4. Make a new subdirectory under pages/indicators for the new pathway.
5. In the new pathway subdirectory, create an index.vue SFC that has links to
the various data entry forms for the indicators of the new pathway.
6. Create a new SFC for each indicator in the pathway. This SFC will contain
a data entry form for the indicator.
7. Add the new pathway to pages/index.vue.
