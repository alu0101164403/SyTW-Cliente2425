Instalaciones realizadas:

- npm init -y                               # Para inicializar el proyecto npm
- npm install parcel-bundler --save-dev
- npm install gh-pages --save-dev
- npm install --save-dev sass
- npm install --save-dev gulp gulp-sass gulp-clean-css browser-sync node-sass
- npm install --save-dev gulp-concat-css



.json:

    "start": "parcel serve src/index.html",
    "build": "parcel build src/index.html --public-url /repo-name/",
    "deploy": "gh-pages -d dist"



Ejecución:
-   npm start
-   gulp
- npm run deploy