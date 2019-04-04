This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### BUILD AND RUN PANEL

To build and run panel and nginx containers run:

```
#!bash

npm run docker-build
```

**warning: This command will create local paths, panel and nginx container, but will not create api container**

### RUNNING PANEL IN HOST

```
npm run start
```

### RUNNING PANEL IN HOST USING TEST API

```
USE_TEST_API=true npm run start
```

### LIFT API CONTAINER

```
#!bash

git clone https://bitbucket.org/khemlabs/whatsapp.api.git
cd whatsapp.api
npm run build
```

#### BUILD ENVIRONMENT VARIABLES

##### NGINX PROXY PORT

The NGINX PROXY container can be run on any port, if you want to change the default port (**80**) you can run:

```
#!bash

NGINX_PORT=8080 npm run docker-build
```

**Warning: if you have an nginx-proxy container already running, it will not change the port**

##### NGINX PROXY CONTAINER NAME

If you already have a nginx proxy container running, run:

**Warning: All khemlabs projects that use this script use the same nginx proxy container name (_nginx_proxy_) so you dont need to pass the _NGINX_CONTAINER_NAME_ environment variable if that is the case**

```
#!bash

NGINX_CONTAINER_NAME=container-name npm run docker-build
```

### NPM SCRIPTS

NPM SCRIPTS can be used to simplify project build, start, stop and logs

- **BUILD** _npm run docker-build_ (npm script to build and start the project)

- **CLEAN** _npm run docker-clean_ (npm script to clean all dangling volumes and containers)

- **REMOVE** _npm run docker-remove_ (npm script to remove containers and local paths)

- **UNINSTALL** _npm run docker-uninstall_ (npm script to remove images, containers and local paths)

- **REBUILD** _npm run docker-rebuild_ (npm script to rebuild app, reset db, import documents and start the project)

- **RECREATE** _npm run docker-recreate_ (npm script to recreate containers and start the project)

- **UP** _npm run docker-up_ (npm script to start all the containers of an existing project)

- **DOWN** _npm run docker-down_ (npm script to stop all the containers of an existing project)

#### NPM SCRIPTS - UPDATE PROJECT VERSION NUMBER

- **PATCH (0.0.THIS)** _npm run upgrade-patch_ (npm script to autoincrement the version number)

- **MINOR (0.THIS.0)** _npm run upgrade-minor_ (npm script to autoincrement the version number)

- **MAYOR (THIS.0.0)** _npm run upgrade-mayor_ (npm script to autoincrement the version number)

#### UNINSTALL

The **uninstall** script will remove panel image, if you want to remove kickstarter image run:

```
#!bash

REMOVE_KICKSTARTER=true npm run docker-uninstall
```

### DEPLOY

On DEV

```
npm run build
git add .
git commit -m "deploying version [VERSION]"
git push origin master
```

```
#!bash
TAG=[API-VERSION] docker-compose up -d --build
```

## (REACT) Available Scripts

Only in the host and in the project directory (if you are using docker this will not work), you can run:

### `npm run react-start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
