const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const groupMediaQueries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const nunjucksRender = require('gulp-nunjucks-render');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const replace = require('gulp-replace');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const imageminOptipng = require('imagemin-optipng');

const paths = {
  src: 'src/',
  assets: 'src/assets/',
  build: 'build/',
  wp: 'wp-theme/' // Assuming a WordPress theme build path based on a task in the readme.
};

async function clean() {
  const delModule = await import('del');
  return delModule([paths.build, paths.wp]);
  const del = delModule.default ? delModule.default : delModule;
}

function styles() {
  return gulp.src(paths.assets + 'scss/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(groupMediaQueries())
    .pipe(postcss([autoprefixer()]))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(paths.build + 'css/'))
    .pipe(gulp.dest(paths.wp + 'css/'));
}

function scripts() {
  return gulp.src(paths.assets + 'js/*.js')
    .pipe(plumber())
    .pipe(babel({ presets: ['@babel/env'] })) // Use @babel/env preset
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest(paths.build + 'js/'))
    .pipe(gulp.dest(paths.wp + 'js/'));
}

// Assuming scriptsVendors and jsLibs tasks exist based on the build task in Readme,
// but their implementation is not provided. Creating placeholder tasks.
function scriptsVendors() {
  return Promise.resolve(); // Placeholder
}

function jsLibs() {
  return Promise.resolve(); // Placeholder
}


function htmls() {
  return gulp.src(paths.src + '*.html')
    .pipe(plumber())
    .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
    .pipe(nunjucksRender({path: paths.src + 'templates'}))
    .pipe(gulp.dest(paths.build));
}

function images() {
 return import('gulp-imagemin').then(imageminModule => {
    const imagemin = imageminModule.default;
 return gulp.src(paths.assets + 'img/**/*.{jpg,jpeg,png,gif,svg,ico}')
 .pipe(imagemin([imageminOptipng({ optimizationLevel: 10 })]))
 .pipe(gulp.dest('build/img'))
 .pipe(gulp.dest(paths.wp + 'img/'));
  });
}
function toWebp() {
 return import('gulp-webp').then(webpModule => {
    const webp = webpModule.default;
 return gulp.src(paths.assets + 'img/**/*.{jpg,jpeg,png}')
 .pipe(webp())
 .pipe(gulp.dest('build/img'));
  });
}

function watch() {
  gulp.watch(paths.assets + 'scss/**/*.scss', styles);
  gulp.watch(paths.assets + 'js/**/*.js', scripts);
  gulp.watch(paths.src + '**/*.html', htmls);
}

function serve() {
  browserSync.init({ server: { baseDir: paths.build } });
  browserSync.watch(paths.build + '**/*.*', browserSync.reload);
}

gulp.task('build', gulp.series(
  gulp.parallel(styles, scripts, scriptsVendors, jsLibs, htmls, images, toWebp) // Assuming copyFonts is not needed based on the file structure.
));

gulp.task('default', gulp.series(
  gulp.parallel(styles, scripts, scriptsVendors, jsLibs, htmls, images, toWebp),
  gulp.parallel(watch, serve) // Assuming no fonts task in watch
));

exports.styles = styles;
exports.scripts = scripts;
exports.htmls = htmls;
exports.images = images;
exports.toWebp = toWebp;
exports.svgSprite = svgSprite;
exports.watch = watch;
exports.serve = serve;
exports.clean = clean;
exports.build = gulp.task('build');
exports.default = gulp.task('default');