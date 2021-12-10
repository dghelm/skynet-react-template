# Skynet Typescript React Template

<p align="center">
<a href="https://github.com/KavinJey/skynet-typescript-react-template/actions/workflows/lint-and-versioning.yml">
    <img alt="code style: build" src="https://github.com/KavinJey/skynet-typescript-react-template/actions/workflows/lint-and-versioning.yml/badge.svg?branch=main">
</a>
<a href="#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
</p>

- :heavy_check_mark: Uses [Parcel](https://github.com/parcel-bundler/parcel) for bundling.

- :heavy_check_mark: [Easy Peasy](https://easy-peasy.vercel.app/) for State Management, and React Context* (read below for clarity)

- :heavy_check_mark: [Semantic UI](https://react.semantic-ui.com/), custom styling overrides under `/src/semantic-ui` using [Theming](https://semantic-ui.com/usage/theming.html)

- :heavy_check_mark: Commit Messages are linted using [Husky](https://www.npmjs.com/package/husky) (setup `npx husky install`).

- :heavy_check_mark: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) using [Semantic-Release](https://github.com/semantic-release/semantic-release). 

- :heavy_check_mark: Testing with [Jest](https://jestjs.io/docs/tutorial-react). Examples in `/src/components/test`. Tests can be run using `yarn test`

## Getting Started

To use this as a template for your projects use the following commands

```bash

git clone https://github.com/KavinJey/skynet-typescript-react-template.git exampleProject
cd exampleProject/
yarn install
npx husky install # Set-ups conventional commits and prettier lint checks
yarn start

# To push to new repository
git remote remove origin
git remote add origin [new repo link https/ssh]
git add . # add changes
git commit -m 'chore: initializing repo from template'
git push
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
