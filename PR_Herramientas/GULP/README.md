Instalaciones realizadas:

- npm init -y                               # Para inicializar el proyecto npm
- npm install gulp --save-dev               # Instala Gulp
- npm install gulp-concat-css --save-dev    # Para concatenar CSS
- npm install gulp-minify-css --save-dev    # Para minificar CSS
- npm install gulp-sourcemaps --save-dev    # Para source maps de CSS
- npm install gulp-imagemin --save-dev      # Para minificar imágenes
- npm install gulp-uglify --save-dev        # Para minificar JS


Gulpfile:

- Tarea styles:     Concatena los archivos CSS en styles.css, los minifica y genera source maps.
- Tarea images:     Optimiza y reduce el tamaño de las imágenes.
- Tarea scripts:    Minifica los archivos JavaScript.
- Tarea html:       Mueve archivos HTML desde src/html a dist.
- Tarea serve:      Inicia browserSync para refrescar automáticamente el navegador cada vez que se detectan cambios.

Ejecución:
-   gulp