# Sustainable Score Calculator

This is a prototype web application for calculating a Suspra Score. The emphasis
is on correct implementation of the calculation and basic functionality for
data entry rather than cosmetics.

## Running the Code

In a terminal, install the project dependencies (only need do this once):

`npm install`

If your version of npm is too old, this might fail.  Use node version manager (`nvm`) to manage your versions of node:

```
nvm install 18
nvm use 18
```

Then the `npm install` command should work.

Start the development server:

`npm run dev`

## Deploy on Netlify

This is a single-page application (SPA) and therefore requires a rewrite rule as shown in the [Netlify documentation](https://docs.netlify.com/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps).
