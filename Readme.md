🧱 Project Overview: land_starter
The land_starter repository is a front-end starter template designed for rapid development of landing pages. It utilizes Gulp.js as its task runner to automate various development and production tasks.
mono.software

📁 Project Structure
The project's directory structure is organized as follows:

css
Copy
Edit
land_starter/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── img/
│   │   ├── js/
│   │   │   └── libs/
│   │   └── scss/
│   ├── templates/
│   └── index.html
├── build/
├── gulpfile.js
└── package.json
src/: Contains the source files for the project.

assets/: Holds all asset files such as fonts, images, JavaScript, and SCSS.

templates/: Includes Nunjucks templates for HTML generation.

index.html: The main HTML file.

build/: The output directory where the production-ready files are generated.

gulpfile.js: Defines Gulp tasks for automating development workflows.

package.json: Lists project dependencies and scripts.
GitHub
+1
The JetBrains Blog
+1
YouTube
+5
Smashing Magazine
+5
mono.software
+5

📦 Key NPM Packages
The project leverages several NPM packages to streamline development:

Gulp and Plugins:

gulp: The core task runner.

gulp-sass: Compiles SCSS to CSS.

gulp-sass-glob: Enables glob imports in SCSS.

gulp-group-css-media-queries: Groups media queries.

gulp-clean-css: Minifies CSS files.

gulp-postcss & autoprefixer: Adds vendor prefixes to CSS.

gulp-concat: Concatenates files.

gulp-uglify: Minifies JavaScript files.

gulp-babel: Transpiles ES6+ JavaScript.

gulp-nunjucks-render: Renders Nunjucks templates.

gulp-rename: Renames files.

gulp-sourcemaps: Generates source maps.

gulp-replace: Performs string replacements.

gulp-plumber: Prevents pipe breaking caused by errors.

browser-sync: Live-reloads the browser during development.

gulp-svgstore & gulp-svgmin: Optimizes and combines SVGs into a sprite.

gulp-imagemin: Optimizes image files.

gulp-webp & imagemin-webp: Converts images to WebP format.

Others:

del: Deletes files and directories.
mono.software

⚙️ Gulp Build Process
The gulpfile.js defines a series of tasks to automate the build process:

Styles
Compiles SCSS files into minified CSS, adds vendor prefixes, groups media queries, and generates source maps.

javascript
Copy
Edit
function styles() {
  return gulp.src(paths.assets + 'scss/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(groupMediaQueries())
    .pipe(postcss([autoprefixer({browsers: ['last 2 version']})]))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(paths.build + 'css/'))
    .pipe(gulp.dest(paths.wp + 'css/'));
}
Scripts
Transpiles ES6 JavaScript using Babel, concatenates, and outputs to the build directory.

javascript
Copy
Edit
function scripts() {
  return gulp.src(paths.assets + 'js/*.js')
    .pipe(plumber())
    .pipe(babel({ presets: ['env'] }))
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest(paths.build + 'js/'))
    .pipe(gulp.dest(paths.wp + 'js/'))
}
HTML
Processes Nunjucks templates and outputs HTML files to the build directory.

javascript
Copy
Edit
function htmls() {
  return gulp.src(paths.src + '*.html')
    .pipe(plumber())
    .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
    .pipe(nunjucksRender({path: paths.src}))
    .pipe(gulp.dest(paths.build));
}
Images
Optimizes images and converts them to WebP format.

javascript
Copy
Edit
function images() {
  return gulp.src(paths.assets + 'img/**/*.{jpg,jpeg,png,gif,svg,ico}')
    .pipe(imagemin([imagemin.optipng({optimizationLevel: 10})]))
    .pipe(gulp.dest('build/img'))
    .pipe(gulp.dest(paths.wp + 'img/'));
}

function toWebp() {
  return gulp.src(paths.assets + 'img/**/*.{jpg,jpeg,png}')
    .pipe(webp())
    .pipe(gulp.dest('build/img'));
}
SVG Sprite
Minifies SVG files and combines them into a single sprite.

javascript
Copy
Edit
function svgSprite() {
  return gulp.src(paths.assets + 'svg/*.svg')
    .pipe(svgmin({ plugins: [{ cleanupIDs: { minify: true } }] }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite-svg.svg'))
    .pipe(gulp.dest(paths.build + 'img/'));
}
Watch and Serve
Watches for file changes and reloads the browser using BrowserSync.
gulpjs.com

javascript
Copy
Edit
function watch() {
  gulp.watch(paths.assets + 'scss/**/*.scss', styles);
  gulp.watch(paths.assets + 'js/**/*.js', scripts);
  gulp.watch(paths.src + '**/*.html', htmls);
}

function serve() {
  browserSync.init({ server: { baseDir: paths.build } });
  browserSync.watch(paths.build + '**/*.*', browserSync.reload);
}
Build and Default Tasks
Defines the main build and default tasks.

javascript
Copy
Edit
gulp.task('build', gulp.series(
  clean,
  gulp.parallel(styles, scripts, scriptsVendors, jsLibs, htmls, copyFonts, images, toWebp)
));

gulp.task('default', gulp.series(
  clean,
  gulp.parallel(styles, scripts, scriptsVendors, jsLibs, htmls, copyFonts, images, toWebp),
  gulp.parallel(watch, serve)
));
🚀 Getting Started
Install Dependencies:

Run the following command to install all necessary packages:

bash
Copy
Edit
npm install
Start Development Server:

Start the development server with live reloading:

bash
Copy
Edit
gulp
Build for Production:

Generate production-ready files:

bash
Copy
Edit
gulp build
