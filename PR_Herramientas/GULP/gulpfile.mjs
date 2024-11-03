import gulp from 'gulp';
import concatCss from 'gulp-concat-css';
import sourcemaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';

import minifyCss from 'gulp-clean-css';
import browserSync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass); // Configurando el compilador Sass

// Tarea para copiar archivos HTML
gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// Tarea para compilar SASS a CSS, concatenar y minificar CSS con source maps
gulp.task('styles', function () {
  return gulp.src(['./src/css/*.css', './src/sass/*.scss'])  // Incluye archivos CSS y SASS
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))  // Compila SASS a CSS
    .pipe(concatCss("styles.css"))
    .pipe(minifyCss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Tarea para compilar SASS a CSS, concatenar y minificar CSS con source maps
gulp.task('stylescss', function () {
  return gulp.src('./src/sass/styles.scss') 
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))  // Compila SASS a CSS
    .pipe(concatCss("styles.css"))            // Nombre del archivo final
    .pipe(minifyCss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./src/css'))              // Carpeta de destino
    .pipe(browserSync.stream());
});

// Tarea para minificar JS
gulp.task('scripts', function () {
  return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// Tarea para optimizar imágenes
gulp.task('images', function () {
  return gulp.src('./src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

// Tarea para iniciar BrowserSync
gulp.task('serve', function () {
  browserSync.init({
    server: './dist'
  });

  gulp.watch('./src/*.html', gulp.series('html'));
  gulp.watch(['./src/css/*.css', './src/sass/*.scss'], gulp.series('styles'));
  gulp.watch('./src/js/*.js', gulp.series('scripts'));
  gulp.watch('./src/images/*', gulp.series('images'));
});

// Tarea por defecto que ejecuta todas las demás
gulp.task('default', gulp.parallel('html', 'styles', 'scripts', 'images', 'serve'));
